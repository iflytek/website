/**
 * Utility to merge GitHub stats with project collection data.
 * Pages should use `getProjectsWithStats()` instead of raw `getCollection('project')`.
 *
 * Priority:
 *   1. .cache/project-stats.json generated before the site build
 *   2. YAML values (fallback when no cached value is available)
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

function loadCachedStats(): CachedStats | null {
  const STATS_FILE = '.cache/project-stats.json';
  if (!existsSync(STATS_FILE)) return null;
  try {
    return JSON.parse(readFileSync(STATS_FILE, 'utf-8'));
  } catch {
    return null;
  }
}

export async function getProjectsWithStats() {
  const projects = await getCollection('project');
  const cachedStats = loadCachedStats();

  return projects.map((project) => {
    const repo = project.data.repo;
    const stats = cachedStats?.repos?.[repo];
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
