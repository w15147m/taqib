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
import { login as loginService } from '../../services/authServices';
import AuthLayout from '../../components/AuthLayout';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const { showToast } = useAlert();
  const { theme, isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError(''); // Clear previous errors
    try {
      const response = await loginService(data.email, data.password);
      await login(response);
      showToast('Login successful!', 'success');
    } catch (error) {
      setLoginError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back!" 
      subtitle="Continue your journey and unlock new badges."
    >
      <View className="space-y-4">
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
                  value: 3,
                  message: 'Password must be at least 3 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 pr-12 rounded-2xl border ${
                    errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                  placeholder="Enter your password"
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
          {loginError && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {loginError}
            </Text>
          )}
        </View>

        {/* Login Button */}
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
              Log In with Email
            </Text>
          )}
        </TouchableOpacity>

        {/* Register Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-slate-500 dark:text-slate-400 text-base">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-base">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default Login;
