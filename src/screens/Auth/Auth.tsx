import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import { Trans, useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks';
import { AuthScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

type Props = AuthScreenProps<typeof Paths.Auth>;

function Auth({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, components, fonts, gutters, layout } = useTheme();

  const [email, setEmail] = useState('');

  const { authenticate, isLoading } = useAuth({ email, navigation });

  const isButtonDisabled = !email || isLoading;

  return (
    <SafeScreen style={[layout.justifyStart, layout.itemsCenter]}>
      <View
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          layout.col,
          layout.fullWidth,
        ]}
      >
        <AssetByVariant
          path="logoIcon"
          resizeMode="contain"
          style={[gutters.marginTop_70, { height: 138, width: 128 }]}
        />

        <Text style={[fonts.size_42, fonts.primary, fonts.bold]}>
          {t('common_appName.uppercase')}
        </Text>

        <Text
          style={[
            gutters.marginTop_70,
            fonts.size_24,
            fonts.bold,
            fonts.primaryText,
          ]}
        >
          {t('screen_auth.welcome')}
        </Text>

        <Text style={[fonts.size_14, fonts.secondaryText]}>
          {t('screen_auth.prompt')}
        </Text>

        <View
          style={[
            layout.fullWidth,
            gutters.paddingRight_24,
            gutters.paddingLeft_24,
          ]}
        >
          <TextInput
            style={[gutters.marginTop_24, components.authInput]}
            placeholder="email@example.com"
            placeholderTextColor={colors.mutedText}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            autoCorrect={false}
            autoComplete={'email'}
            onChangeText={setEmail}
            editable={!isLoading}
          />

          <TouchableOpacity
            onPress={authenticate}
            style={[
              components.primaryButton,
              gutters.marginTop_16,
              layout.itemsCenter,
              layout.justifyCenter,
              isButtonDisabled && { opacity: 0.6 },
            ]}
            disabled={isButtonDisabled}
            testID="auth-button"
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={[fonts.size_16, fonts.white]}>
                {t('screen_auth.button')}
              </Text>
            )}
          </TouchableOpacity>

          <Text
            style={[
              fonts.secondaryText,
              fonts.size_12,
              fonts.alignCenter,
              gutters.marginTop_24,
            ]}
          >
            <Trans
              i18nKey="screen_auth.agreement"
              components={{
                terms: (
                  <Text
                    style={[fonts.primary, fonts.size_12]}
                    onPress={() => Linking.openURL('https://google.com')}
                  />
                ),
                privacy: (
                  <Text
                    style={[fonts.primary, fonts.size_12]}
                    onPress={() => Linking.openURL('https://yahoo.com')}
                  />
                ),
              }}
            />
          </Text>
        </View>
      </View>
    </SafeScreen>
  );
}

export default Auth;
