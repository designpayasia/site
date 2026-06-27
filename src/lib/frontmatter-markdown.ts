const PARAGRAPH_BREAK_RE = /\n{2,}/;
const MARKDOWN_RE =
  /(^|\n)(#{1,6}\s+|[-*]\s+|>\s+|\d+\.\s+)|\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\([^)]+\)|(^|\W)(\*[^*\n]+\*|_[^_\n]+_)(?=\W|$)/m;

type RichTextBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: number; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'blockquote'; text: string };

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const sanitizeHref = (value: string) => {
  const href = value.trim();

  if (/^(https?:\/\/|mailto:|tel:|\/|#|\.\/|\.\.\/)/i.test(href)) {
    return href;
  }

  return null;
};

const renderInlineMarkdown = (value: string) => {
  const pattern =
    /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+(?:\s+\"[^\"]*\")?)\)|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|_([^_\n]+)_/g;

  let html = '';
  let cursor = 0;

  for (const match of value.matchAll(pattern)) {
    const matched = match[0];
    const index = match.index ?? 0;

    html += escapeHtml(value.slice(cursor, index));

    if (match[1]) {
      html += `<code>${escapeHtml(match[1])}</code>`;
    } else if (match[2] && match[3]) {
      const href = sanitizeHref(match[3].replace(/\s+"[^"]*"$/, ''));
      const label = escapeHtml(match[2]);
      html += href ? `<a href="${escapeHtml(href)}">${label}</a>` : escapeHtml(matched);
    } else if (match[4] || match[5]) {
      html += `<strong>${escapeHtml(match[4] ?? match[5] ?? '')}</strong>`;
    } else if (match[6] || match[7]) {
      html += `<em>${escapeHtml(match[6] ?? match[7] ?? '')}</em>`;
    } else {
      html += escapeHtml(matched);
    }

    cursor = index + matched.length;
  }

  html += escapeHtml(value.slice(cursor));
  return html;
};

const splitParagraphs = (value: string) =>
  value
    .split(PARAGRAPH_BREAK_RE)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const flushParagraph = (blocks: RichTextBlock[], lines: string[]) => {
  if (lines.length === 0) {
    return;
  }

  blocks.push({
    type: 'paragraph',
    text: lines.map((line) => line.trim()).join('\n'),
  });

  lines.length = 0;
};

const parseMarkdownBlocks = (value: string) => {
  const blocks: RichTextBlock[] = [];
  const paragraphLines: string[] = [];
  const lines = value.replace(/\r\n?/g, '\n').split('\n');

  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph(blocks, paragraphLines);
      index += 1;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph(blocks, paragraphLines);
      blocks.push({
        type: 'heading',
        level: Math.min(headingMatch[1].length, 6),
        text: headingMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph(blocks, paragraphLines);
      const items: string[] = [];

      while (index < lines.length) {
        const listMatch = lines[index].trim().match(/^[-*]\s+(.+)$/);
        if (!listMatch) {
          break;
        }
        items.push(listMatch[1].trim());
        index += 1;
      }

      blocks.push({ type: 'ul', items });
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph(blocks, paragraphLines);
      const items: string[] = [];

      while (index < lines.length) {
        const listMatch = lines[index].trim().match(/^\d+\.\s+(.+)$/);
        if (!listMatch) {
          break;
        }
        items.push(listMatch[1].trim());
        index += 1;
      }

      blocks.push({ type: 'ol', items });
      continue;
    }

    const quoteMatch = trimmed.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph(blocks, paragraphLines);
      const quoteLines: string[] = [];

      while (index < lines.length) {
        const nextQuote = lines[index].trim().match(/^>\s?(.*)$/);
        if (!nextQuote) {
          break;
        }
        quoteLines.push(nextQuote[1].trim());
        index += 1;
      }

      blocks.push({
        type: 'blockquote',
        text: quoteLines.join('\n'),
      });
      continue;
    }

    paragraphLines.push(line);
    index += 1;
  }

  flushParagraph(blocks, paragraphLines);
  return blocks;
};

const renderBlock = (block: RichTextBlock) => {
  switch (block.type) {
    case 'heading': {
      const level = Math.max(1, Math.min(block.level, 6));
      const tag = `h${level}`;
      return `<${tag}>${renderInlineMarkdown(block.text)}</${tag}>`;
    }
    case 'ul':
      return `<ul>${block.items.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`;
    case 'ol':
      return `<ol>${block.items.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ol>`;
    case 'blockquote':
      return `<blockquote><p>${renderInlineMarkdown(block.text)}</p></blockquote>`;
    case 'paragraph':
    default:
      return `<p>${renderInlineMarkdown(block.text)}</p>`;
  }
};

export const hasMarkdownSyntax = (value: string | undefined) =>
  Boolean(value && MARKDOWN_RE.test(value));

export const renderRichTextHtml = (value: string | undefined) => {
  const source = value?.trim();

  if (!source) {
    return '';
  }

  const blocks = hasMarkdownSyntax(source)
    ? parseMarkdownBlocks(source)
    : splitParagraphs(source).map((text) => ({ type: 'paragraph', text } as const));

  return blocks.map(renderBlock).join('\n');
};
