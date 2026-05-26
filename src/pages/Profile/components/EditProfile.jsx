import React, { useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import { useAlert } from '../../../context/AlertContext';
import { 
  UserIcon, 
  EnvelopeIcon,
  ChevronLeftIcon
} from 'react-native-heroicons/outline';
import ChangePasswordModal from './ChangePasswordModal';
import { useState } from 'react'; // Ensure useState is imported

const EditProfile = () => {
  const { user, updateProfile, changePassword } = useContext(AuthContext);
  const { showAlert, showToast } = useAlert();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      await changePassword(oldPassword, newPassword);
      showToast('Password changed successfully! Please login again.', 'success');
      navigation.goBack();
    } catch (error) {
      showAlert('Error', error.message, 'error');
      throw error; // Propagate to modal
    }
  };
  
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
    }
  });

  useEffect(() => {
    if (user?.user) {
      setValue('name', user.user.name || '');
      setValue('email', user.user.email || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      showToast('Profile updated successfully!', 'success');
      navigation.goBack();
    } catch (error) {
      showToast(error.message || 'Failed to update profile', 'error');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-6 pt-4 mb-6">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-2 rounded-xl bg-white border border-slate-100 shadow-sm mr-4"
          >
            <ChevronLeftIcon size={20} color="#1e293b" />
          </TouchableOpacity>
          <Text className="text-2xl font-black text-slate-900">Edit Profile</Text>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            className="flex-1 px-6" 
            showsVerticalScrollIndicator={false}
          >
            {/* Form Container */}
            <View className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 space-y-6">
              
              {/* Name Input */}
              <View>
                <Text className="text-slate-500 font-bold mb-2 ml-1">Full Name</Text>
                <View className={`flex-row items-center bg-slate-50 border ${errors.name ? 'border-rose-400 bg-rose-50' : 'border-slate-100'} rounded-2xl px-4 py-3.5`}>
                  <UserIcon size={20} color={errors.name ? '#f43f5e' : '#64748b'} />
                  <Controller
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1 ml-3 text-slate-900 font-medium text-base h-full" // Added h-full to ensure input takes height
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Enter your full name"
                        placeholderTextColor="#94a3b8"
                      />
                    )}
                    name="name"
                  />
                </View>
                {errors.name && <Text className="text-rose-500 text-xs font-bold mt-1 ml-1">{errors.name.message}</Text>}
              </View>

              {/* Email Input */}
              <View>
                <Text className="text-slate-500 font-bold mb-2 ml-1">Email Address</Text>
                <View className={`flex-row items-center bg-slate-50 border ${errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-100'} rounded-2xl px-4 py-3.5`}>
                  <EnvelopeIcon size={20} color={errors.email ? '#f43f5e' : '#64748b'} />
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
                        className="flex-1 ml-3 text-slate-900 font-medium text-base h-full"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Enter your email"
                        placeholderTextColor="#94a3b8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    )}
                    name="email"
                  />
                </View>
                 {errors.email && <Text className="text-rose-500 text-xs font-bold mt-1 ml-1">{errors.email.message}</Text>}
              </View>

            </View>

             {/* Action Button */}
              <TouchableOpacity 
                onPress={() => setModalVisible(true)}
                className="bg-indigo-100 p-4 rounded-2xl items-center"
              >
                <Text className="text-indigo-700 font-bold text-lg">Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleSubmit(onSubmit)}
                className="mt-4 bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-200 items-center"
              >
                <Text className="text-white font-bold text-lg">Save Changes</Text>
              </TouchableOpacity>

            </ScrollView>
          </KeyboardAvoidingView>
        </View>

        <ChangePasswordModal 
          visible={modalVisible} 
          onClose={() => setModalVisible(false)}
          onChangePassword={handleChangePassword}
        />
      </SafeAreaView>
    );
  };

export default EditProfile;
