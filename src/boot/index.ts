import fs from 'fs';
import path from 'path';

const runBootScripts = async () => {
    console.log('Running boot scripts...');
    const bootDir = path.join(__dirname, '../boot');

    fs.readdirSync(bootDir).forEach(file => {
        console.log(`Checking file: ${file}`);
        if ((file.endsWith('.ts') || file.endsWith('.js')) && file !== 'index.ts') {
            console.log(bootDir)
            const bootScript = require(`${bootDir}/${file}`);
            console.log(`Running boot script: ${JSON.stringify(bootScript)}`);
            // Handle both default and named exports
            if (bootScript.default && typeof bootScript.default === 'function') {
                bootScript.default(); // For ES6 default exports
            } else if (typeof bootScript === 'function') {
                bootScript(); // For CommonJS-style exports
            } else {
                console.error(`Invalid boot script: ${file}`);
            }
        }
    });
};

export {
    runBootScripts
}