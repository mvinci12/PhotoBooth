import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native-web';
import FilterOptions from './FilterOptions';



const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [camera, setCamera] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);



  


  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      setCapturedImage(photo.uri);
    }
  };
  

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (!result.cancelled) {
      setCapturedImage(result.uri);
    }
  };

  const handleSaveImage = async () => {
    if (capturedImage) {
      let fileName = capturedImage.split('/').pop();
      let extension = fileName.split('.').pop();
      let newFileName = FileSystem.documentDirectory + 'photo.' + extension;

      try {
        if (Platform.OS === 'web') {
          const response = await fetch(capturedImage);
          const blob = await response.blob();
          const uri = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = uri;
          link.download = fileName;
          link.click();
          alert('Image saved successfully!');
        }
      } catch (error) {
        console.log(error);
        alert('Error saving image.');
      }
    } else {
      alert('No image to save!');
    }
  };

  const handleFilterImage = () => {
    setShowFilterOptions(true);
  };

  const handleFilterClose = () => {
    setShowFilterOptions(false);
  };

  // const handleFilterSave = (uri) => {
  //   // setCapturedImage(uri);
  //   // setShowFilterOptions(false);
  //   setCapturedImage(uri, () => setShowFilterOptions(false));
  // };

  const handleFilterSave = (uri) => {
    setCapturedImage(uri);
  };


  useEffect(() => {
    if (capturedImage) {
      setShowFilterOptions(false);
    }
  }, [capturedImage]);


  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        ref={setCameraRef}
      >
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={handleCameraType}>
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
            <Text style={styles.buttonText}>Take a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePickImage}>
            <Text style={styles.buttonText}>Choose a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleFilterImage}>
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSaveImage}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedImage && (
        <Image source={{ uri: capturedImage }} style={styles.preview} resizeMode="contain" />
      )}
      {showFilterOptions && (
        <FilterOptions
          capturedImage={capturedImage}
          onClose={handleFilterClose}
          onSave={handleFilterSave}
        />
//         <FilterOptions
//             onSave={handleFilterSave}
//             visible={showFilterOptions}
//             onClose={() => setShowFilterOptions(false)}
//             imageUri={capturedImage}
// />
      )}
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  filterOptions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
  },
  filterOption: {
    margin: 5,
  },
  filterOptionImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  filterOptionName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  filterOptionSelected: {
    borderWidth: 2,
    borderColor: 'blue',
  },
});


export default App;