import { AssetByVariant } from "@/components/atoms";
import { SafeScreen } from "@/components/templates";
import { useTheme } from "@/theme";
import { useTranslation } from "react-i18next";
import { Text, TextInput, View } from "react-native";
// import { useTranslation } from "react-i18next";

function Auth() {
    const { t } = useTranslation();

      const {
    backgrounds,
    changeTheme,
    colors,
    components,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  return (
    <SafeScreen style={[layout.justifyStart, layout.itemsCenter]}>
        <View style={[
          layout.justifyCenter,
          layout.itemsCenter,
          layout.col,
          layout.fullWidth,
        ]}>
            <AssetByVariant
              path="logoIcon"
              resizeMode="contain"
              style={[gutters.marginTop_70, { height: 138, width:128 }]}
            />
            <Text style={[fonts.size_42, fonts.primary, fonts.bold]}>
              {t('common_appName.uppercase')}
            </Text>
            <Text style={[gutters.marginTop_70, fonts.size_24, fonts.bold, fonts.primaryText]}>
              {t('screen_auth.welcome')}
            </Text>
            <Text style={[fonts.size_14, fonts.secondaryText]}>
              {t('screen_auth.prompt')}
            </Text>
            <View style={[layout.fullWidth, gutters.paddingRight_24, gutters.paddingLeft_24]}>
            <TextInput style={[gutters.marginTop_24, components.authInput]} placeholder="email@example.com" placeholderTextColor={colors.mutedText}/>
            </View>
        </View>
        
    </SafeScreen>
  )
    
}

export default Auth