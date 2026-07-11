import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { Dua } from '../types';

interface DuaCardProps {
  dua: Dua;
  onToggleAnswered: () => void;
  onDelete: () => void;
}

const DuaCard: React.FC<DuaCardProps> = ({ dua, onToggleAnswered, onDelete }) => {
  return (
    <View
      className="bg-white rounded-3xl p-5"
      style={{
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 1,
        borderWidth: dua.answered ? 1 : 0,
        borderColor: dua.answered ? '#22C55E30' : 'transparent',
      }}
    >
      <View className="flex-row items-start">
        <View className="flex-1">
          <View className="flex-row items-center flex-wrap">
            <Text className="text-[15px] font-semibold text-[#111827]">{dua.title}</Text>
            {dua.answered && (
              <View className="bg-success/10 px-2.5 py-0.5 rounded-full ml-2">
                <Text className="text-[11px] font-semibold text-success">Answered</Text>
              </View>
            )}
          </View>
          <Text className="text-[14px] text-[#6B7280] mt-1.5 leading-6">{dua.content}</Text>
          <View className="flex-row items-center mt-3 gap-2">
            <View className="bg-[#F3F4F6] px-3 py-1 rounded-full">
              <Text className="text-[11px] text-[#6B7280] font-medium">{dua.category}</Text>
            </View>
            {dua.isShared && (
              <View className="bg-primary/8 px-3 py-1 rounded-full flex-row items-center">
                <Icon name="users" size={12} color='#0F9D8A' />
                <Text className="text-[11px] text-primary font-medium ml-1">Shared</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View className="flex-row justify-end mt-4 gap-3 pt-4 border-t border-[#F3F4F6]">
        <TouchableOpacity onPress={onToggleAnswered} activeOpacity={0.7} className="flex-row items-center px-3 py-1.5 rounded-xl bg-[#F3F4F6]">
          <Icon name={dua.answered ? 'x-circle' : 'check-circle'} size={15} color={dua.answered ? '#9CA3AF' : '#22C55E'} />
          <Text className="text-[12px] font-medium ml-1.5 text-[#6B7280]">{dua.answered ? 'Unmark' : 'Mark answered'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} activeOpacity={0.7} className="flex-row items-center px-3 py-1.5 rounded-xl bg-error/5">
          <Icon name="trash" size={15} color='#EF4444' />
          <Text className="text-[12px] font-medium ml-1.5 text-error">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DuaCard;
