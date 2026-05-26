import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { register as registerService } from '../../services/authServices';
import AuthLayout from '../../components/AuthLayout';
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';

const Register = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const { login } = useContext(AuthContext);
  const { showAlert, showToast } = useAlert();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerService({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      
      showToast('Registration successful! Please login.', 'success');
      navigation.navigate('Login');
    } catch (error) {
      showAlert('Error', error.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Get Started" 
      subtitle="Join us and unlock your potential."
    >
      <View className="space-y-3">
        {/* Name Field */}
        <View>
          <View className="relative">
            <View className="absolute left-4 top-3 z-10">
              <UserIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
            </View>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 rounded-2xl border ${
                    errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                  placeholder="Full Name"
                  placeholderTextColor="#64748b"
                  keyboardAppearance={isDarkMode ? 'dark' : 'light'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.name && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.name.message}
            </Text>
          )}
        </View>

        {/* Email Field */}
        <View>
          <View className="relative">
            <View className="absolute left-4 top-3 z-10">
              <EnvelopeIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
            </View>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 rounded-2xl border ${
                    errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                  placeholder="You@example.com"
                  placeholderTextColor="#64748b"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  keyboardAppearance={isDarkMode ? 'dark' : 'light'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.email.message}
            </Text>
          )}
        </View>

        {/* Password Field */}
        <View>
          <View className="relative">
            <View className="absolute left-4 top-3 z-10">
              <LockClosedIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
            </View>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 pr-12 rounded-2xl border ${
                    errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                  placeholder="Create a password"
                  placeholderTextColor="#64748b"
                  secureTextEntry={!showPassword}
                  keyboardAppearance={isDarkMode ? 'dark' : 'light'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3"
            >
              {showPassword ? (
                <EyeSlashIcon size={24} color="#6366f1" />
              ) : (
                <EyeIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Confirm Password Field */}
        <View>
          <View className="relative">
            <View className="absolute left-4 top-3 z-10">
              <LockClosedIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
            </View>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 pr-12 rounded-2xl border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                  placeholder="Confirm password"
                  placeholderTextColor="#64748b"
                  secureTextEntry={!showConfirmPassword}
                  keyboardAppearance={isDarkMode ? 'dark' : 'light'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-3"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon size={24} color="#6366f1" />
              ) : (
                <EyeIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
              )}
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className={`py-4 rounded-2xl mt-2 ${
            loading ? 'bg-indigo-400' : 'bg-indigo-600'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold text-lg">
              Continue with Email
            </Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-slate-500 dark:text-slate-400 text-base">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-base">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default Register;
