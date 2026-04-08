"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoHandler_1 = require("./src/utils/cryptoHandler");
process.env.ENCRYPTION = 'true';
process.env.ENCRYPTION_ALGORITHM = 'aes-256-cbc';
process.env.ENCRYPTION_FIXED_KEY = '12345678901234567890123456789012';
process.env.ENCRYPTION_FIXED_IV = '1234567890123456';
const testData = { message: 'Hello World', userId: 123 };
console.log('Original data:', testData);
const encrypted = (0, cryptoHandler_1.encrypter)(testData);
console.log('Encrypted:', encrypted);
const decrypted = (0, cryptoHandler_1.decrypter)(encrypted);
console.log('Decrypted:', decrypted);
console.log('Decryption successful:', JSON.stringify(testData) === JSON.stringify(decrypted));
//# sourceMappingURL=test-crypto.js.map