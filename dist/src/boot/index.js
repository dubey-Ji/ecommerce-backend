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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBootScripts = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const runBootScripts = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Running boot scripts...');
    const bootDir = path_1.default.join(__dirname, '../boot');
    fs_1.default.readdirSync(bootDir).forEach(file => {
        console.log(`Checking file: ${file}`);
        if ((file.endsWith('.ts') || file.endsWith('.js')) && file !== 'index.ts') {
            console.log(bootDir);
            const bootScript = require(`${bootDir}/${file}`);
            console.log(`Running boot script: ${JSON.stringify(bootScript)}`);
            // Handle both default and named exports
            if (bootScript.default && typeof bootScript.default === 'function') {
                bootScript.default(); // For ES6 default exports
            }
            else if (typeof bootScript === 'function') {
                bootScript(); // For CommonJS-style exports
            }
            else {
                console.error(`Invalid boot script: ${file}`);
            }
        }
    });
});
exports.runBootScripts = runBootScripts;
