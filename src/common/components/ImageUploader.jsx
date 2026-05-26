import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { UserIcon, CameraIcon } from 'react-native-heroicons/outline';

const ImageUploader = ({ 
  imageUri, 
  onImageSelected, 
  size = 100,
  placeholder = null
}) => {
  
  const handleSelectImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    try {
      const result = await launchImageLibrary(options);
      
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error launching image library:', error);
    }
  };

  return (
    <TouchableOpacity 
      onPress={handleSelectImage}
      activeOpacity={0.8}
      className="relative"
      style={{ width: size, height: size }}
    >
      <View 
        className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-sm items-center justify-center"
      >
        {imageUri ? (
          <Image 
            source={{ uri: imageUri }} 
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          placeholder || <UserIcon size={size * 0.5} color="#64748b" />
        )}
      </View>
      
      <View className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full border-[3px] border-white dark:border-slate-800 shadow-sm">
        <CameraIcon size={size * 0.18} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default ImageUploader;
