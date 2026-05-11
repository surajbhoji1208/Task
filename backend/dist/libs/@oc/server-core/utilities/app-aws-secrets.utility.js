"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadSecrets = preloadSecrets;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
function preloadSecrets() {
    return __awaiter(this, void 0, void 0, function* () {
        const region = process.env.AWS_REGION || "us-east-1";
        const secretId = process.env.AWS_SECRET_ID;
        if (!secretId) {
            console.warn("AWS_SECRET_ID not provided, skipping secrets preload");
            return;
        }
        const client = new client_secrets_manager_1.SecretsManagerClient({ region });
        const command = new client_secrets_manager_1.GetSecretValueCommand({ SecretId: secretId });
        const response = yield client.send(command);
        if (response.SecretString) {
            const secrets = JSON.parse(response.SecretString);
            for (const [key, value] of Object.entries(secrets)) {
                process.env[key] = value;
            }
            console.log("AWS secrets preloaded into process.env");
        }
    });
}
//# sourceMappingURL=app-aws-secrets.utility.js.map