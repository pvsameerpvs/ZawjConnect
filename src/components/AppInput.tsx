import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors } from '../constants/colors';

interface AppInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  error?: string;
  icon?: string;
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  error,
  icon,
  secureTextEntry,
  onToggleSecure,
}) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-medium text-ink mb-2">{label}</Text>
      )}
      <View
        className={`flex-row items-center bg-white rounded-2xl border ${error ? 'border-error' : 'border-borderLight'} h-[50px] ${multiline ? 'h-auto min-h-[100px]' : ''}`}
      >
        {icon && (
          <View className="pl-4">
            <Icon name={icon} size={16} color={colors.muted} />
          </View>
        )}
        <TextInput
          className={`flex-1 px-4 text-ink text-base ${multiline ? 'py-3' : ''}`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
        {secureTextEntry !== undefined && onToggleSecure && (
          <TouchableOpacity onPress={onToggleSecure} className="pr-4">
            <Icon name={secureTextEntry ? 'eye-off' : 'eye'} size={16} color={colors.muted} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-error text-xs mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
};

export default AppInput;
