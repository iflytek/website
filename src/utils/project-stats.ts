/**
 * Utility to merge GitHub stats with project collection data.
 * Pages should use `getProjectsWithStats()` instead of raw `getCollection('project')`.
 *
 * Priority:
 *   1. Live GitHub API data (when GITHUB_TOKEN is available — serverless / Vercel SSR)
 *   2. .cache/project-stats.json fallback (build-time cache or local dev without token)
 *   3. YAML values (last resort, no stats override)
 */

import { getCollection } from 'astro:content';
import { existsSync, readFileSync } from 'fs';

interface ProjectStats {
  stars: number;
  forks: number;
  updated_at: string;
}

interface CachedStats {
  updated_at: string;
  repos: Record<string, ProjectStats>;
}

// ── In-memory cache for serverless warm invocations ──────────────────────────
// Vercel serverless functions retain module-level state while "warm",
// so we cache live results for CACHE_TTL to avoid redundant API calls.
let liveCache: { data: Record<string, ProjectStats>; fetchedAt: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function loadCachedStats(): CachedStats | null {
  const STATS_FILE = '.cache/project-stats.json';
  if (!existsSync(STATS_FILE)) return null;
  try {
    return JSON.parse(readFileSync(STATS_FILE, 'utf-8'));
  } catch {
    return null;
  }
}

async function fetchLiveStats(repos: string[]): Promise<Record<string, ProjectStats>> {
  // Return warm cache if still fresh
  if (liveCache && Date.now() - liveCache.fetchedAt < CACHE_TTL) {
    return liveCache.data;
  }

  const results: Record<string, ProjectStats> = {};
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const entries = await Promise.all(
    repos.map(async (repo) => {
      const [owner, name] = repo.split('/');
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return [
          repo,
          {
            stars: data.stargazers_count,
            forks: data.forks_count,
            updated_at: new Date().toISOString(),
          },
        ] as const;
      } catch {
        return null;
      }
    })
  );

  for (const entry of entries) {
    if (entry) results[entry[0]] = entry[1];
  }

  liveCache = { data: results, fetchedAt: Date.now() };
  return results;
}

export async function getProjectsWithStats() {
  const projects = await getCollection('project');
  const repos = projects.map((p) => p.data.repo);
  const hasToken = !!process.env.GITHUB_TOKEN;

  // Prefer live data when token is available (Vercel SSR), otherwise fall back to build-time cache
  const liveStats = hasToken ? await fetchLiveStats(repos) : null;
  const cachedStats = liveStats ? null : loadCachedStats();

  return projects.map((project) => {
    const repo = project.data.repo;
    const stats = liveStats?.[repo] ?? cachedStats?.repos[repo];
    if (stats) {
      return {
        ...project,
        data: {
          ...project.data,
          stars: stats.stars,
          forks: stats.forks,
        },
      };
    }
    // No stats override — fall back to YAML values
    return project;
  });
}
