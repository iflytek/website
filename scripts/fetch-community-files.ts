/**
 * Fetch community files from iflytek/community repository
 * Copies CODE_OF_CONDUCT.md, CONTRIBUTING.md, SECURITY.md, and templates
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';

const COMMUNITY_REPO = 'https://github.com/iflytek/community.git';
const TEMP_DIR = '.tmp-community';
const TARGET_FILES = ['CODE_OF_CONDUCT.md', 'CONTRIBUTING.md', 'SECURITY.md'];

async function fetchCommunityFiles() {
  console.log('📦 Fetching community files from iflytek/community...');

  // Clean up temp dir if exists
  if (existsSync(TEMP_DIR)) {
    rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  try {
    // Shallow clone the community repo
    execSync(`git clone --depth 1 ${COMMUNITY_REPO} ${TEMP_DIR}`, {
      stdio: 'pipe',
      timeout: 30000,
    });

    // Copy target files to project root
    for (const file of TARGET_FILES) {
      const src = join(TEMP_DIR, file);
      if (existsSync(src)) {
        copyFileSync(src, file);
        console.log(`  ✅ Copied ${file}`);
      } else {
        console.warn(`  ⚠️  ${file} not found in community repo, skipping`);
      }
    }

    // Copy GitHub templates if they exist
    const templateDirs = ['.github/ISSUE_TEMPLATE'];
    for (const dir of templateDirs) {
      const srcDir = join(TEMP_DIR, dir);
      if (existsSync(srcDir)) {
        const targetDir = dir;
        mkdirSync(targetDir, { recursive: true });
        const files = execSync(`ls ${srcDir}`, { encoding: 'utf-8' }).trim().split('\n').filter(Boolean);
        for (const file of files) {
          copyFileSync(join(srcDir, file), join(targetDir, file));
          console.log(`  ✅ Copied ${dir}/${file}`);
        }
      }
    }

    // Copy PR template if it exists
    const prTemplate = join(TEMP_DIR, '.github/PULL_REQUEST_TEMPLATE.md');
    if (existsSync(prTemplate)) {
      mkdirSync('.github', { recursive: true });
      copyFileSync(prTemplate, '.github/PULL_REQUEST_TEMPLATE.md');
      console.log('  ✅ Copied .github/PULL_REQUEST_TEMPLATE.md');
    }

    console.log('🎉 Community files updated successfully!');
  } catch (error) {
    console.error('⚠️  Failed to fetch community files:', error instanceof Error ? error.message : error);
    console.log('   Continuing build without community files...');

    // Create placeholder files if they don't exist
    for (const file of TARGET_FILES) {
      if (!existsSync(file)) {
        writeFileSync(
          file,
          `# ${file.replace('.md', '').replace(/_/g, ' ')}\n\nPlease visit https://github.com/iflytek/community for the latest version.\n`
        );
        console.log(`  📝 Created placeholder for ${file}`);
      }
    }
  } finally {
    // Clean up temp directory
    if (existsSync(TEMP_DIR)) {
      rmSync(TEMP_DIR, { recursive: true, force: true });
    }
  }
}

fetchCommunityFiles();
