import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import DraggableCard from '../components/Album/DraggableCard'; 
import styles from './style/pasterStyle';



export default function PasteScreen({ stickers = [], onNavigate }) {
  const themeColors = ['#FFD60A', '#006B35', '#A7E5B2'];

  return (
    <View style={styles.container}>
      
      {/* METADE SUPERIOR - O ÁLBUM FÍSICO (SLOTS) */}
      <View style={styles.albumArea}>
        <Text style={styles.title}>COLE SUAS NOVAS FIGURINHAS!</Text>
        <Text style={styles.subtitle}>Arraste os cards para a área acima</Text>
        
        <View style={styles.slotsContainer}>
          {stickers.map((_, index) => (
            <View key={`slot-${index}`} style={styles.slot} />
          ))}
        </View>
      </View>

      {/* METADE INFERIOR - INVENTÁRIO (AS FIGURINHAS PARA ARRASTAR) */}
      <View style={styles.inventoryArea}>
         {stickers.map((sticker, index) => (
           <DraggableCard
             key={`drag-${sticker.id}`}
             themeColor={themeColors[index % 3]}
             stickerData={sticker}
             cardWidth={95}    
             cardHeight={135}  
           />
         ))}
      </View>

      {/* BOTÃO PARA O ÁLBUM REAL */}
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => onNavigate && onNavigate('album')}
      >
         <Text style={styles.navButtonText}>VER MEU ÁLBUM COMPLETO ➡️</Text>
      </TouchableOpacity>
      
    </View>
  );
}

