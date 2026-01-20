import type { RootScreenProps } from '@/navigation/types';
import { ActivityIndicator, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import { useAuthStore } from '@/auth/authStore';
import { useEffect, useRef } from 'react';

function Startup({ }: RootScreenProps<Paths.Startup>) {
  const { gutters, layout } = useTheme();
  const restore = useAuthStore((s) => s.restore)
  
  const hasRestored = useRef(false)

  useEffect(() => {
    if (hasRestored.current) return
    hasRestored.current = true
    restore()
  }, [restore])

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <AssetByVariant
          path="splashLogo"
          resizeMode="contain"
          style={{ height: 300, width: 300 }}
        />
      </View>
    </SafeScreen>
  );
}

export default Startup;
