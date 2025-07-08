// src/components/VirtualKeyboard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const keys = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0']];

type Props = {
  onPress: (key: string) => void;
};

const VirtualKeyboard = ({ onPress }: Props) => (
  <View style={styles.container}>
    {keys.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map(key => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => {
              onPress(key);
            }}>
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  key: {
    width: 120,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  keyText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default VirtualKeyboard;
