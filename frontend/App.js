import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { version } from 'canvaskit-wasm/package.json'; // Puxa a versão exata do motor instalado

export default function App() {
  return (
    <View style={styles.container}>
      {/* O 'opts' força a web a buscar o binário direto da CDN, acabando com o conflito do Metro */}
      <WithSkiaWeb
        opts={{ locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}` }}
        getComponent={() => import('./src/SkiaApp')}
        fallback={
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.loadingText}>Injetando Motor Gráfico Skia (WASM)...</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' },
  loadingText: { color: '#00ff00', marginTop: 10, fontWeight: 'bold' }
});