import type { Annotations, RichText } from '@notionhq/client/build/src/api-types';
export interface RichTextOptions {
    annotations?: Partial<Annotations>;
    url?: string;
}
export declare function richText(content: string, options?: RichTextOptions): RichText;
