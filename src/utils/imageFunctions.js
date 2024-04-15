import { Platform } from 'react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const convertBlobToImage = async({data}) => {
  try {
    const base64String = await convertBase64String({data})
    const base64Code = removeDataURIPrefix(base64String)
    const base64image = `data:image/jpeg;base64,${base64Code}`
    const { uri } = await manipulateAsync(
      base64image,
      [],
      { compress: 1, format: SaveFormat.JPEG }
    );
    return uri
  } catch(e) {
    console.log('convert blob to image error', e)
  }
}

const convertBase64String = async({data}) => {
  if(Platform.OS === 'ios') {
    const url = URL.createObjectURL(new Blob([data]));
    const res = await request(url)
    const base64String = await toDataURI(res)
    return base64String
  } else if(Platform.OS === 'android') {
    const base64String = await convertBlobToBase64({data})
    return base64String
  } else {
    throw new Error('convert base64 string error');
  }
}

const convertBlobToBase64 = async({data}) => {
  return new Promise((resolve, reject) => {
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(data);
    fileReaderInstance.onload = () => {
      const base64data = fileReaderInstance.result;
      resolve(base64data);
    };
    fileReaderInstance.onerror = (error) => {
      reject(error);
    };
  });
}

const request = (url, data) =>
  new Promise((resolve) => {
    const req = new XMLHttpRequest();

    req.open('POST', url, true);
    req.responseType = 'blob';

    req.onload = () => {
      // At this point, req.response is a Blob.
      resolve(req.response);
    };

    req.send(data);
  });

const toDataURI = (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const uri = reader.result?.toString();
      resolve(uri);
    };
  });

const removeDataURIPrefix = (dataURI) => {
  return dataURI.replace(/^data:.*?;base64,/, '');
};

export { convertBlobToImage }