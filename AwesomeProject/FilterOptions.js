import React, { useState, useRef, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import WebImageFilter from './WebImageFilter';
import FileSaver from 'file-saver';
import * as FileSystem from 'expo-file-system';


const useCanvasToDataURL = (imageSrc, style) => {
    const canvasRef = useRef(null);
    const [dataURL, setDataURL] = useState(null);
  
    useEffect(() => {
      if (!imageSrc || !canvasRef.current) return;
  
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
  
      const img = new Image();
      img.src = imageSrc;
      img.crossOrigin = 'Anonymous'; // This is required if the image is hosted on a different domain
  
      img.onload = () => {
        canvas.width = style.width;
        canvas.height = style.height;
        ctx.filter = style.filter;
        ctx.drawImage(img, 0, 0, style.width, style.height);
        const newDataURL = canvas.toDataURL('image/png');
        setDataURL(newDataURL);
      };
    }, [imageSrc, style]);
  
    return { dataURL, canvasRef };
  };





const FilterOptions = ({ capturedImage, onClose, onSave }) => {
    const [manipulatedImage, setManipulatedImage] = useState(capturedImage);
    const [filter, setFilter] = useState(null);
    const [filteredUri, setFilteredUri] = useState(null);

  
    const handleApplyFilter = async (filter) => {
        //const dataUrl = await applyFilterOnWeb();
        // setManipulatedImage(dataUrl);
        console.log('filter in handleapplyfilter: ');
        console.log(filter);
        setFilter(filter);
        // await applyFilterOnWeb();
    };


    // const handleImageLoad = (filteredUri) => {
    //     setManipulatedImage(filteredUri);
    //   };

    // const handleImageLoad = async (filteredUri) => {
    //     console.log('filter: ');
    //     console.log(filter);
    //     // const filteredImageDataUrl = await applyFilterOnWeb(filter, filteredUri);
    //     setManipulatedImage(filteredImageDataUrl);
    //   };


    const handleImageLoad = async (filteredUri) => {
        console.log('filter: ');
        console.log(filter);
        setFilteredUri(filteredUri);
      };
      
      
      


    // const handleApplyFilter = async (filter) => {
    //     setFilter(filter);
    //     if (Platform.OS === 'web') {
    //       const dataUrl = await applyFilterOnWeb();
    //       setFilteredUri(dataUrl);
    //     }
    //   };
      
    

    // const handleSaveFilter = async () => {
    //     if (Platform.OS === 'web') {
    //         const dataUrl = await applyFilterOnWeb();
    //         setManipulatedImage(dataUrl);
    //         onSave(dataUrl);
    //         // <WebImageFilter filter={filter} image={manipulatedImage} />;
    //     }
    //   };


    // const handleSaveFilter = async () => {
    //     if (Platform.OS === 'web') {
    //       await applyFilterOnWeb();
    //     }
    //   };

    // const handleSaveFilter = async () => {
    //     if (manipulatedImage) {
    //       if (Platform.OS === 'web') {
    //         try {
    //           const filteredImage = await applyFilterOnWeb(); // Apply the filter before saving
      
    //           let fileName = filteredImage.split('/').pop();
    //           let extension = fileName.split('.').pop();
      
    //           const response = await fetch(filteredImage);
    //           const blob = await response.blob();
    //           const uri = URL.createObjectURL(blob);
    //           const link = document.createElement('a');
    //           link.href = uri;
    //           link.download = fileName;
    //           link.click();
    //           alert('Image saved successfully!');
    //         } catch (error) {
    //           console.log(error);
    //           alert('Error saving image.');
    //         }
    //       }
    //     } else {
    //       alert('No image to save!');
    //     }
    //   };

    const filterStyle = () => {
        switch (filter) {
          case 'grayscale':
            return { filter: 'grayscale(100%)' };
          case 'blur':
            return { filter: "blur(5px)" };
          case 'brightness':
            return { filter: 'brightness(150%)' };
          case 'contrast':
            return { filter: 'contrast(150%)' };
          case 'hue':
            return { filter: 'hue-rotate(90deg)' };
          case 'saturation':
            return { filter: 'saturate(200%)' };
          default:
            return {};
        }
      };

    const style = { ...filterStyle(), width: 300, height: 300 };
  
    // const { dataURL, canvasRef } = useCanvasToDataURL(manipulatedImage, style);

    


    // const handleSaveFilter = async () => {
    //     const dataURL = await applyFilterOnWeb(filter, manipulatedImage);
    //     console.log(dataURL);
    //     const blob = dataUrlToBlob(dataURL);
    //     console.log(blob);
    //     FileSaver.saveAs(blob, 'myimage.png'); // replace 'myimage.png' with your desired file name and extension
    //   }


    // const handleSaveFilter = async () => {
    //     if (manipulatedImage) {
    //       if (Platform.OS === 'web') {
    //         try {
    //           const filteredImage = await applyFilterOnWeb(filter, manipulatedImage); // Pass the filter here
      
    //           let fileName = filteredImage.split('/').pop();
    //           let extension = fileName.split('.').pop();
      
    //           const response = await fetch(filteredImage); // Use the filtered image URL to download the image
    //           const blob = await response.blob();
    //           const uri = URL.createObjectURL(blob);
    //           const link = document.createElement('a');
    //           link.href = uri;
    //           link.download = fileName;
    //           link.click();
    //           alert('Image saved successfully!');
    //         } catch (error) {
    //           console.log(error);
    //           alert('Error saving image.');
    //         }
    //       }
    //     } else {
    //       alert('No image to save!');
    //     }
    //   };

//     const handleSaveFilter = async () => {
//         console.log('captured: ');
//         console.log(capturedImage);
//         console.log('manipulated: ');
//         console.log(manipulatedImage);
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         const img = new Image();
//         img.src = manipulatedImage;
//         console.log('manipulatedimage: ');
//         console.log(manipulatedImage);
//         img.onerror = function() {
//             console.error('Error loading image');
//           }
          

//         img.onload = function() {
//         canvas.width = img.width;
//         canvas.height = img.height;

//         // Apply image styles
//         console.log('filter style: ');
//         console.log(filterStyle());
//         // ctx.filter = filterStyle();
//         ctx.filter = "blur(5px)";
//         // ctx.drawImage(img, 0, 0, img.width, img.height);
//         ctx.drawImage(img, 0, 0, img.width, img.height);

//         // Save the image
//         const link = document.createElement("a");
//         link.download = "filtered-image.png";
//         link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//         console.log(link.href);
//         link.click();
//     }
// }


// const handleSaveFilter = async () => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
  
//     const loadImage = (src) => {
//       return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.src = src;
//         img.crossOrigin = "anonymous";
//         img.onload = () => resolve(img);
//         img.onerror = (error) => reject(error);
//       });
//     };
  
//     try {
//       const img = await loadImage(filteredUri); // Use filteredUri
//       canvas.width = img.width;
//       canvas.height = img.height;
  
//       // Draw the filtered image onto the main canvas
//       ctx.drawImage(img, 0, 0, img.width, img.height);
  
//       // Save the image
//       const link = document.createElement("a");
//       link.download = "filtered-image.png";
//       link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//       console.log(link.href);
//       link.click();
//     } catch (error) {
//       console.error('Error loading image:', error);
//     }
//   };



// const handleSaveFilter = async () => {
//     if (!manipulatedImage) return;
    
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
  
//     const img = new Image();
//     img.src = manipulatedImage;
//     img.crossOrigin = "anonymous";
  
//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.filter = filterStyle().filter;
//       console.log(filterStyle().filter);
//       ctx.drawImage(img, 0, 0, img.width, img.height);
  
//       // Save the image
//       const link = document.createElement("a");
//       link.download = "filtered-image.png";
//       link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//       link.click();
//     };
//   };





const handleSaveFilter = async () => {
    if (!manipulatedImage) return;
  
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const img = new Image();
    img.src = manipulatedImage;
    img.crossOrigin = "anonymous";
  
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
  
      // Save the image
      const link = document.createElement("a");
      link.download = "filtered-image.png";
      link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      link.click();
    };
  };
  
  
  
  
  
  
  
      


      function dataUrlToBlob(dataURL) {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: mimeType });
      }







    // const handleSaveFilter = async () => {
    //     if (manipulatedImage) {
    //       if (Platform.OS === 'web') {
    //         try {

    //         const filteredImage = await applyFilterOnWeb(filter, manipulatedImage); // Pass the filter here

    //           let fileName = manipulatedImage.split('/').pop();
    //           let extension = fileName.split('.').pop();
      
    //           const response = await fetch(manipulatedImage); // Use the manipulatedImage state directly
    //           const blob = await response.blob();
    //           const uri = URL.createObjectURL(blob);
    //           const link = document.createElement('a');
    //           link.href = uri;
    //           link.download = fileName;
    //           link.click();
    //           alert('Image saved successfully!');
    //         } catch (error) {
    //           console.log(error);
    //           alert('Error saving image.');
    //         }
    //       }
    //     } else {
    //       alert('No image to save!');
    //     }
    //   };
      
      
      
      
  
    // const renderFilter = () => {
    //     console.log('filter that supposed to go to webimagefilter: ');
    //     console.log(filter);
    //     if (Platform.OS === 'web') {
    //       return <WebImageFilter filter={filter} image={manipulatedImage} />;
    //     }
    // };

    // const renderFilter = () => {
    //     if (Platform.OS === 'web') {
    //       return <WebImageFilter filter={filter} image={capturedImage} onImageLoad={handleImageLoad} />;
    //     }
    //   };


    const renderFilter = () => {
        if (Platform.OS === 'web') {
            return <WebImageFilter filter={filter} image={manipulatedImage} onImageLoad={handleImageLoad} />;
        }
    };
    



      


    // const applyFilterOnWeb = () => {
    //     return new Promise((resolve) => {
    //       const canvas = document.createElement('canvas');
    //       const ctx = canvas.getContext('2d');
      
    //       const img = new Image();
    //       img.crossOrigin = 'Anonymous';
    //       img.src = manipulatedImage;
      
    //       const filterStyle = getFilterStyle(filter);
    //       console.log('got the filter');
    //       console.log(filterStyle);
      
    //       img.onload = () => {
    //         canvas.width = img.width;
    //         canvas.height = img.height;
    //         ctx.filter = filterStyle;
    //         ctx.drawImage(img, 0, 0, img.width, img.height);
    //         const dataUrl = canvas.toDataURL('image/jpeg');
    //         console.log('dataURL: ');
    //         resolve(dataUrl);
    //         // console.log(dataUrl);
    //         // Update the manipulatedImage state with the filtered image
    //         setManipulatedImage(dataUrl);
    //       };
    //     });
    //   };

    // const applyFilterOnWeb = () => {
    //     return new Promise((resolve) => {
    //       const canvas = document.createElement('canvas');
    //       const ctx = canvas.getContext('2d');
      
    //       const img = new Image();
    //       img.crossOrigin = 'Anonymous';
    //       img.src = manipulatedImage;
      
    //       const filterStyle = getFilterStyle(filter);
      
    //       img.onload = () => {
    //         canvas.width = img.width;
    //         canvas.height = img.height;
    //         ctx.filter = filterStyle;
    //         ctx.drawImage(img, 0, 0, img.width, img.height);
    //         const dataUrl = canvas.toDataURL('image/jpeg');
      
    //         // Update the manipulatedImage state with the filtered image
    //         setManipulatedImage(dataUrl);
      
    //         // Call the onSave prop with the filtered image URI
    //         onSave(dataUrl);
      
    //         resolve();
    //       };
    //     });
    //   };



    const applyFilterOnWeb = (filter, manipulatedImage) => {
        return new Promise(async (resolve) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
      
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = manipulatedImage;
      
          const filterStyle = getFilterStyle(filter);
      
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = filterStyle;
            console.log('filterStyle: ');
            console.log(filterStyle);
            // ctx.drawImage(img, 0, 0, img.width, img.height);
            ctx.drawImage(img, 0, 100, 5000, 5000);
            const dataURL = canvas.toDataURL('image/jpeg');
      
            resolve(dataURL); // Return the filtered image data URL
          };
        });
      };


    // const applyFilterOnWeb = (filter, image) => {
    //     return new Promise(async (resolve) => {
    //       const canvas = document.createElement('canvas');
    //       const ctx = canvas.getContext('2d');
      
    //       const img = new Image();
    //       img.crossOrigin = 'Anonymous';
    //       img.src = image;
      
    //       const filterStyle = getFilterStyle(filter);
      
    //       img.onload = () => {
    //         canvas.width = img.width;
    //         canvas.height = img.height;
    //         ctx.filter = filterStyle;
    //         ctx.drawImage(img, 0, 0, img.width, img.height);
    //         const dataUrl = canvas.toDataURL('image/jpeg');
      
    //         resolve(dataUrl); // Return the filtered image data URL
    //       };
    //     });
    //   };
      
      









      const getFilterStyle = (filter) => {
        const filters = {
          grayscale: { name: 'grayscale' },
          blur: { name: 'blur', radius: 10 },
          brightness: { name: 'brightness', value: 0.5 },
          contrast: { name: 'contrast', value: 1.5 },
          hue: { name: 'hue', value: 90 },
          saturation: { name: 'saturation', value: 2 },
        };
      
        const filterObj = filters[filter];
        let filterStyle = '';
      
        switch (filterObj.name) {
          case 'grayscale':
            filterStyle = 'grayscale(1)';
            break;
          case 'blur':
            filterStyle = `blur(${filterObj.radius}px)`;
            break;
          case 'brightness':
            filterStyle = `brightness(${filterObj.value})`;
            break;
          case 'contrast':
            filterStyle = `contrast(${filterObj.value})`;
            break;
          case 'hue':
            filterStyle = `hue-rotate(${filterObj.value}deg)`;
            break;
          case 'saturation':
            filterStyle = `saturate(${filterObj.value})`;
            break;
        }
      
        return filterStyle;
      };
      


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveFilter}>
          <Text style={styles.saveButton}>Save!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filters}>
        <TouchableOpacity onPress={() => handleApplyFilter('grayscale')}>
          <Text style={styles.filter}>Grayscale </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('blur')}>
          <Text style={styles.filter}>Blur </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('brightness')}>
          <Text style={styles.filter}> Brightness</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('contrast')}>
          <Text style={styles.filter}> Contrast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('hue')}>
          <Text style={styles.filter}> Hue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleApplyFilter('saturation')}>
          <Text style={styles.filter}> Saturation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.preview}>{renderFilter()}</View>
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