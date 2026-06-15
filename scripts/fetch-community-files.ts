/**
 * Fetch community files from iflytek/community repository
 * Copies CODE_OF_CONDUCT.md, CONTRIBUTING.md, SECURITY.md, and templates
 * Then applies post-processing to fix known issues (branch names, dead links)
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, writeFileSync, rmSync, readFileSync } from 'fs';
import { join } from 'path';

const COMMUNITY_REPO = 'https://github.com/iflytek/community.git';
const TEMP_DIR = '.tmp-community';
const TARGET_FILES = ['CODE_OF_CONDUCT.md', 'CONTRIBUTING.md', 'SECURITY.md'];

/**
 * Post-process copied files to fix known issues:
 * - Branch name: community repo uses `master`, not `main`
 * - CONTRIBUTING.md relative links point to files that only exist in the community repo
 * - CODE_OF_CONDUCT.md local reference should use uppercase filename
 */
function postProcessFiles() {
  console.log('🔧 Post-processing copied files...');

  // Fix blob/main/ → blob/master/ in all .github files
  const githubFiles = [
    '.github/PULL_REQUEST_TEMPLATE.md',
    '.github/ISSUE_TEMPLATE/moderator_application.yml',
    '.github/ISSUE_TEMPLATE/leadership-change.yml',
  ];
  for (const file of githubFiles) {
    if (existsSync(file)) {
      const content = readFileSync(file, 'utf-8');
      const fixed = content.replace(/blob\/main\//g, 'blob/master/');
      if (content !== fixed) {
        writeFileSync(file, fixed);
        console.log(`  ✅ Fixed branch name in ${file}`);
      }
    }
  }

  // Fix CONTRIBUTING.md: convert relative links to absolute URLs
  if (existsSync('CONTRIBUTING.md')) {
    let content = readFileSync('CONTRIBUTING.md', 'utf-8');
    const COMMUNITY_BASE = 'https://github.com/iflytek/community/blob/master';

    // Fix relative links to community repo files
    content = content.replace(/\(governance\.md\)/g, `(${COMMUNITY_BASE}/governance.md)`);
    content = content.replace(/\(community-membership\.md\)/g, `(${COMMUNITY_BASE}/community-membership.md)`);
    content = content.replace(
      /\(contribute\/issue-guidelines\.md\)/g,
      `(${COMMUNITY_BASE}/contribute/issue-guidelines.md)`
    );
    content = content.replace(
      /\(contribute\/pull-request-guidelines\.md\)/g,
      `(${COMMUNITY_BASE}/contribute/pull-request-guidelines.md)`
    );
    content = content.replace(
      /\(contribute\/review-guidelines\.md\)/g,
      `(${COMMUNITY_BASE}/contribute/review-guidelines.md)`
    );
    content = content.replace(
      /\(contribute\/discussions-guidelines\.md\)/g,
      `(${COMMUNITY_BASE}/contribute/discussions-guidelines.md)`
    );

    // Fix code-of-conduct.md → CODE_OF_CONDUCT.md (local file, uppercase)
    content = content.replace(/\(code-of-conduct\.md\)/g, '(CODE_OF_CONDUCT.md)');

    writeFileSync('CONTRIBUTING.md', content);
    console.log('  ✅ Fixed dead links in CONTRIBUTING.md');
  }

  console.log('🎉 Post-processing complete!');
}

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

    // Always post-process local files (whether freshly copied or already existing)
    postProcessFiles();
  }
}

fetchCommunityFiles();
