/**
 * Fetch contributors data from GitHub API for all iflytek repositories
 * Saves contributor avatars and info to .cache/contributors.json
 */

import { Octokit } from '@octokit/rest';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';

const CACHE_DIR = '.cache';
const CONTRIBUTORS_FILE = `${CACHE_DIR}/contributors.json`;
const ORG = 'iflytek';

interface Contributor {
  username: string;
  avatar_url: string;
  contributions: number;
  profile_url: string;
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

  try {
    // Get all public repos for the org
    const repos = await octokit.paginate(octokit.repos.listForOrg, {
      org: ORG,
      type: 'public',
      per_page: 100,
    });

    console.log(`  Found ${repos.length} repositories`);

    // Fetch contributors for each repo
    for (const repo of repos) {
      try {
        const contributors = await octokit.paginate(octokit.repos.listContributors, {
          owner: ORG,
          repo: repo.name,
          per_page: 100,
        });

        for (const contributor of contributors) {
          if (contributor.login && contributor.type === 'User') {
            const existing = allContributors.get(contributor.login);
            const contributions = (existing?.contributions || 0) + (contributor.contributions || 0);
            allContributors.set(contributor.login, {
              username: contributor.login,
              avatar_url: contributor.avatar_url,
              contributions,
              profile_url: contributor.html_url || `https://github.com/${contributor.login}`,
            });
          }
        }
      } catch (err) {
        console.warn(`  ⚠️  Failed to fetch contributors for ${repo.name}`);
      }
    }

    // Sort by contributions
    const sortedContributors = Array.from(allContributors.values()).sort(
      (a, b) => b.contributions - a.contributions
    );

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
  } catch (error) {
    console.error('❌ Failed to fetch contributors:', error instanceof Error ? error.message : error);

    // Use cached data if available
    if (existsSync(CONTRIBUTORS_FILE)) {
      const cached = JSON.parse(readFileSync(CONTRIBUTORS_FILE, 'utf-8'));
      console.log(`  📦 Using cached data (${cached.total} contributors, updated ${cached.updated_at})`);
    } else {
      console.log('  📝 No cached data available');
    }
  }
}

fetchContributors();
