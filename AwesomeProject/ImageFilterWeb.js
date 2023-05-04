import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ImageManipulator } from 'expo-image-manipulator';

const FilterOptions = ({ capturedImage, onClose, onSave }) => {
  const [manipulatedImage, setManipulatedImage] = useState(capturedImage);

  const handleApplyFilter = async (filter) => {
    const result = await ImageManipulator.manipulateAsync(
      capturedImage,
      [{ [filter]: {} }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setManipulatedImage(result.uri);
  };

  const handleSaveFilter = async () => {
    onSave(manipulatedImage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveFilter}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filters}>
        <TouchableOpacity onPress={() => handleApplyFilter('grayscale')}>
          <Text style={styles.filter}>Grayscale</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('blur')}>
          <Text style={styles.filter}>Blur</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('brightness')}>
          <Text style={styles.filter}>Brightness</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('contrast')}>
          <Text style={styles.filter}>Contrast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('hue')}>
          <Text style={styles.filter}>Hue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('saturation')}>
          <Text style={styles.filter}>Saturation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.preview}>
        <img src={manipulatedImage} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007aff',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  filter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  preview: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default FilterOptions;
