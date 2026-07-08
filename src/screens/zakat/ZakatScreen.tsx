import React, { useState } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import IslamicCard from '../../components/IslamicCard';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { calculateZakat, formatCurrency } from '../../utils/helpers';
import { colors } from '../../constants/colors';

const ZakatScreen: React.FC = () => {
  const [cash, setCash] = useState('');
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');
  const [businessAssets, setBusinessAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [result, setResult] = useState<{ netAssets: number; zakatDue: number } | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    Keyboard.dismiss();
    const cashNum = parseFloat(cash) || 0;
    const goldNum = parseFloat(gold) || 0;
    const silverNum = parseFloat(silver) || 0;
    const businessNum = parseFloat(businessAssets) || 0;
    const liabilitiesNum = parseFloat(liabilities) || 0;

    const calc = calculateZakat(cashNum, goldNum, silverNum, businessNum, liabilitiesNum);
    setResult(calc);
    setShowResult(true);
  };

  const handleReset = () => {
    Keyboard.dismiss();
    setCash('');
    setGold('');
    setSilver('');
    setBusinessAssets('');
    setLiabilities('');
    setResult(null);
    setShowResult(false);
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Zakat Calculator" subtitle="Calculate your Zakat" />

      <ScreenWrapper scroll background="surface" withPadding edges={['bottom']} contentClassName="pt-0">
        <AppInput
          label="Cash & Savings"
          value={cash}
          onChangeText={setCash}
          placeholder="Enter amount"
          keyboardType="numeric"
          icon="wallet-outline"
        />

        <AppInput
          label="Gold Value"
          value={gold}
          onChangeText={setGold}
          placeholder="Enter value in USD"
          keyboardType="numeric"
          icon="diamond-outline"
        />

        <AppInput
          label="Silver Value"
          value={silver}
          onChangeText={setSilver}
          placeholder="Enter value in USD"
          keyboardType="numeric"
          icon="diamond-outline"
        />

        <AppInput
          label="Business Assets"
          value={businessAssets}
          onChangeText={setBusinessAssets}
          placeholder="Enter value in USD"
          keyboardType="numeric"
          icon="briefcase-outline"
        />

        <AppInput
          label="Liabilities (subtracted)"
          value={liabilities}
          onChangeText={setLiabilities}
          placeholder="Enter total debts"
          keyboardType="numeric"
          icon="remove-circle-outline"
        />

        <View className="flex-row gap-3">
          <View className="flex-1">
            <AppButton title="Calculate" onPress={handleCalculate} variant="primary" />
          </View>
          <View className="flex-1">
            <AppButton title="Reset" onPress={handleReset} variant="ghost" />
          </View>
        </View>

        {showResult && result && (
          <IslamicCard variant="white" className="mt-6">
            <View className="items-center mb-4">
              <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center mb-2">
                <Ionicons name="calculator-outline" size={24} color={colors.primary} />
              </View>
              <Text className="text-lg font-bold text-ink">Zakat Result</Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 mb-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm text-muted">Net Assets</Text>
                <Text className="text-lg font-bold text-ink">
                  {formatCurrency(result.netAssets)}
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row justify-between items-center mt-3">
                <Text className="text-sm text-muted">Zakat Due (2.5%)</Text>
                <Text className="text-lg font-bold" style={{ color: colors.primary }}>
                  {formatCurrency(result.zakatDue)}
                </Text>
              </View>
            </View>

            <View className="bg-primary/5 rounded-2xl p-4">
              <Text className="text-xs font-semibold text-ink mb-2">Formula</Text>
              <Text className="text-xs text-muted leading-relaxed">
                (Cash & Savings + Gold + Silver + Business Assets − Liabilities) × 2.5%
              </Text>
              <Text className="text-xs text-muted leading-relaxed mt-1">
                Zakat is due when net assets exceed the Nisab threshold and have been held for one lunar year.
              </Text>
            </View>
          </IslamicCard>
        )}
      </ScreenWrapper>
    </View>
  );
};

export default ZakatScreen;
