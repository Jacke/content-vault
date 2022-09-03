"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationService = void 0;
const common_all_1 = require("@dendronhq/common-all");
const common_server_1 = require("@dendronhq/common-server");
const lodash_1 = __importDefault(require("lodash"));
const semver_1 = __importDefault(require("semver"));
const migrations_1 = require("./migrations");
class MigrationService {
    static async applyMigrationRules({ currentVersion, previousVersion, migrations, wsService, ...rest }) {
        const results = [];
        // run migrations from oldest to newest
        const migrationsToRun = lodash_1.default.reverse(lodash_1.default.takeWhile(migrations || migrations_1.MIGRATION_ENTRIES, (ent) => {
            const out = semver_1.default.lte(previousVersion, ent.version) &&
                semver_1.default.gte(currentVersion, ent.version);
            return out;
        }));
        const { logger, dispose } = (0, common_server_1.createDisposableLogger)("migration");
        logger.info({
            migrations: migrationsToRun.map((m) => [
                m.version,
                m.changes.map((c) => c.name),
            ]),
        });
        dispose();
        await lodash_1.default.reduce(migrationsToRun, async (prev, migration) => {
            await prev;
            const out = await this.collectMigrationChanges({
                currentVersion,
                previousVersion,
                migration,
                wsService,
                ...rest,
            });
            results.push(out);
            return out;
        }, Promise.resolve({}));
        const changes = lodash_1.default.flatten(results);
        if (!lodash_1.default.isEmpty(changes)) {
            const { data } = lodash_1.default.last(changes);
            // TODO: this should only be set if the migration is backwards incompatible with previous dendron versions
            common_all_1.ConfigUtils.setWorkspaceProp(data.dendronConfig, "dendronVersion", currentVersion);
            await wsService.setConfig(data.dendronConfig);
            // wsConfig is undefined for native workspaces
            if (data.wsConfig)
                wsService.setCodeWorkspaceSettingsSync(data.wsConfig);
        }
        return changes;
    }
    /**
     * Creates a list of changes that will need to be applied
     */
    static async collectMigrationChanges({ previousVersion, migration, wsService, logger, ...rest }) {
        const results = [];
        await lodash_1.default.reduce(migration.changes, async (prev, change) => {
            const { data } = await prev;
            logger.info({ ctx: "applyMigrationChange", name: change.name });
            const { dendronConfig, wsConfig } = data;
            const out = await change.func({ dendronConfig, wsConfig, wsService });
            const changeStatus = {
                data: {
                    changeName: change.name,
                    status: "ok",
                    version: migration.version,
                    ...out.data,
                },
            };
            results.push(changeStatus);
            return changeStatus;
        }, Promise.resolve({
            data: {
                changeName: "no-op",
                version: "",
                status: "ok",
                ...rest,
            },
        }));
        return results;
    }
    /**
     * Should we attempt to migrate workspace settings
     * @returns
     */
    static shouldRunMigration({ force, workspaceInstallStatus, }) {
        return ((workspaceInstallStatus === common_all_1.InstallStatus.UPGRADED || force) &&
            (0, common_all_1.getStage)() === "prod");
    }
}
exports.MigrationService = MigrationService;
//# sourceMappingURL=service.js.map