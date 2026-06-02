import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import DraggableCard from '../components/DraggableCard';

export default function AlbumScreen({ onNavigate }) { // <--- Recebe a prop aqui
  return (
    <View style={styles.container}>
      
      <View style={styles.albumArea}>
        {/* BOTÃO DE VOLTAR */}
        <TouchableOpacity style={styles.backButton} onPress={onNavigate}>
           <Text style={styles.backButtonText}>⬅️ Voltar aos Pacotes</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Álbum Oficial</Text>
        <View style={styles.slotsContainer}>
          <View style={styles.slot}><Text style={styles.slotText}>01</Text></View>
          <View style={styles.slot}><Text style={styles.slotText}>02</Text></View>
        </View>
        <Text style={styles.hintText}>Arraste as cartas para cá para colar</Text>
      </View>

      <View style={styles.inventoryArea}>
        <Text style={styles.inventoryTitle}>Suas Cartas Não Coladas</Text>
        <View style={styles.cardsRow}>
          <DraggableCard themeColor="#00FFFF" />
          <DraggableCard themeColor="#FF007F" />
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  
  // Novo estilo do botão de voltar
  backButton: { position: 'absolute', top: 20, left: 20, padding: 10, backgroundColor: '#333', borderRadius: 8, zIndex: 20 },
  backButtonText: { color: '#fff', fontWeight: 'bold' },

  albumArea: { flex: 1, backgroundColor: '#1a1a1a', alignItems: 'center', paddingTop: 60, borderBottomWidth: 2, borderColor: '#333' }, // Aumentei o paddingTop para não encostar no botão
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  slotsContainer: { flexDirection: 'row', gap: 20 },
  slot: { width: 120, height: 180, borderWidth: 2, borderColor: '#555', borderStyle: 'dashed', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
  slotText: { color: '#555', fontSize: 24, fontWeight: 'bold' },
  hintText: { color: '#00FFFF', marginTop: 20, fontWeight: 'bold' },

  inventoryArea: { flex: 1, backgroundColor: '#0a0a0a', alignItems: 'center', paddingTop: 20 },
  inventoryTitle: { color: '#888', marginBottom: 20 },
  cardsRow: { flexDirection: 'row', gap: 10 }
});