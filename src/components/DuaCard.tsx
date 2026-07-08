import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { Dua } from '../types';

interface DuaCardProps {
  dua: Dua;
  onToggleAnswered: () => void;
  onDelete: () => void;
}

const DuaCard: React.FC<DuaCardProps> = ({
  dua,
  onToggleAnswered,
  onDelete,
}) => {
  return (
    <View
      className={`bg-white rounded-2xl p-4 border ${dua.answered ? 'border-success/20' : 'border-borderLight'}`}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-base font-semibold text-ink">{dua.title}</Text>
            {dua.answered && (
              <View className="bg-success/10 px-2 py-0.5 rounded-full ml-2">
                <Text className="text-xs font-medium text-success">Answered</Text>
              </View>
            )}
          </View>
          <Text className="text-sm text-muted mt-1 leading-5">{dua.content}</Text>
          <View className="flex-row items-center mt-2">
            <View className="bg-surface px-2 py-0.5 rounded-full">
              <Text className="text-xs text-muted">{dua.category}</Text>
            </View>
            {dua.isShared && (
              <View className="ml-2">
                <Ionicons name="people" size={16} color={colors.muted} />
              </View>
            )}
          </View>
        </View>
      </View>

        <View className="flex-row justify-end mt-3 gap-3">
        <TouchableOpacity
          onPress={onToggleAnswered}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Ionicons
            name={dua.answered ? 'close-circle-outline' : 'checkmark-circle-outline'}
            size={16}
            color={dua.answered ? colors.muted : colors.primary}
          />
          <Text className="text-xs ml-1 text-muted">
            {dua.answered ? 'Unmark' : 'Mark answered'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} activeOpacity={0.7} className="flex-row items-center">
          <Ionicons name="trash-outline" size={16} color={colors.error} />
          <Text className="text-xs ml-1 text-error">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DuaCard;
