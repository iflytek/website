/**
 * Fetch contributors data from GitHub API for all iflytek repositories
 * Saves contributor avatars and info to .cache/contributors.json
 * Uses rate-limit-aware fetching with delays to avoid 403 errors.
 */

import { Octokit } from '@octokit/rest';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const CACHE_DIR = '.cache';
const CONTRIBUTORS_FILE = `${CACHE_DIR}/contributors.json`;
const ORG = 'iflytek';

// Also fetch from harnessclaw org (2 repos)
const EXTRA_REPOS: Array<{ owner: string; repo: string }> = [
  { owner: 'harnessclaw', repo: 'harnessclaw' },
  { owner: 'harnessclaw', repo: 'harnessclaw-engine' },
];

interface Contributor {
  username: string;
  avatar_url: string;
  contributions: number;
  profile_url: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchContributors() {
  console.log('📊 Fetching contributors from GitHub...');

  const token = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({
    auth: token || undefined,
  });

  if (!token) {
    console.warn('⚠️  GITHUB_TOKEN not set. Using unauthenticated requests (rate limited to 60/hour)');
  }

  const allContributors = new Map<string, Contributor>();
  const repos: Array<{ owner: string; repo: string }> = [];
  let cacheWriteSafe = true;

  try {
    // Get all public repos for the org
    const iflytekRepos = await octokit.paginate(octokit.repos.listForOrg, {
      org: ORG,
      type: 'public',
      per_page: 100,
    });

    // Filter out forks and archived repos
    const forks = iflytekRepos.filter((r) => r.fork);
    const archived = iflytekRepos.filter((r) => r.archived && !r.fork);
    const activeRepos = iflytekRepos.filter((r) => !r.fork && !r.archived);

    if (forks.length > 0) {
      console.log(`  ️  Skipped ${forks.length} fork(s): ${forks.map((r) => r.name).join(', ')}`);
    }
    if (archived.length > 0) {
      console.log(`  ⏭️  Skipped ${archived.length} archived: ${archived.map((r) => r.name).join(', ')}`);
    }

    repos.push(...activeRepos.map((r) => ({ owner: ORG, repo: r.name })));
    repos.push(...EXTRA_REPOS);

    console.log(`  ✅ Processing ${repos.length} repositories`);
  } catch (error) {
    console.error('❌ Failed to list repos:', error instanceof Error ? error.message : error);
    return;
  }

  // Check rate limit before starting
  if (!token) {
    try {
      const rateLimit = await octokit.rateLimit.get();
      const remaining = rateLimit.data.rate.remaining;
      const resetTime = rateLimit.data.rate.reset * 1000;
      console.log(
        `  📊 Rate limit: ${remaining}/${rateLimit.data.rate.limit} remaining, resets at ${new Date(resetTime).toLocaleTimeString()}`
      );

      if (remaining < repos.length + 5) {
        const waitMs = resetTime - Date.now() + 1000;
        if (waitMs > 0) {
          console.log(`   Waiting ${Math.ceil(waitMs / 1000)}s for rate limit reset...`);
          await sleep(waitMs);
        }
      }
    } catch {
      // Ignore rate limit check errors
    }
  }

  // Fetch contributors for each repo with delay to avoid rate limiting
  for (let i = 0; i < repos.length; i++) {
    const { owner, repo } = repos[i];

    // Delay between requests (1.5s) to stay within rate limit
    if (!token && i > 0) {
      await sleep(1500);
    }

    try {
      const contributors = await octokit.paginate(octokit.repos.listContributors, {
        owner,
        repo,
        per_page: 100,
      });

      for (const contributor of contributors) {
        if (contributor.login && contributor.type === 'User') {
          const existing = allContributors.get(contributor.login);
          const contributions = (existing?.contributions || 0) + (contributor.contributions || 0);
          allContributors.set(contributor.login, {
            username: contributor.login,
            avatar_url: contributor.avatar_url || `https://github.com/${contributor.login}.png`,
            contributions,
            profile_url: contributor.html_url || `https://github.com/${contributor.login}`,
          });
        }
      }

      console.log(`  ✅ ${owner}/${repo}: ${contributors.length} contributors`);
    } catch (error: unknown) {
      const status = (error as { status?: number }).status;
      if (status === 403) {
        console.error(
          `  ❌ Rate limited at ${owner}/${repo} (${i + 1}/${repos.length}). Set GITHUB_TOKEN to avoid this.`
        );
        cacheWriteSafe = false;
        break;
      }
      cacheWriteSafe = false;
      console.warn(`  ⚠️  Failed to fetch contributors for ${owner}/${repo}`);
    }
  }

  // Sort by contributions
  const sortedContributors = Array.from(allContributors.values()).sort((a, b) => b.contributions - a.contributions);

  if (!cacheWriteSafe) {
    if (existsSync(CONTRIBUTORS_FILE)) {
      console.warn(`  ⚠️  Keeping existing cache at ${CONTRIBUTORS_FILE} because contributor fetch was incomplete`);
    } else {
      console.warn('  ⚠️  Contributor fetch was incomplete and no existing cache is available; skipping cache write');
    }
    return;
  }

  // Save to cache
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }

  writeFileSync(
    CONTRIBUTORS_FILE,
    JSON.stringify(
      {
        updated_at: new Date().toISOString(),
        total: sortedContributors.length,
        contributors: sortedContributors,
      },
      null,
      2
    )
  );

  console.log(`  ✅ Saved ${sortedContributors.length} contributors to ${CONTRIBUTORS_FILE}`);
}

fetchContributors();
