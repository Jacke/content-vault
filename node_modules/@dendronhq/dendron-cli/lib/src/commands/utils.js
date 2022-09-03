"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEngineArgs = exports.setupEngine = void 0;
const common_server_1 = require("@dendronhq/common-server");
const engine_server_1 = require("@dendronhq/engine-server");
const lodash_1 = __importDefault(require("lodash"));
const launchEngineServer_1 = require("./launchEngineServer");
/**
 * used by {@link setupEngine}.
 * Depending on options passed, we create a mock {@link Server}
 * with a compatible API
 * @param closeServer
 * @returns
 */
const createDummyServer = (closeServer) => ({
    close: (cb) => {
        if (closeServer) {
            closeServer().then(cb);
            return;
        }
        else {
            return cb();
        }
    },
});
/**
 * Setup an engine based on CLI args
 */
async function setupEngine(opts) {
    const logger = (0, common_server_1.createLogger)();
    const { enginePort, init, useLocalEngine, newEngine } = lodash_1.default.defaults(opts, {
        init: true,
        useLocalEngine: false,
    });
    let engine;
    let port;
    let server;
    let serverSockets = new Set();
    const wsRoot = (0, common_server_1.resolvePath)(opts.wsRoot, process.cwd());
    const ctx = "setupEngine";
    // instead of spwaning an engine in a separate process, create one
    // in memory
    if (useLocalEngine) {
        const engine = newEngine
            ? engine_server_1.DendronEngineV3.create({ wsRoot, logger })
            : engine_server_1.DendronEngineV2.create({ wsRoot, logger });
        const out = await engine.init();
        if (out.error) {
            // eslint-disable-next-line no-console
            console.error(out.error);
        }
        return {
            wsRoot,
            engine,
            port: -1,
            server: createDummyServer(),
            serverSockets: new Set(),
        };
    }
    // connect to a running engine at specified port
    if (enginePort) {
        logger.info({
            ctx,
            msg: "connecting to engine at port",
            enginePort,
            init,
        });
        const engineConnector = engine_server_1.EngineConnector.getOrCreate({
            wsRoot,
        });
        await engineConnector.init({
            portOverride: enginePort,
            init,
        });
        engine = engineConnector.engine;
        port = enginePort;
        // the server is running somewhere else
        // we need a dummy server because the calling function
        // will try to close the server
        server = createDummyServer();
        return { wsRoot, engine, port, server, serverSockets };
    }
    if (opts.attach) {
        logger.info({
            ctx,
            msg: "connecting to running engine",
            attach: opts.attach,
            init,
        });
        const engineConnector = engine_server_1.EngineConnector.getOrCreate({
            wsRoot,
        });
        await engineConnector.init({
            init,
            target: opts.target,
        });
        engine = engineConnector.engine;
        port = engineConnector.port;
        if (engineConnector.serverPortWatcher) {
            // a file watcher is created when engine port is undefined
            // needs to be cleaned up on server closing
            server = createDummyServer(async () => {
                var _a;
                (_a = engineConnector.serverPortWatcher) === null || _a === void 0 ? void 0 : _a.close();
            });
        }
        else {
            server = createDummyServer();
        }
        return { wsRoot, engine, port, server, serverSockets };
    }
    // if not using current engine, initialize a new one
    logger.info({ ctx, msg: "initialize new engine" });
    const resp = await new launchEngineServer_1.LaunchEngineServerCommand().enrichArgs(opts);
    ({ engine, port, server, serverSockets } = resp.data);
    if (init) {
        const out = await engine.init();
        // eslint-disable-next-line no-console
        if (out.error)
            console.error(out.error);
    }
    return { wsRoot, engine, port, server, serverSockets };
}
exports.setupEngine = setupEngine;
/**
 * Add yargs based options to setup engine
 */
function setupEngineArgs(args) {
    args.option("enginePort", {
        describe: "If set, connect to to running engine. If not set, create new instance of Dendron Engine",
    });
    args.option("attach", {
        describe: "Use existing engine instead of spawning a new one",
    });
    args.option("useLocalEngine", {
        type: "boolean",
        describe: "If set, use in memory engine instead of connecting to a server",
    });
}
exports.setupEngineArgs = setupEngineArgs;
//# sourceMappingURL=utils.js.map