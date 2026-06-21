import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Colors } from '@/constants/theme';

type Theme = typeof Colors.light | typeof Colors.dark;

const MEMBERS = [
  {
    id: 'me',
    name: 'You',
    role: 'Admin',
    initials: 'ME',
  },
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    avatar: 'https://i.pravatar.cc/100?img=11',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.j@mail.com',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: '3',
    name: 'Sarah Taylor',
    email: 's.taylor@company.co',
    initials: 'ST',
  },
];

export default function CreateGroup() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();

  const [groupName, setGroupName] = useState('');
  const [budget, setBudget] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Create Group</ThemedText>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cover Photo */}
          <TouchableOpacity style={styles.coverPhotoContainer} activeOpacity={0.7}>
            <View style={styles.addPhotoCircle}>
              <MaterialIcons name="add-photo-alternate" size={24} color={theme.primary} />
            </View>
            <ThemedText style={styles.coverPhotoText}>Add Cover Photo</ThemedText>
          </TouchableOpacity>

          {/* Group Details */}
          <View style={styles.detailsCard}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Group Name</ThemedText>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Summer Roadtrip"
                placeholderTextColor={theme.textMuted}
                value={groupName}
                onChangeText={setGroupName}
              />
            </View>

            <View style={[styles.inputGroup, styles.inputGroupLast]}>
              <ThemedText style={styles.label}>
                Monthly Budget <ThemedText style={styles.labelOptional}>(Optional)</ThemedText>
              </ThemedText>
              <View style={styles.currencyInputContainer}>
                <ThemedText style={styles.currencySymbol}>$</ThemedText>
                <TextInput
                  style={[styles.textInput, styles.currencyInput]}
                  placeholder="0.00"
                  placeholderTextColor={theme.textMuted}
                  value={budget}
                  onChangeText={setBudget}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </View>

          {/* Invite Members */}
          <View style={styles.inviteSection}>
            <ThemedText style={styles.sectionTitle}>Invite Members</ThemedText>

            <View style={styles.searchBar}>
              <MaterialIcons name="search" size={24} color={theme.outline} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search name, email, or phone"
                placeholderTextColor={theme.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.inviteButton} activeOpacity={0.8}>
                <ThemedText style={styles.inviteButtonText}>Invite</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.suggestedContainer}>
              <ThemedText style={styles.suggestedHeader}>MEMBERS</ThemedText>

              {MEMBERS.map((member) => {
                const isAdmin = member.id === 'me';
                return (
                  <View
                    key={member.id}
                    style={[styles.memberCard, isAdmin && styles.memberCardAdmin]}
                  >
                    <View style={styles.memberInfo}>
                      {member.avatar ? (
                        <Image source={{ uri: member.avatar }} style={styles.avatar} />
                      ) : (
                        <View
                          style={
                            isAdmin
                              ? styles.avatarInitialsAdminContainer
                              : styles.avatarInitialsContainer
                          }
                        >
                          <ThemedText
                            style={
                              isAdmin ? styles.avatarInitialsAdminText : styles.avatarInitialsText
                            }
                          >
                            {member.initials}
                          </ThemedText>
                        </View>
                      )}
                      <View>
                        <ThemedText style={styles.memberName}>{member.name}</ThemedText>
                        <ThemedText style={styles.memberEmail}>
                          {isAdmin ? member.role : member.email}
                        </ThemedText>
                      </View>
                    </View>
                    {!isAdmin && (
                      <TouchableOpacity style={styles.removeButton} activeOpacity={0.7}>
                        <MaterialIcons name="remove-circle-outline" size={24} color={theme.error} />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.createButton} activeOpacity={0.8}>
            <ThemedText style={styles.createButtonText}>Create Group</ThemedText>
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
    keyboardAvoidingView: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      backgroundColor: theme.background,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
    },
    headerSpacer: {
      width: 40,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 120,
      gap: 24,
    },
    coverPhotoContainer: {
      marginTop: 8,
      width: '100%',
      aspectRatio: 21 / 9,
      borderRadius: 16,
      backgroundColor: theme.surfaceContainerHigh,
      borderWidth: 1,
      borderColor: theme.outlineVariant,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    addPhotoCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    coverPhotoText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    detailsCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 20,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.02,
      shadowRadius: 20,
      elevation: 2,
    },
    inputGroup: {
      marginBottom: 24,
    },
    inputGroupLast: {
      marginBottom: 0,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
      marginBottom: 8,
    },
    labelOptional: {
      fontSize: 14,
      fontWeight: '400',
      color: theme.outline,
    },
    textInput: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
      borderBottomWidth: 1,
      borderBottomColor: theme.outlineVariant,
      paddingVertical: 8,
      paddingHorizontal: 0,
    },
    currencyInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.outlineVariant,
    },
    currencySymbol: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.textSecondary,
      marginRight: 8,
    },
    currencyInput: {
      flex: 1,
      borderBottomWidth: 0,
    },
    inviteSection: {
      gap: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 999,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: theme.surfaceContainerHighest,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.03,
      shadowRadius: 16,
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      marginLeft: 12,
      marginRight: 12,
    },
    inviteButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 999,
    },
    inviteButtonText: {
      color: theme.onPrimary,
      fontSize: 12,
      fontWeight: '500',
    },
    suggestedContainer: {
      marginTop: 8,
    },
    suggestedHeader: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.textSecondary,
      letterSpacing: 0.5,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    memberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: theme.surface,
      borderRadius: 16,
      marginBottom: 8,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.01,
      shadowRadius: 8,
      elevation: 1,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    memberInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.surfaceContainerHigh,
    },
    avatarInitialsContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.secondaryContainer,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarInitialsText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.onSecondaryContainer,
    },
    memberName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    memberEmail: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    memberCardAdmin: {
      borderColor: theme.surfaceContainerHigh,
    },
    avatarInitialsAdminContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.primaryContainer,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarInitialsAdminText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.onPrimaryContainer,
    },
    removeButton: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 24,
      paddingTop: 16,
      backgroundColor: theme.background,
    },
    createButton: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
    createButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.onPrimary,
    },
  });
