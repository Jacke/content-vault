import { DendronConfigEntry, DendronConfigEntryCollection } from "../../types/configs/base";
import { DendronCommandConfig } from "../../types/configs/commands/commands";
import { LookupSelectionModeEnum } from "../../types/configs/commands/lookup";
import { InsertNoteIndexConfig } from "../../types/configs/commands/insertNoteIndex";
/**
 * Lookup
 */
/**
 * Selection mode entries
 */
export declare const SELECTION_MODES: Record<LookupSelectionModeEnum, DendronConfigEntry<string>>;
/**
 * Insert note index
 */
/**
 * Insert note index entries
 */
export declare const INSERT_NOTE_INDEX: DendronConfigEntryCollection<InsertNoteIndexConfig>;
/**
 * Command entry collection
 */
export declare const COMMANDS: DendronConfigEntryCollection<DendronCommandConfig>;
