import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Colors } from '@/constants/theme';

type Theme = typeof Colors.light | typeof Colors.dark;

const CATEGORIES = [
  { name: 'Food & Dining', spent: 850.20, budget: 1000, color: '#FF6B6B', icon: 'restaurant' },
  { name: 'Transportation', spent: 320.00, budget: 400, color: '#4DABF7', icon: 'directions-car' },
  { name: 'Entertainment', spent: 450.00, budget: 300, color: '#FAB005', icon: 'movie' },
  { name: 'Utilities', spent: 120.50, budget: 200, color: '#51CF66', icon: 'flash-on' },
  { name: 'Other', spent: 109.30, budget: 100, color: '#BE4BDB', icon: 'more-horiz' },
];

export default function BudgetTracker() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();

  const totalSpent = CATEGORIES.reduce((acc, cat) => acc + cat.spent, 0);
  const totalBudget = CATEGORIES.reduce((acc, cat) => acc + cat.budget, 0);
  const overallProgress = Math.min((totalSpent / totalBudget) * 100, 100);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Budget Tracker</ThemedText>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="edit" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Monthly Summary */}
        <View style={styles.summaryCard}>
          <ThemedText style={styles.summaryLabel}>Total Monthly Spending</ThemedText>
          <View style={styles.summaryAmountRow}>
            <ThemedText style={styles.summaryAmount}>₹{totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</ThemedText>
            <ThemedText style={styles.summaryBudget}>/ ₹{totalBudget.toLocaleString()}</ThemedText>
          </View>
          
          <View style={styles.chartContainer}>
            <View style={styles.chartBg}>
              <View style={[styles.chartFill, { width: `${overallProgress}%`, backgroundColor: overallProgress > 100 ? theme.error : theme.secondary }]} />
            </View>
            <View style={styles.chartLabels}>
              <ThemedText style={styles.chartStatus}>
                {overallProgress > 100 ? 'Over Budget' : 'On Track'}
              </ThemedText>
              <ThemedText style={styles.chartPercent}>{Math.round(overallProgress)}%</ThemedText>
            </View>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Category Breakdown</ThemedText>
        </View>

        <View style={styles.categoryList}>
          {CATEGORIES.map((cat, index) => {
            const catProgress = Math.min((cat.spent / cat.budget) * 100, 100);
            const isOver = cat.spent > cat.budget;
            
            return (
              <View key={index} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryIconBox, { backgroundColor: cat.color + '20' }]}>
                    <MaterialIcons name={cat.icon as any} size={20} color={cat.color} />
                  </View>
                  <View style={styles.categoryInfo}>
                    <ThemedText style={styles.categoryName}>{cat.name}</ThemedText>
                    <ThemedText style={styles.categoryAmount}>
                      ₹{cat.spent.toFixed(2)} <ThemedText style={styles.categoryBudgetLabel}>of ₹{cat.budget}</ThemedText>
                    </ThemedText>
                  </View>
                  {isOver && (
                    <View style={styles.overBadge}>
                      <ThemedText style={styles.overText}>Over</ThemedText>
                    </View>
                  )}
                </View>
                
                <View style={styles.categoryProgressRow}>
                  <View style={styles.catProgressBg}>
                    <View style={[styles.catProgressFill, { width: `${catProgress}%`, backgroundColor: cat.color }]} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.adjustButton} activeOpacity={0.8}>
          <MaterialIcons name="settings-applications" size={20} color={theme.onPrimary} />
          <ThemedText style={styles.adjustButtonText}>Adjust Budgets</ThemedText>
        </TouchableOpacity>
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
    summaryCard: {
      backgroundColor: theme.backgroundCard,
      borderRadius: 24,
      padding: 24,
      marginBottom: 32,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 4,
    },
    summaryLabel: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: '500',
      marginBottom: 8,
    },
    summaryAmountRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: 24,
    },
    summaryAmount: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.text,
    },
    summaryBudget: {
      fontSize: 16,
      color: theme.textMuted,
      marginLeft: 8,
      fontWeight: '500',
    },
    chartContainer: {
      gap: 12,
    },
    chartBg: {
      height: 12,
      backgroundColor: theme.surfaceContainerHighest,
      borderRadius: 6,
      overflow: 'hidden',
    },
    chartFill: {
      height: '100%',
      borderRadius: 6,
    },
    chartLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    chartStatus: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    chartPercent: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.text,
    },
    sectionHeader: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
    },
    categoryList: {
      gap: 16,
      marginBottom: 32,
    },
    categoryCard: {
      backgroundColor: theme.backgroundCard,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
    },
    categoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    categoryIconBox: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    categoryInfo: {
      flex: 1,
    },
    categoryName: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 2,
    },
    categoryAmount: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.textSecondary,
    },
    categoryBudgetLabel: {
      fontWeight: '400',
      color: theme.textMuted,
    },
    overBadge: {
      backgroundColor: theme.errorContainer,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    overText: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.error,
    },
    categoryProgressRow: {
      height: 6,
    },
    catProgressBg: {
      height: 6,
      backgroundColor: theme.surfaceContainerHighest,
      borderRadius: 3,
      overflow: 'hidden',
    },
    catProgressFill: {
      height: '100%',
      borderRadius: 3,
    },
    adjustButton: {
      backgroundColor: theme.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 16,
      gap: 12,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    adjustButtonText: {
      color: theme.onPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
  });
