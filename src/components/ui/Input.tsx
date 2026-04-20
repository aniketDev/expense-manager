import { Colors } from '@/constants/theme';
import React, { forwardRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { ThemedText } from '../themed-text';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    { label, error, containerStyle, leftIcon, rightIcon, style, onFocus, onBlur, ...props },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const currentBorderColor = error ? colors.error : isFocused ? colors.primary : colors.border;

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.backgroundSelected,
              borderColor: currentBorderColor,
            },
          ]}
        >
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              { color: colors.text },
              leftIcon ? { paddingLeft: 12 } : {},
              rightIcon ? { paddingRight: 12 } : {},
              style,
            ]}
            placeholderTextColor={colors.textSecondary}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />
          {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
        </View>
        {error && (
          <ThemedText style={[styles.errorText, { color: colors.error }]}>{error}</ThemedText>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    opacity: 0.9,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20,
    fontSize: 16,
  },
  leftIconContainer: {
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    marginLeft: 4,
    marginTop: 2,
    fontWeight: '500',
  },
});
