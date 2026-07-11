import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import Icon from '../../components/Icon';
import IslamicCard from '../../components/IslamicCard';
import AppInput from '../../components/AppInput';
import { calculateZakat, formatCurrency } from '../../utils/helpers';

const inputStyle = "bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-[15px] text-[#111827]";

const ZakatScreen: React.FC = () => {
  const [cash, setCash] = useState('');
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');
  const [businessAssets, setBusinessAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [result, setResult] = useState<{ netAssets: number; zakatDue: number } | null>(null);

  const handleCalculate = () => {
    Keyboard.dismiss();
    const calc = calculateZakat(parseFloat(cash) || 0, parseFloat(gold) || 0, parseFloat(silver) || 0, parseFloat(businessAssets) || 0, parseFloat(liabilities) || 0);
    setResult(calc);
  };

  const input = (label: string, val: string, set: (v: string) => void, icon: string) => (
    <View className="mb-4 last:mb-0">
      <Text className="text-[13px] font-semibold text-[#111827] mb-2">{label}</Text>
      <View className="flex-row items-center bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] h-[54px]">
        <View className="pl-4"><Icon name={icon} size={16} color='#9CA3AF' /></View>
        <TextInput className="flex-1 px-4 text-[15px] text-[#111827]" value={val} onChangeText={set} placeholder="Enter amount" placeholderTextColor='#9CA3AF' keyboardType="decimal-pad" />
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      <View style={{ gap: 16 }}>
        <View className="bg-white rounded-3xl p-5"
          style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
        >
          <Text className="text-[11px] font-bold text-[#6B7280] tracking-widest uppercase mb-4">Assets</Text>
          {input('Cash & Savings', cash, setCash, 'wallet')}
          {input('Gold Value', gold, setGold, 'gem')}
          {input('Silver Value', silver, setSilver, 'gem')}
          {input('Business Assets', businessAssets, setBusinessAssets, 'briefcase')}
          {input('Liabilities (subtracted)', liabilities, setLiabilities, 'minus')}
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity onPress={handleCalculate} activeOpacity={0.85}
            className="flex-1 h-[54px] rounded-2xl bg-primary items-center justify-center"
            style={{ shadowColor: '#0F9D8A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
          >
            <Text className="text-white text-[15px] font-bold">Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCash(''); setGold(''); setSilver(''); setBusinessAssets(''); setLiabilities(''); setResult(null); }}
            activeOpacity={0.7} className="flex-1 h-[54px] rounded-2xl bg-white items-center justify-center border border-[#E5E7EB]"
          >
            <Text className="text-[#6B7280] text-[15px] font-bold">Reset</Text>
          </TouchableOpacity>
        </View>

        {result && (
          <View className="bg-white rounded-3xl p-5"
            style={{ shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}
          >
            <View className="items-center mb-4">
              <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center mb-3">
                <Icon name="calculator" size={24} color='#0F9D8A' />
              </View>
              <Text className="text-[18px] font-bold text-[#111827] tracking-tight">Zakat Result</Text>
            </View>
            <View className="bg-[#F8FAFC] rounded-2xl p-5 mb-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[14px] text-[#6B7280] font-medium">Net Assets</Text>
                <Text className="text-[20px] font-bold text-[#111827] tracking-tight">{formatCurrency(result.netAssets)}</Text>
              </View>
              <View className="h-px bg-[#E5E7EB]" />
              <View className="flex-row justify-between items-center mt-4">
                <Text className="text-[14px] text-[#6B7280] font-medium">Zakat Due (2.5%)</Text>
                <Text className="text-[20px] font-bold tracking-tight text-primary">{formatCurrency(result.zakatDue)}</Text>
              </View>
            </View>
            <View className="bg-primary/8 rounded-2xl p-5">
              <Text className="text-[11px] font-bold text-[#111827] mb-2 tracking-wider">Formula</Text>
              <Text className="text-[12px] text-[#6B7280] leading-relaxed">(Cash & Savings + Gold + Silver + Business Assets − Liabilities) × 2.5%</Text>
              <Text className="text-[12px] text-[#6B7280] leading-relaxed mt-2">Zakat is due when net assets exceed the Nisab threshold and have been held for one lunar year.</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ZakatScreen;
