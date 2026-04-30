import { Colors } from '@/constants/theme';
import { supabase } from '@/utils/supabase';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { z } from 'zod';
import { ThemedText } from './themed-text';
import { Input } from './ui/Input';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupProps {
  onSwitchToLogin: () => void;
}

export const Signup = ({ onSwitchToLogin }: SignupProps) => {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Step 1: Create the auth user
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.name,
          },
        },
      });

      if (error) {
        console.error('Signup auth error:', error);
        Alert.alert('Signup Error', error.message);
        return;
      }

      if (!authData.user) {
        Alert.alert('Signup Error', 'Something went wrong. Please try again.');
        return;
      }

      // Step 2: If we have a session (auto-confirmed or email confirm disabled),
      // upsert the profile. Otherwise the user must verify their email first.
      if (authData.session) {
        const { error: profileError } = await supabase.from('profiles').upsert(
          {
            id: authData.user.id,
            email: data.email,
            display_name: data.name,
          },
          { onConflict: 'id' },
        );

        if (profileError) {
          // Log but don't block — a DB trigger may have already created the profile
          console.warn('Profile upsert warning:', profileError.message);
        } else {
          Alert.alert('Profile created successfully', 'You can login now!', [
            { text: 'OK', onPress: onSwitchToLogin },
          ]);
        }

        // Auth state change listener in AuthProvider will handle navigation
      } else {
        Alert.alert(
          'Verify Your Email',
          'We sent a confirmation link to your email. Please verify to continue.',
        );
      }
    } catch (error: any) {
      console.error('Signup unexpected error:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '1A' }]}>
            <AntDesign name="user-add" size={40} color={colors.primary} />
          </View>
          <ThemedText style={styles.title}>Create Account</ThemedText>
          <ThemedText style={styles.subtitle}>Sign up to start tracking expenses</ThemedText>
        </View>

        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Full Name"
                placeholder="Enter your name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                error={errors.name?.message}
                leftIcon={<Feather name="user" size={20} color={colors.textSecondary} />}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                error={errors.email?.message}
                leftIcon={<Feather name="mail" size={20} color={colors.textSecondary} />}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Create a password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                error={errors.password?.message}
                leftIcon={<Feather name="lock" size={20} color={colors.textSecondary} />}
              />
            )}
          />

          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: colors.primary, shadowColor: colors.primary },
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.primaryButtonText}>Sign Up</ThemedText>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchButton} onPress={onSwitchToLogin}>
            <ThemedText style={styles.switchText}>
              Already have an account?{' '}
              <ThemedText style={[styles.switchLink, { color: colors.primary }]}>
                Sign In
              </ThemedText>
            </ThemedText>
          </TouchableOpacity>

          {/* <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <ThemedText style={styles.dividerText}>or continue with</ThemedText>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          <TouchableOpacity
            style={[
              styles.googleButton,
              { backgroundColor: colors.backgroundSelected, borderColor: colors.border },
            ]}
            onPress={onGoogleSignIn}
          >
            <AntDesign name="google" size={20} color={colors.iconDefault} />
            <ThemedText style={styles.googleButtonText}>Sign Up with Google</ThemedText>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
  },
  formContainer: {
    width: '100%',
    gap: 20,
  },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  switchButton: {
    alignItems: 'center',
    marginTop: 4,
  },
  switchText: {
    fontSize: 14,
    opacity: 0.8,
  },
  switchLink: {
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    opacity: 0.5,
  },
  googleButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
