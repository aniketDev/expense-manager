import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Colors } from '@/constants/theme';

type Theme = typeof Colors.light | typeof Colors.dark;

const INITIAL_MEMBERS = [
  { id: 'me', name: 'You', email: 'you@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/100?img=10' },
  { id: '1', name: 'Alex Chen', email: 'alex.chen@gmail.com', role: 'Member', avatar: 'https://i.pravatar.cc/100?img=11' },
  { id: '2', name: 'Marcus Johnson', email: 'marcus.j@outlook.com', role: 'Member', avatar: 'https://i.pravatar.cc/100?img=12' },
  { id: '3', name: 'Sarah Taylor', email: 'sarah.t@work.co', role: 'Member', avatar: 'https://i.pravatar.cc/100?img=13' },
];

export default function ManageMembers() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Members</ThemedText>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="person-add" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color={theme.outline} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or email"
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Group Members</ThemedText>
          <ThemedText style={styles.memberCount}>{INITIAL_MEMBERS.length} Total</ThemedText>
        </View>

        <View style={styles.memberList}>
          {INITIAL_MEMBERS.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
              <View style={styles.memberInfo}>
                <View style={styles.memberNameRow}>
                  <ThemedText style={styles.memberName}>{member.name}</ThemedText>
                  {member.role === 'Admin' && (
                    <View style={styles.adminBadge}>
                      <ThemedText style={styles.adminText}>Admin</ThemedText>
                    </View>
                  )}
                </View>
                <ThemedText style={styles.memberEmail}>{member.email}</ThemedText>
              </View>
              {member.id !== 'me' && (
                <TouchableOpacity style={styles.moreButton}>
                  <MaterialIcons name="more-vert" size={24} color={theme.outline} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.inviteCard}>
          <View style={styles.inviteIconBox}>
            <MaterialIcons name="mail-outline" size={32} color={theme.primary} />
          </View>
          <View style={styles.inviteTextContent}>
            <ThemedText style={styles.inviteTitle}>Invite with Link</ThemedText>
            <ThemedText style={styles.inviteDescription}>Anyone with this link can join the group.</ThemedText>
          </View>
          <TouchableOpacity style={styles.copyButton}>
            <ThemedText style={styles.copyButtonText}>Copy Link</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <ThemedText style={styles.addButtonText}>Invite New Members</ThemedText>
        </TouchableOpacity>
      </View>
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
    searchContainer: {
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundCard,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
    },
    searchInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: theme.text,
    },
    scrollContainer: {
      padding: 20,
      paddingBottom: 100,
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
    memberCount: {
      fontSize: 14,
      color: theme.textMuted,
      fontWeight: '500',
    },
    memberList: {
      gap: 12,
      marginBottom: 32,
    },
    memberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundCard,
      borderRadius: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
    },
    memberAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 16,
    },
    memberInfo: {
      flex: 1,
    },
    memberNameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 2,
    },
    memberName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    adminBadge: {
      backgroundColor: theme.primaryContainer,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
    },
    adminText: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.onPrimaryContainer,
    },
    memberEmail: {
      fontSize: 13,
      color: theme.textMuted,
    },
    moreButton: {
      padding: 4,
    },
    inviteCard: {
      backgroundColor: theme.surfaceContainer,
      borderRadius: 20,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.outlineVariant,
      borderStyle: 'dashed',
    },
    inviteIconBox: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: theme.backgroundCard,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    inviteTextContent: {
      flex: 1,
      gap: 4,
    },
    inviteTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
    },
    inviteDescription: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    copyButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: theme.primary,
      borderRadius: 8,
    },
    copyButtonText: {
      color: theme.onPrimary,
      fontSize: 12,
      fontWeight: '600',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      backgroundColor: theme.background,
    },
    addButton: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    addButtonText: {
      color: theme.onPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
  });
