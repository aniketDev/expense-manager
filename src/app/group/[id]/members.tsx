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
  {
    id: 'me',
    name: 'You',
    email: 'you@example.com',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/100?img=10',
  },
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex.chen@gmail.com',
    role: 'Member',
    avatar: 'https://i.pravatar.cc/100?img=11',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.j@outlook.com',
    role: 'Member',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: '3',
    name: 'Sarah Taylor',
    email: 'sarah.t@work.co',
    role: 'Member',
    avatar: 'https://i.pravatar.cc/100?img=13',
  },
];

export default function ManageMembers() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();

  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [emailInput, setEmailInput] = useState('');

  const canAdd = emailInput.trim().length > 0;

  function handleAddMember() {
    const email = emailInput.trim();
    if (!email) return;
    // TODO: invite via API
    setEmailInput('');
  }

  function handleRemoveMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Members</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.addContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.emailInput}
            placeholder="Add member by email"
            placeholderTextColor={theme.textMuted}
            value={emailInput}
            onChangeText={setEmailInput}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="send"
            onSubmitEditing={handleAddMember}
          />
          <TouchableOpacity
            style={[styles.addIconButton, canAdd && styles.addIconButtonActive]}
            onPress={handleAddMember}
            disabled={!canAdd}
          >
            <MaterialIcons
              name="person-add"
              size={20}
              color={canAdd ? theme.onPrimary : theme.outline}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Group Members</ThemedText>
          <ThemedText style={styles.memberCount}>{members.length} Total</ThemedText>
        </View>

        <View style={styles.memberList}>
          {members.map((member) => (
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
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveMember(member.id)}
                >
                  <MaterialIcons name="person-remove" size={18} color={theme.error} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.inviteCard}>
          <View style={styles.inviteIconBox}>
            <MaterialIcons name="mail-outline" size={28} color={theme.primary} />
          </View>
          <View style={styles.inviteTextContent}>
            <ThemedText style={styles.inviteTitle}>Invite with Link</ThemedText>
            <ThemedText style={styles.inviteDescription}>
              Anyone with this link can join the group.
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.copyButton}>
            <ThemedText style={styles.copyButtonText}>Copy</ThemedText>
          </TouchableOpacity>
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
    headerSpacer: {
      width: 40,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
    },
    addContainer: {
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundCard,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
      paddingLeft: 16,
      paddingRight: 6,
      paddingVertical: 6,
      gap: 8,
    },
    emailInput: {
      flex: 1,
      fontSize: 15,
      color: theme.text,
      paddingVertical: 8,
    },
    addIconButton: {
      width: 38,
      height: 38,
      borderRadius: 10,
      backgroundColor: theme.surfaceContainerHigh,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addIconButtonActive: {
      backgroundColor: theme.primary,
    },
    scrollContainer: {
      paddingHorizontal: 20,
      paddingBottom: 32,
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
      gap: 10,
      marginBottom: 28,
    },
    memberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundCard,
      borderRadius: 14,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHigh,
    },
    memberAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      marginRight: 14,
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
      fontSize: 15,
      fontWeight: '600',
      color: theme.text,
    },
    adminBadge: {
      backgroundColor: theme.primaryContainer,
      paddingHorizontal: 7,
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
    deleteButton: {
      padding: 6,
    },
    inviteCard: {
      backgroundColor: theme.surfaceContainer,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.outlineVariant,
      borderStyle: 'dashed',
      gap: 12,
    },
    inviteIconBox: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: theme.backgroundCard,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inviteTextContent: {
      flex: 1,
      gap: 3,
    },
    inviteTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.text,
    },
    inviteDescription: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    copyButton: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      backgroundColor: theme.primary,
      borderRadius: 8,
    },
    copyButtonText: {
      color: theme.onPrimary,
      fontSize: 13,
      fontWeight: '600',
    },
  });
