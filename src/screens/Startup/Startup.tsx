import type { RootScreenProps } from '@/navigation/types';
import { View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

function Startup({}: RootScreenProps<Paths.Startup>) {
  const { layout } = useTheme();

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
