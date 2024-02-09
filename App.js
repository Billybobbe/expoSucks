import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageViewer from './Components/ImageViewer';
import Button from './Components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const PlaceholderImage = require('./assets/istockphoto-1388186992-612x612.jpg')
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const pickImageAsync = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if(!result.canceled){
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true);
    }else{
      alert('You did not select any image.');
    }
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
      </View>
      {showAppOptions?(
        <View/>
      ):(
      <View style={styles.footerContainer}>
        <Button onPress={pickImageAsync} theme="primary" label="Choose a photo"/>
        <Button onPress={()=>setShowAppOptions(true)} label="Use this photo"/>
       </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  footerContainer:{
    flex: 1/3,
    alignItems: 'center',
  },
});
