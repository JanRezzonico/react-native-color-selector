import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { ColorSelector } from 'react-native-color-selector';

export default function App() {
  const [color, setColor] = useState('#ffff00');
  return (
    <View style={styles.container}>
      <ColorSelector color={color} setColor={setColor} randomStart={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
