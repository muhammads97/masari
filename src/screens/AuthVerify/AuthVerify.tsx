import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import { useAuthResend } from '@/hooks/domain/auth/useAuthResend';
import { useAuthVerify } from '@/hooks/domain/auth/useAuthVerfiy';
import { Paths } from '@/navigation/paths';
import { AuthScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = AuthScreenProps<typeof Paths.AuthVerify>;

function AuthVerify({ navigation, route }: Props) {
  const { t } = useTranslation();
  const email = route.params?.email ?? '';
  const [code, setCode] = useState('');
  const { authenticate, isLoading } = useAuthVerify({ email, code });
  const { resend, isLoading: isResending } = useAuthResend({ email });
  const RESEND_TIMEOUT = 5;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const { colors, components, fonts, gutters, layout } = useTheme();

  useEffect(() => {
    const interval = startTimer();

    return () => clearInterval(interval);
  }, [email]);

  const startTimer = () => {
    setSecondsLeft(RESEND_TIMEOUT);
    setCanResend(false);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return interval;
  };

  const handleResend = () => {
    if (!canResend || isResending) return;

    startTimer();
    resend();
  };

  const handleBackToAuth = () => {
    navigation.goBack();
  };

  const isButtonDisabled = code.length !== 6 || isLoading || isResending;
  return (
    <SafeScreen style={[layout.justifyStart, layout.itemsCenter]}>
      <View
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          layout.col,
          layout.fullWidth,
          gutters.paddingRight_16,
          gutters.paddingLeft_16,
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
            fonts.size_20,
            fonts.medium,
            fonts.accentGreen,
            fonts.alignCenter,
          ]}
        >
          <Trans
            i18nKey="screen_auth_verify.prompt"
            values={{ email }}
            components={{
              email: <Text style={[fonts.mutedText, fonts.size_16]} />,
              br: <Text>{'\n'}</Text>,
            }}
          />
        </Text>

        <TextInput
          style={[
            gutters.marginTop_16,
            components.authInput,
            fonts.alignCenter,
          ]}
          placeholder="123456"
          placeholderTextColor={colors.mutedText}
          autoCapitalize="none"
          keyboardType="decimal-pad"
          maxLength={6}
          autoCorrect={false}
          autoComplete="one-time-code"
          value={code}
          onChangeText={setCode}
          editable={!isLoading}
        />
        <TouchableOpacity
          onPress={() => authenticate()}
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
              {t('screen_auth_verify.button')}
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
            i18nKey={
              canResend
                ? 'screen_auth_verify.resend_text'
                : 'screen_auth_verify.resend_in_text'
            }
            values={{ timer: secondsLeft }}
            components={{
              resend: (
                <Text
                  style={[
                    fonts.primary,
                    !canResend || isResending ? fonts.mutedText : fonts.primary,
                  ]}
                  onPress={handleResend}
                />
              ),
              back: <Text style={[fonts.primary]} onPress={handleBackToAuth} />,
              br: <Text>{'\n'}</Text>,
            }}
          />
        </Text>
      </View>
    </SafeScreen>
  );
}

export default AuthVerify;
