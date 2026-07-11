import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from './Icon';

interface AppInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'decimal-pad';
  multiline?: boolean;
  error?: string;
  icon?: string;
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
}

const AppInput: React.FC<AppInputProps> = ({
  label, value, onChangeText, placeholder, keyboardType = 'default',
  multiline = false, error, icon, secureTextEntry, onToggleSecure,
}) => {
  return (
    <View className="mb-4">
      {label && <Text className="text-[13px] font-semibold text-[#111827] mb-2">{label}</Text>}
      <View className={`flex-row items-center bg-white rounded-2xl border ${error ? 'border-error' : 'border-[#E5E7EB]'} ${multiline ? 'min-h-[100px]' : 'h-[54px]'}`}>
        {icon && (
          <View className="pl-4">
            <Icon name={icon} size={16} color='#9CA3AF' />
          </View>
        )}
        <TextInput
          className={`flex-1 px-4 text-[15px] text-[#111827] ${multiline ? 'py-3' : ''}`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor='#9CA3AF'
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
        {secureTextEntry !== undefined && onToggleSecure && (
          <TouchableOpacity onPress={onToggleSecure} className="pr-4">
            <Icon name={secureTextEntry ? 'eye-off' : 'eye'} size={16} color='#9CA3AF' />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-error text-[12px] mt-1.5 ml-1">{error}</Text>}
    </View>
  );
};

export default AppInput;
