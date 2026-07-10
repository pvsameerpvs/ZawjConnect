import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';
import GradientHeader from '../../components/GradientHeader';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

const CATEGORIES = ['Family', 'Rizq', 'Health', 'Forgiveness', 'Marriage', 'Children', 'Akhirah'];

const AddDuaScreen: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isShared, setIsShared] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a dua title');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Validation', 'Please enter dua content');
      return;
    }
    if (!category) {
      Alert.alert('Validation', 'Please select a category');
      return;
    }

    Alert.alert('Dua Saved', 'Your dua has been added successfully.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <View className="flex-1 bg-surface">
      <GradientHeader title="Add Dua" />

      <ScreenWrapper scroll background="surface" withPadding edges={['bottom']} contentClassName="pt-6">
        <View className="px-5">
          <AppInput
            label="Dua Title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Bless our marriage"
          />

          <AppInput
            label="Dua Content"
            value={content}
            onChangeText={setContent}
            placeholder="Write your supplication..."
            multiline
          />

          <Text className="text-sm font-medium text-ink mb-2">Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            <View className="flex-row space-x-2">
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.7}
                  className={`px-4 py-2 rounded-full ${
                    category === cat ? 'bg-primary' : 'bg-surface'
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      category === cat ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Text className="text-sm font-medium text-ink mb-2">Visibility</Text>
          <View className="flex-row bg-surface rounded-full p-1 mb-6">
            {(['Private', 'Shared'] as const).map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => setIsShared(opt === 'Shared')}
                activeOpacity={0.7}
                className={`flex-1 py-2.5 rounded-full ${
                  (opt === 'Shared' && isShared) || (opt === 'Private' && !isShared)
                    ? 'bg-primary'
                    : ''
                }`}
              >
                <Text
                  className={`text-center text-sm font-semibold ${
                    (opt === 'Shared' && isShared) || (opt === 'Private' && !isShared)
                      ? 'text-white'
                      : 'text-ink'
                  }`}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <AppButton title="Save Dua" onPress={handleSave} />
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default AddDuaScreen;
