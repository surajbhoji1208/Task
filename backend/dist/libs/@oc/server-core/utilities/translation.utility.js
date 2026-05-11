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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translation = void 0;
const _core_enums_1 = require("../enums");
const errorEn = __importStar(require("./i18n/en/error.json"));
const successEn = __importStar(require("./i18n/en/success.json"));
class Translation {
    static Translator(lang, file, variable, parameters = {}) {
        var _a, _b;
        const language = lang.toLowerCase() || "en";
        const jsonData = ((_a = this.translationCache[language]) === null || _a === void 0 ? void 0 : _a[file]) || ((_b = this.translationCache["en"]) === null || _b === void 0 ? void 0 : _b[file]);
        if (!jsonData) {
            return variable;
        }
        const msgData = jsonData[variable];
        if (!msgData) {
            return variable;
        }
        function renderString(msg, object) {
            var _a;
            return (((_a = msg.match(/\{(.*?)\}/gi)) === null || _a === void 0 ? void 0 : _a.reduce((acc, binding) => {
                const property = binding.substring(1, binding.length - 1);
                const str = acc == "" || acc == null ? msg : acc;
                return `${str.replace(/\{(.*?)\}/, object[property])}`;
            }, "")) || msg);
        }
        if (msgData && typeof msgData === "string" && msgData.match(/\{(.*?)\}/gi)) {
            return renderString(msgData, parameters);
        }
        else {
            return msgData;
        }
    }
}
exports.Translation = Translation;
Translation.translationCache = {
    en: {
        [_core_enums_1.TranslationFile.Error]: errorEn,
        [_core_enums_1.TranslationFile.Success]: successEn
    }
};
//# sourceMappingURL=translation.utility.js.map