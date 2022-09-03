import type * as notion from './notion';
/**
 * Parses Markdown content into Notion Blocks.
 * - Supports all heading types (heading depths 4, 5, 6 are treated as 3 for Notion)
 * - Supports numbered lists, bulleted lists, to-do lists
 * - Supports italics, bold, strikethrough, inline code, hyperlinks
 *
 * Per Notion limitations, these markdown attributes are not supported:
 * - Tables (removed)
 * - HTML tags (removed)
 * - Thematic breaks (removed)
 * - Code blocks (treated as paragraph)
 * - Block quotes (treated as paragraph)
 *
 * Supports GitHub-flavoured Markdown.
 *
 * @param body any Markdown or GFM content
 */
export declare function markdownToBlocks(body: string): notion.Block[];
/**
 * Parses inline Markdown content into Notion RichText objects.
 * Only supports plain text, italics, bold, strikethrough, inline code, and hyperlinks.
 *
 * @param text any inline Markdown or GFM content
 */
export declare function markdownToRichText(text: string): notion.RichText[];
