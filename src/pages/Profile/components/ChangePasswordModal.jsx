import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Keyboard
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import BaseModal from '../../../common/components/BaseModal';

import { useTheme } from '../../../context/ThemeContext';

const PasswordInput = ({ 
  name, 
  placeholder, 
  showPass, 
  setShowPass, 
  rules,
  control,
  errors,
  isDarkMode
}) => (
  <View className="mb-3">
    <View className="relative">
      <View className="absolute left-4 top-3 z-10">
        <LockClosedIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
      </View>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 pr-12 rounded-2xl border ${
              errors[name] ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
            }`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#64748b"
            keyboardAppearance={isDarkMode ? 'dark' : 'light'}
            secureTextEntry={!showPass}
          />
        )}
        name={name}
      />
      <TouchableOpacity
        onPress={() => setShowPass(!showPass)}
        className="absolute right-4 top-3"
      >
        {showPass ? (
          <EyeSlashIcon size={24} color="#6366f1" />
        ) : (
          <EyeIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
        )}
      </TouchableOpacity>
    </View>
    {errors[name] && (
      <Text className="text-red-500 text-sm mt-1 ml-2">
        {errors[name].message}
      </Text>
    )}
  </View>
);

const ChangePasswordModal = ({ visible, onClose, onChangePassword }) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onChangePassword(data.oldPassword, data.newPassword);
      reset();
      onClose();
    } catch (error) {
      console.log('Change password failed in modal', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Change Password"
    >
      <PasswordInput 
        name="oldPassword" 
        placeholder="Current Password" 
        showPass={showOldPass} 
        setShowPass={setShowOldPass}
        rules={{ required: 'Current password is required' }}
        control={control}
        errors={errors}
        isDarkMode={isDarkMode}
      />

      <PasswordInput 
        name="newPassword" 
        placeholder="New Password" 
        showPass={showNewPass} 
        setShowPass={setShowNewPass}
        rules={{ 
          required: 'New password is required',
          minLength: { value: 6, message: 'Must be at least 6 characters' }
        }}
        control={control}
        errors={errors}
        isDarkMode={isDarkMode}
      />

      <PasswordInput 
        name="confirmPassword" 
        placeholder="Confirm New Password" 
        showPass={showConfirmPass} 
        setShowPass={setShowConfirmPass}
        rules={{ 
          required: 'Please confirm new password',
          validate: value => value === newPassword || 'Passwords do not match'
        }}
        control={control}
        errors={errors}
        isDarkMode={isDarkMode}
      />

      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        className={`mt-4 p-4 rounded-2xl items-center shadow-lg ${loading ? 'bg-indigo-400' : 'bg-indigo-600 shadow-indigo-200 dark:shadow-none'}`}
      >
        <Text className="text-white font-bold text-lg">
          {loading ? 'Updating...' : 'Update Password'}
        </Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

export default ChangePasswordModal;
