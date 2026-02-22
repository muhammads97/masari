import { View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useTheme } from '@/theme';

function Dot({ delay }: { delay: number }) {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [delay, opacity]);

  return (
    <Animated.View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primaryText,
        marginHorizontal: 3,
        opacity,
      }}
    />
  );
}

export default function TypingIndicator() {
  const { gutters, borders, colors } = useTheme();

  return (
    <View
      style={[
        gutters.padding_12,
        borders.rounded_16,
        {
          backgroundColor: colors.background,
          flexDirection: 'row',
          alignSelf: 'flex-start',
        },
      ]}
    >
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </View>
  );
}
