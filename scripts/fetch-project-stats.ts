/**
 * Fetch real-time stars/forks from GitHub API for all projects in src/data/projects/*.yaml
 * Saves results to .cache/project-stats.json
 *
 * Usage: npm run fetch:project-stats
 * Requires: GITHUB_TOKEN env var for authenticated requests (optional but recommended)
 */

import { Octokit } from '@octokit/rest';
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'fs';
import { parse as parseYaml } from 'yaml';
import { join } from 'path';

const CACHE_DIR = '.cache';
const STATS_FILE = `${CACHE_DIR}/project-stats.json`;
const PROJECTS_DIR = 'src/data/projects';

interface ProjectStats {
  stars: number;
  forks: number;
  updated_at: string;
}

interface StatsCache {
  updated_at: string;
  repos: Record<string, ProjectStats>;
}

async function fetchProjectStats() {
  console.log('📊 Fetching project stats from GitHub API...');

  const token = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth: token || undefined });

  if (!token) {
    console.warn('⚠️  GITHUB_TOKEN not set. Using unauthenticated requests (rate limited to 60/hour)');
  }

  // Read all project YAML files to extract repo names
  const projectFiles = readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));
  const repos: string[] = [];

  for (const file of projectFiles) {
    try {
      const content = readFileSync(join(PROJECTS_DIR, file), 'utf-8');
      const data = parseYaml(content);
      if (data?.repo) {
        repos.push(data.repo);
      }
    } catch {
      console.warn(`  ⚠️  Failed to parse ${file}`);
    }
  }

  console.log(`  Found ${repos.length} project repos`);

  // Load existing cache as fallback
  let existingCache: StatsCache | null = null;
  if (existsSync(STATS_FILE)) {
    try {
      existingCache = JSON.parse(readFileSync(STATS_FILE, 'utf-8'));
    } catch {
      // Ignore corrupt cache
    }
  }

  const results: Record<string, ProjectStats> = {};
  let fetched = 0;
  let failed = 0;

  for (const repo of repos) {
    const [owner, name] = repo.split('/');
    try {
      const { data } = await octokit.repos.get({ owner, repo: name });
      results[repo] = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        updated_at: new Date().toISOString(),
      };
      fetched++;
      console.log(`  ✅ ${repo}: ⭐ ${data.stargazers_count} 🍴 ${data.forks_count}`);
    } catch {
      failed++;
      // Fall back to cached value if available
      if (existingCache?.repos[repo]) {
        results[repo] = existingCache.repos[repo];
        console.warn(`  ⚠️  ${repo}: API failed, using cached values (⭐ ${existingCache.repos[repo].stars})`);
      } else {
        console.warn(`  ❌ ${repo}: API failed, no cache available`);
      }
    }
  }

  // Save to cache
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }

  const cache: StatsCache = {
    updated_at: new Date().toISOString(),
    repos: results,
  };

  writeFileSync(STATS_FILE, JSON.stringify(cache, null, 2));
  console.log(`  ✅ Saved stats for ${fetched}/${repos.length} repos to ${STATS_FILE} (${failed} failed)`);
}

fetchProjectStats();
