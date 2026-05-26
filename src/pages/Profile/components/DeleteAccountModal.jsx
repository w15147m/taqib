import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput
} from 'react-native';
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline';
import BaseModal from '../../../common/components/BaseModal';

const DeleteAccountModal = ({ 
  visible, 
  onClose, 
  onDeleteAccount 
}) => {
  const [loading, setLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const CONFIRMATION_PHRASE = "DELETE";

  const handleDelete = async () => {
    if (confirmationText !== CONFIRMATION_PHRASE) return;
    
    setLoading(true);
    try {
      await onDeleteAccount();
      onClose();
    } catch (error) {
      console.log('Delete account failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Delete Account"
    >
      <View className="space-y-6">
        <View className="bg-rose-50 dark:bg-rose-500/10 p-4 rounded-2xl border border-rose-100 dark:border-rose-500/20 flex-row items-start">
          <ExclamationTriangleIcon size={24} color="#ef4444" style={{ marginTop: 2 }} />
          <View className="ml-3 flex-1">
            <Text className="text-rose-700 dark:text-rose-400 font-bold text-lg mb-1">Warning</Text>
            <Text className="text-rose-600 dark:text-rose-500/80 text-sm leading-5">
              This action is permanent and cannot be undone. All your data and progress will be erased immediately.
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-slate-500 dark:text-slate-400 font-bold mb-2 ml-1">
            Type "{CONFIRMATION_PHRASE}" to confirm
          </Text>
          <TextInput
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white font-bold"
            onChangeText={setConfirmationText}
            value={confirmationText}
            placeholder={CONFIRMATION_PHRASE}
            placeholderTextColor="#64748b"
            autoCapitalize="characters"
          />
        </View>

        <TouchableOpacity 
          onPress={handleDelete}
          disabled={loading || confirmationText !== CONFIRMATION_PHRASE}
          className={`p-4 rounded-2xl items-center shadow-lg ${
            confirmationText === CONFIRMATION_PHRASE
              ? 'bg-rose-500 shadow-rose-200 dark:shadow-none' 
              : 'bg-slate-300 dark:bg-slate-700 shadow-slate-200 dark:shadow-none'
          }`}
        >
          <Text className="text-white font-bold text-lg">
            {loading ? 'Deleting...' : 'Delete My Account'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onClose}
          disabled={loading}
          className="p-4 rounded-2xl items-center bg-slate-100 dark:bg-slate-800"
        >
          <Text className="text-slate-600 dark:text-slate-400 font-bold text-base">Cancel</Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

export default DeleteAccountModal;
