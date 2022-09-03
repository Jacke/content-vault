import * as md from '../markdown';
import * as notion from '../notion';
export declare function parseBlocks(root: md.Root): notion.Block[];
export declare function parseRichText(root: md.Root): notion.RichText[];
