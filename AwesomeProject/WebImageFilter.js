// // WebImageFilter.js
// import React from 'react';

// const WebImageFilter = ({ filter, image }) => {
//   const filterStyle = () => {
//     switch (filter) {
//       case 'grayscale':
//         return { filter: 'grayscale(100%)' };
//       case 'blur':
//         return { filter: 'blur(10px)' };
//       case 'brightness':
//         return { filter: 'brightness(150%)' };
//       case 'contrast':
//         return { filter: 'contrast(150%)' };
//       case 'hue':
//         return { filter: 'hue-rotate(90deg)' };
//       case 'saturation':
//         return { filter: 'saturate(200%)' };
//       default:
//         return {};
//     }
//   };

//   return <img src={image} style={{ ...filterStyle(), width: 300, height: 300 }} alt="Filtered" />;
// };

// export default WebImageFilter;
















// // WebImageFilter.js
import React, {useRef, useEffect} from 'react';

const WebImageFilter = ({ filter, image, onImageLoad }) => {
  const filterStyle = () => {
    switch (filter) {
      case 'grayscale':
        return { filter: 'grayscale(100%)' };
      case 'blur':
        return { filter: 'blur(10px)' };
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

  const handleImageLoad = (event) => {
    if (onImageLoad) {
      const filteredImage = event.target;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      canvas.width = filteredImage.width;
      canvas.height = filteredImage.height;
      // ctx.filter = "filteredImage.style.filter;"
      ctx.filter = "blur()";
      ctx.drawImage(filteredImage, 0, 0, canvas.width, canvas.height);
  
      const dataURL = canvas.toDataURL("image/png");
      onImageLoad(dataURL);
    }
  };
  

  const imgRef = useRef();

  useEffect(() => {
    if (!imgRef.current) return;
    const imgElement = imgRef.current;
    imgElement.style.filter = filterStyle(filter);
    onImageLoad(imgElement.src);
  }, [filter]);

  return (
    <img
      src={image}
      style={{ ...filterStyle(), width: 300, height: 300 }}
      alt="Filtered"
      onLoad={handleImageLoad}
    />
  );


  // return (
  //   <img
  //     ref={imgRef}
  //     src={image}
  //   />
  // );

};

export default WebImageFilter;







// import React, { useEffect, useRef } from 'react';

// const WebImageFilter = ({ filter, image, onImageLoad }) => {
//   const imgRef = useRef();

//   useEffect(() => {
//     if (!imgRef.current) return;

//     const imgElement = imgRef.current;

//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const img = new Image();
//     img.crossOrigin = 'Anonymous';
//     img.src = image;

//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.filter = filterStyle(filter);
//       ctx.drawImage(img, 0, 0, img.width, img.height);
//       const dataURL = canvas.toDataURL('image/png');

//       imgElement.src = dataURL;
//       onImageLoad(dataURL);
//     };
//   }, [filter, image, onImageLoad]);

//   const filterStyle = (filter) => {
//     switch (filter) {
//       case 'grayscale':
//         return 'grayscale(100%)';
//       case 'blur':
//         return 'blur(10px)';
//       case 'brightness':
//         return 'brightness(150%)';
//       case 'contrast':
//         return 'contrast(150%)';
//       case 'hue':
//         return 'hue-rotate(90deg)';
//       case 'saturation':
//         return 'saturate(200%)';
//       default:
//         return '';
//     }
//   };

//   return <img ref={imgRef} src={image} style={{ width: 300, height: 300 }} alt="Filtered" />;
// };

// export default WebImageFilter;
