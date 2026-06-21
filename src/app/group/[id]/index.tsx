import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Colors } from '@/constants/theme';

type Theme = typeof Colors.light | typeof Colors.dark;

const MOCK_EXPENSES = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 120.50,
    payer: 'Alex Chen',
    category: 'Food',
    date: 'Today, 2:45 PM',
    icon: 'shopping-cart',
  },
  {
    id: '2',
    title: 'Gas Refill',
    amount: 45.00,
    payer: 'You',
    category: 'Transport',
    date: 'Yesterday',
    icon: 'local-gas-station',
  },
  {
    id: '3',
    title: 'Dinner at Olive Garden',
    amount: 85.20,
    payer: 'Marcus Johnson',
    category: 'Dining',
    date: 'May 3',
    icon: 'restaurant',
  },
];

const MEMBERS = [
  { id: 'me', name: 'You', avatar: 'https://i.pravatar.cc/100?img=10' },
  { id: '1', name: 'Alex Chen', avatar: 'https://i.pravatar.cc/100?img=11' },
  { id: '2', name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/100?img=12' },
  { id: '3', name: 'Sarah Taylor', avatar: 'https://i.pravatar.cc/100?img=13' },
];

export default function GroupDetail() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();

  const totalSpent = 1850.00;
  const budget = 2000.00;
  const remaining = budget - totalSpent;
  const progress = Math.min((totalSpent / budget) * 100, 100);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Home Expenses</ThemedText>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="settings" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View>
              <ThemedText style={styles.heroLabel}>You are owed</ThemedText>
              <ThemedText style={styles.heroAmount}>₹450.00</ThemedText>
            </View>
            <View style={styles.heroIconContainer}>
              <MaterialIcons name="account-balance-wallet" size={32} color={theme.onPrimary} />
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.onPrimary }]}
              onPress={() => router.push(`/group/${id}/add-expense`)}
            >
              <MaterialIcons name="add" size={20} color={theme.primary} />
              <ThemedText style={[styles.actionButtonText, { color: theme.primary }]}>Add Expense</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <MaterialIcons name="payments" size={20} color={theme.onPrimary} />
              <ThemedText style={styles.actionButtonText}>Settle Up</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats / Budget Preview */}
        <TouchableOpacity 
          style={styles.statsCard} 
          onPress={() => router.push(`/group/${id}/budget`)}
          activeOpacity={0.7}
        >
          <View style={styles.statsHeader}>
            <View style={styles.statsIconBox}>
              <MaterialIcons name="pie-chart" size={20} color={theme.secondary} />
            </View>
            <View style={styles.statsInfo}>
              <ThemedText style={styles.statsTitle}>Monthly Budget</ThemedText>
              <ThemedText style={styles.statsSubtitle}>₹{totalSpent.toLocaleString()} of ₹{budget.toLocaleString()}</ThemedText>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={theme.outline} />
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <ThemedText style={styles.progressLabel}>{Math.round(progress)}% spent</ThemedText>
          </View>
        </TouchableOpacity>

        {/* Members Preview */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Members</ThemedText>
          <TouchableOpacity onPress={() => router.push(`/group/${id}/members`)}>
            <ThemedText style={styles.seeAll}>Manage</ThemedText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.membersRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.membersScroll}>
            {MEMBERS.map((member) => (
              <View key={member.id} style={styles.memberItem}>
                <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
                <ThemedText style={styles.memberName} numberOfLines={1}>{member.name.split(' ')[0]}</ThemedText>
              </View>
            ))}
            <TouchableOpacity style={styles.addMemberButton} onPress={() => router.push(`/group/${id}/members`)}>
              <MaterialIcons name="person-add" size={24} color={theme.primary} />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recent Expenses */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Recent Expenses</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.seeAll}>See All</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.expensesList}>
          {MOCK_EXPENSES.map((expense) => (
            <TouchableOpacity key={expense.id} style={styles.expenseCard}>
              <View style={styles.expenseIconContainer}>
                <MaterialIcons name={expense.icon as any} size={24} color={theme.primary} />
              </View>
              <View style={styles.expenseInfo}>
                <ThemedText style={styles.expenseTitle}>{expense.title}</ThemedText>
                <ThemedText style={styles.expenseMeta}>
                  Paid by <ThemedText style={styles.expensePayer}>{expense.payer}</ThemedText> • {expense.date}
                </ThemedText>
              </View>
              <View style={styles.expenseAmountContainer}>
                <ThemedText style={styles.expenseAmount}>₹{expense.amount.toFixed(2)}</ThemedText>
                <ThemedText style={styles.expenseCategory}>{expense.category}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
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
    scrollContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    heroCard: {
      backgroundColor: theme.primary,
      borderRadius: 24,
      padding: 24,
      marginBottom: 24,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 8,
    },
    heroHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    heroLabel: {
      color: theme.primaryLight,
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 4,
    },
    heroAmount: {
      color: theme.onPrimary,
      fontSize: 32,
      fontWeight: '700',
    },
    heroIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: 'rgba(255,255,255,0.15)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionRow: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 12,
      gap: 8,
    },
    actionButtonText: {
      color: theme.onPrimary,
      fontSize: 14,
      fontWeight: '600',
    },
    statsCard: {
      backgroundColor: theme.backgroundCard,
      borderRadius: 20,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHighest,
    },
    statsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    statsIconBox: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: theme.secondaryContainer,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    statsInfo: {
      flex: 1,
    },
    statsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    statsSubtitle: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    progressContainer: {
      gap: 8,
    },
    progressBarBg: {
      height: 8,
      backgroundColor: theme.surfaceContainerHighest,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.secondary,
      borderRadius: 4,
    },
    progressLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.textSecondary,
      textAlign: 'right',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
    },
    seeAll: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.secondary,
    },
    membersRow: {
      marginBottom: 24,
    },
    membersScroll: {
      gap: 16,
      paddingRight: 16,
    },
    memberItem: {
      alignItems: 'center',
      gap: 8,
      width: 60,
    },
    memberAvatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.surfaceContainer,
    },
    memberName: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.textSecondary,
    },
    addMemberButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.surfaceContainer,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.outlineVariant,
      borderStyle: 'dashed',
    },
    expensesList: {
      gap: 12,
    },
    expenseCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundCard,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
    },
    expenseIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: theme.surfaceContainer,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    expenseInfo: {
      flex: 1,
      gap: 2,
    },
    expenseTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    expenseMeta: {
      fontSize: 12,
      color: theme.textMuted,
    },
    expensePayer: {
      fontWeight: '600',
      color: theme.textSecondary,
    },
    expenseAmountContainer: {
      alignItems: 'flex-end',
      gap: 2,
    },
    expenseAmount: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
    },
    expenseCategory: {
      fontSize: 10,
      fontWeight: '600',
      color: theme.onSecondaryContainer,
      backgroundColor: theme.secondaryContainer,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      overflow: 'hidden',
    },
  });
