import { TranslationFile } from "../enums";
export declare class Translation {
    private static readonly translationCache;
    static Translator(lang: string, file: TranslationFile, variable: string, parameters?: {
        toString(): string;
    }): any;
}
