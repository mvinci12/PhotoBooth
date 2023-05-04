// import * as React from 'react';
// import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Entypo } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';

// export default function Button({ title, onPress, icon, color }) {
//   return (
//     <TouchableOpacity onPress={onPress} style={styles.button}>
//       <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
//       <Text style={styles.text}>{title}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     height: 40,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#f1f1f1',
//     marginLeft: 10,
//   },
// });

// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Button({
  title,
  onPress,
  icon,
  color = 'white',
  IconComponent = MaterialIcons,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <IconComponent name={icon} size={24} color={color} />
      {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
});
