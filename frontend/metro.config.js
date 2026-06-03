// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Diz ao empacotador do Expo para aceitar e servir arquivos de WebAssembly
config.resolver.assetExts.push('wasm');

module.exports = config;