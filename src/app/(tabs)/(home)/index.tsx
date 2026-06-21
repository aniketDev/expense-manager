import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Colors } from '@/constants/theme';

type Theme = typeof Colors.light | typeof Colors.dark;

const MOCK_GROUPS = [
  {
    id: '1',
    name: 'Home Expenses',
    users: [
      'https://i.pravatar.cc/100?img=1',
      'https://i.pravatar.cc/100?img=2',
      'https://i.pravatar.cc/100?img=3',
    ],
    spent: 1850.0,
    budget: 2000.0,
    icon: 'home' as const,
  },
  {
    id: '2',
    name: 'Trip to Bali',
    users: ['https://i.pravatar.cc/100?img=4', 'https://i.pravatar.cc/100?img=5'],
    spent: 3200.0,
    budget: 5000.0,
    icon: 'flight' as const,
  },
  {
    id: '3',
    name: 'Shared Apartment',
    users: [
      'https://i.pravatar.cc/100?img=6',
      'https://i.pravatar.cc/100?img=7',
      'https://i.pravatar.cc/100?img=8',
      'https://i.pravatar.cc/100?img=9',
    ],
    spent: 450.0,
    budget: 1000.0,
    icon: 'apartment' as const,
  },
];

export default function Dashboard() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();

  const budgetTotal = 5000;
  const budgetSpent = 3240.5;
  const budgetPercentage = Math.min((budgetSpent / budgetTotal) * 100, 100);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Financier</ThemedText>
          <TouchableOpacity style={styles.profileButton}>
            <MaterialIcons name="person" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <ThemedText style={styles.balanceLabel}>Total Balance</ThemedText>
          <ThemedText style={styles.balanceAmount} adjustsFontSizeToFit numberOfLines={1}>
            ₹24,580.00
          </ThemedText>

          <View style={styles.spendingContainer}>
            <View style={styles.spendingHeader}>
              <ThemedText style={styles.spendingLabel}>Monthly Budget</ThemedText>
              <ThemedText style={styles.spendingAmount}>₹3,240.50 / ₹5,000</ThemedText>
            </View>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${budgetPercentage}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.groupsHeader}>
          <ThemedText style={styles.groupsTitle}>My Groups</ThemedText>
        </View>

        {MOCK_GROUPS.map((group) => {
          const groupPercentage = Math.min((group.spent / group.budget) * 100, 100);
          return (
            <TouchableOpacity 
              key={group.id} 
              style={styles.groupCard}
              onPress={() => router.push(`/group/${group.id}`)}
            >
              <View style={styles.groupCardHeader}>
                <View style={styles.groupIconContainer}>
                  <MaterialIcons name={group.icon} size={24} color={theme.iconAccent} />
                </View>
                <View style={styles.groupInfo}>
                  <ThemedText style={styles.groupName}>{group.name}</ThemedText>
                  <View style={styles.avatarStack}>
                    {group.users.slice(0, 3).map((uri, index) => (
                      <Image
                        key={index}
                        source={{ uri }}
                        style={[styles.avatar, { marginLeft: index > 0 ? -10 : 0 }]}
                      />
                    ))}
                    {group.users.length > 3 && (
                      <View style={[styles.avatarMore, { marginLeft: -10 }]}>
                        <ThemedText style={styles.avatarMoreText}>
                          +{group.users.length - 3}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.groupAmountContainer}>
                  <ThemedText style={styles.groupAmount}>
                    ₹
                    {group.spent.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.groupProgressContainer}>
                <View style={styles.groupProgressHeader}>
                  <ThemedText style={styles.groupProgressText}>
                    Budget: ₹{group.budget.toLocaleString()}
                  </ThemedText>
                  <ThemedText style={styles.groupProgressText}>
                    {Math.round(groupPercentage)}%
                  </ThemedText>
                </View>
                <View style={styles.groupProgressBarBg}>
                  <View style={[styles.groupProgressBarFill, { width: `${groupPercentage}%` }]} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => router.push('/create-group')}>
        <MaterialIcons name="add" size={28} color={theme.onPrimary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      padding: 24,
      paddingBottom: 48,
      gap: 24,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 24,
      color: theme.text,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    profileButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.backgroundCard,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 2,
    },
    balanceCard: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      padding: 24,
      gap: 8,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 6,
    },
    balanceLabel: {
      color: theme.primaryLight,
      fontSize: 14,
      fontWeight: '500',
    },
    balanceAmount: {
      color: theme.onPrimary,
      fontSize: 36,
      lineHeight: 44,
      fontWeight: '700',
      letterSpacing: -1,
      marginBottom: 8,
    },
    spendingContainer: {
      backgroundColor: theme.cardOverlay,
      padding: 16,
      borderRadius: 12,
      marginTop: 8,
      gap: 12,
    },
    spendingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    spendingLabel: {
      color: theme.inverseOnSurface,
      fontSize: 14,
      opacity: 0.9,
    },
    spendingAmount: {
      color: theme.textInverse,
      fontSize: 14,
      fontWeight: '600',
    },
    progressBarBackground: {
      height: 6,
      backgroundColor: theme.progressBackground,
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.progressFill,
      borderRadius: 3,
    },
    groupsHeader: {
      marginTop: 8,
      marginBottom: 8,
    },
    groupsTitle: {
      fontSize: 20,
      color: theme.text,
      fontWeight: '600',
      letterSpacing: -0.5,
    },
    groupCard: {
      backgroundColor: theme.backgroundCard,
      borderRadius: 16,
      padding: 20,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 12,
      elevation: 2,
      marginBottom: 16,
      gap: 16,
    },
    groupCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    groupIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.backgroundElement,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    groupInfo: {
      flex: 1,
      gap: 8,
    },
    groupName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    avatarStack: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.backgroundCard,
      backgroundColor: theme.backgroundElement,
    },
    avatarMore: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.backgroundCard,
      backgroundColor: theme.backgroundElement,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarMoreText: {
      fontSize: 10,
      fontWeight: '600',
      color: theme.text,
    },
    groupAmountContainer: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    groupAmount: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    groupProgressContainer: {
      gap: 8,
    },
    groupProgressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    groupProgressText: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    groupProgressBarBg: {
      height: 6,
      backgroundColor: theme.progressBackgroundGroup,
      borderRadius: 3,
      overflow: 'hidden',
    },
    groupProgressBarFill: {
      height: '100%',
      backgroundColor: theme.progressFillGroup,
      borderRadius: 3,
    },
    fab: {
      position: 'absolute',
      bottom: 100,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
  });
