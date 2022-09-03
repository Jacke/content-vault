import { NotesCache, NotesCacheEntry } from "@dendronhq/common-all";
import { DendronFileSystemCache } from "./dendronFileSystemCache";
export declare class NotesFileSystemCache extends DendronFileSystemCache<NotesCache, NotesCacheEntry> {
    get(key: string): NotesCacheEntry | undefined;
    set(key: string, value: NotesCacheEntry): void;
    drop(key: string): void;
    getCacheEntryKeys(): Set<string>;
    createEmptyCacheContents(): NotesCache;
}
