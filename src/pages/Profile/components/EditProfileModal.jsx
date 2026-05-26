import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { UserIcon, EnvelopeIcon } from 'react-native-heroicons/outline';
import { useAlert } from '../../../context/AlertContext';
import BaseModal from '../../../common/components/BaseModal';
import ImageUploader from '../../../common/components/ImageUploader';

import { useTheme } from '../../../context/ThemeContext';

const EditProfileModal = ({ 
  visible, 
  onClose, 
  user, 
  onUpdateProfile 
}) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { showToast } = useAlert();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
    }
  });

  useEffect(() => {
    if (user?.user && visible) {
      setValue('name', user.user.name || '');
      setValue('email', user.user.email || '');
      setSelectedImage(user.user.profile_image || null);
    }
  }, [user, visible, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Actually call the update function passed as prop
      await onUpdateProfile({ ...data, profile_image: selectedImage });
      onClose();
    } catch (error) {
      console.log('Update profile failed', error);
      showToast(error.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Edit Profile"
    >
      <View className="space-y-6">
        {/* Profile Image */}
        <View className="items-center mb-2">
          <ImageUploader
            imageUri={selectedImage}
            onImageSelected={setSelectedImage}
            size={100}
          />
        </View>

        {/* Name Input */}
        <View className="mb-3">
          <View className="relative">
            <View className="absolute left-4 top-3 z-10">
              <UserIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
            </View>
            <Controller
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 rounded-2xl border ${
                    errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Full Name"
                  placeholderTextColor="#64748b"
                  keyboardAppearance={isDarkMode ? 'dark' : 'light'}
                />
              )}
              name="name"
            />
          </View>
          {errors.name && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.name.message}
            </Text>
          )}
        </View>

        {/* Email Input */}
        <View className="mb-3">
          <View className="relative">
            <View className="absolute left-4 top-3 z-10">
              <EnvelopeIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
            </View>
            <Controller
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 rounded-2xl border ${
                    errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="You@example.com"
                  placeholderTextColor="#64748b"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  keyboardAppearance={isDarkMode ? 'dark' : 'light'}
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.email.message}
            </Text>
          )}
        </View>

        <TouchableOpacity 
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className={`mt-4 p-4 rounded-2xl items-center shadow-lg ${loading ? 'bg-indigo-400' : 'bg-indigo-600 shadow-indigo-200 dark:shadow-none'}`}
        >
          <Text className="text-white font-bold text-lg">
            {loading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

export default EditProfileModal;
