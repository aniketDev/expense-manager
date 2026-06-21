import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Colors } from '@/constants/theme';

type Theme = typeof Colors.light | typeof Colors.dark;

const CATEGORIES = [
  { id: '1', name: 'Food', icon: 'restaurant', color: '#FF6B6B' },
  { id: '2', name: 'Transport', icon: 'directions-car', color: '#4DABF7' },
  { id: '3', name: 'Home', icon: 'home', color: '#51CF66' },
  { id: '4', name: 'Shopping', icon: 'shopping-cart', color: '#FAB005' },
  { id: '5', name: 'Fun', icon: 'movie', color: '#BE4BDB' },
];

export default function AddExpense() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <MaterialIcons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Add Expense</ThemedText>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Amount Input */}
          <View style={styles.amountSection}>
            <ThemedText style={styles.amountLabel}>Enter Amount</ThemedText>
            <View style={styles.amountInputRow}>
              <ThemedText style={styles.currencySymbol}>₹</ThemedText>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={theme.textMuted}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                autoFocus
              />
            </View>
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>What was it for?</ThemedText>
            <TextInput
              style={styles.descriptionInput}
              placeholder="e.g., Dinner at Olive Garden"
              placeholderTextColor={theme.textMuted}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Category Selection */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Category</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryItem,
                    selectedCategory === cat.id && { backgroundColor: cat.color },
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <MaterialIcons 
                    name={cat.icon as any} 
                    size={20} 
                    color={selectedCategory === cat.id ? '#fff' : cat.color} 
                  />
                  <ThemedText 
                    style={[
                      styles.categoryText,
                      selectedCategory === cat.id && { color: '#fff' }
                    ]}
                  >
                    {cat.name}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Split Info */}
          <View style={styles.splitCard}>
            <View style={styles.splitRow}>
              <MaterialIcons name="person" size={20} color={theme.primary} />
              <ThemedText style={styles.splitLabel}>Paid by</ThemedText>
              <TouchableOpacity style={styles.selectorButton}>
                <ThemedText style={styles.selectorText}>You</ThemedText>
                <MaterialIcons name="arrow-drop-down" size={20} color={theme.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.splitRow}>
              <MaterialIcons name="groups" size={20} color={theme.primary} />
              <ThemedText style={styles.splitLabel}>Split</ThemedText>
              <TouchableOpacity style={styles.selectorButton}>
                <ThemedText style={styles.selectorText}>Equally</ThemedText>
                <MaterialIcons name="arrow-drop-down" size={20} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Picker (Mock) */}
          <TouchableOpacity style={styles.datePicker}>
            <MaterialIcons name="calendar-today" size={20} color={theme.outline} />
            <ThemedText style={styles.dateText}>Today, May 5, 2026</ThemedText>
          </TouchableOpacity>

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.8} onPress={() => router.back()}>
            <ThemedText style={styles.saveButtonText}>Save Expense</ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboardView: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.surfaceContainer,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
    },
    headerSpacer: {
      width: 40,
    },
    scrollContainer: {
      padding: 24,
      paddingBottom: 100,
    },
    amountSection: {
      alignItems: 'center',
      marginBottom: 32,
    },
    amountLabel: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: '500',
      marginBottom: 12,
    },
    amountInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    currencySymbol: {
      fontSize: 40,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    amountInput: {
      fontSize: 56,
      fontWeight: '700',
      color: theme.text,
      minWidth: 100,
    },
    inputGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
      marginBottom: 12,
    },
    descriptionInput: {
      fontSize: 18,
      fontWeight: '500',
      color: theme.text,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.outlineVariant,
    },
    categoriesRow: {
      gap: 12,
      paddingRight: 16,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 99,
      backgroundColor: theme.backgroundCard,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    splitCard: {
      backgroundColor: theme.backgroundCard,
      borderRadius: 20,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
    },
    splitRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    splitLabel: {
      fontSize: 15,
      fontWeight: '500',
      color: theme.textSecondary,
      marginLeft: 12,
      flex: 1,
    },
    selectorButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surfaceContainer,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      gap: 4,
    },
    selectorText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    divider: {
      height: 1,
      backgroundColor: theme.outlineVariant,
      marginVertical: 4,
    },
    datePicker: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: theme.backgroundCard,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
    },
    dateText: {
      fontSize: 15,
      color: theme.text,
      fontWeight: '500',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 24,
      backgroundColor: theme.background,
    },
    saveButton: {
      backgroundColor: theme.primary,
      paddingVertical: 18,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
    saveButtonText: {
      color: theme.onPrimary,
      fontSize: 18,
      fontWeight: '700',
    },
  });
