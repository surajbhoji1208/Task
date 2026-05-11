"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppClusterService = void 0;
const cluster_1 = __importDefault(require("cluster"));
const os = __importStar(require("os"));
const numCPUs = os.cpus().length;
class AppClusterService {
    static createClusters(workers, callback) {
        if (cluster_1.default.isPrimary) {
            console.log(`Master server started on ${process.pid}`);
            if (workers > numCPUs)
                workers = numCPUs;
            for (let i = 0; i < workers; i++) {
                cluster_1.default.fork();
            }
            cluster_1.default.on("online", function (worker) {
                console.log("Worker %s is online", worker.process.pid);
            });
            cluster_1.default.on("exit", (worker) => {
                console.log(`Worker ${worker.process.pid} died. Restarting`);
                cluster_1.default.fork();
            });
        }
        else {
            console.log(`Cluster server started on ${process.pid}`);
            callback();
        }
    }
}
exports.AppClusterService = AppClusterService;
//# sourceMappingURL=app-cluster.service.js.map