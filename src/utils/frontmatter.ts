import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import Slugger from 'github-slugger';
import type { Element, Root } from 'hast';
import type { RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark';

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    if (typeof file?.data?.astro?.frontmatter !== 'undefined') {
      file.data.astro.frontmatter.readingTime = readingTime;
    }
  };
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (child.type === 'element' && child.tagName === 'table') {
        tree.children[i] = {
          type: 'element',
          tagName: 'div',
          properties: {
            style: 'overflow:auto',
          },
          children: [child],
        };

        i++;
      }
    }
  };
};

/**
 * Wrap h1/h2/h3 headings in an `<a href="#{slug}">` so readers can click a heading
 * to copy / navigate to its hash — mirrors the TOC behaviour inside the prose.
 *
 * Runs BEFORE Astro's built-in rehype-collect-headings, so we compute slugs
 * ourselves with github-slugger and set the `id` attribute on the heading
 * element directly.  Astro's plugin will later reuse the same `id` and skip
 * re-slugifying it.
 */
export const autolinkHeadingsRehypePlugin: RehypePlugin = () => {
  const slugger = new Slugger();

  function getText(
    node: Element | { type: string; value?: string; children?: (Element | { type: string; value?: string })[] }
  ): string {
    if (node.type === 'text' || node.type === 'raw') return node.value ?? '';
    if (!node.children) return '';
    return node.children.map(getText).join('');
  }

  function wrap(node: Root | Element) {
    if (!node.children) return;

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child.type !== 'element') continue;

      if (child.tagName === 'h1' || child.tagName === 'h2' || child.tagName === 'h3') {
        const text = getText(child);
        if (!text) continue;

        const slug = child.properties?.id || slugger.slug(text);
        child.properties = { ...child.properties, id: slug };

        node.children[i] = {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${slug}`,
            class: 'heading-anchor',
          },
          children: [child],
        };
        continue;
      }

      wrap(child);
    }
  }

  return function (tree) {
    wrap(tree);
  };
};

/**
 * Rewrite markdown image `src` from `~/assets/images/xxx` to `/images/watermarked/xxx`
 * so inline blog images use the pre-baked watermarked copies.
 */
export const watermarkImageRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'img') {
        const src = node.properties?.src as string | undefined;
        if (src && src.startsWith('~/assets/images/')) {
          const filename = src.split('/').pop();
          if (filename) {
            node.properties = { ...node.properties, src: `/images/watermarked/${filename}` };
          }
        }
      }
    }
  };
};
