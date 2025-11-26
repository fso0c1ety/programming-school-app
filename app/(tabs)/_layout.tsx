import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { COLORS } from '../../constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View style={[styles.wrapper]}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.bar]}
            >
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                const onLongPress = () => {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  });
                };

                // Icon mapping
                const renderIcon = () => {
                  switch (route.name) {
                    case 'home':
                      return (
                        <Ionicons name={isFocused ? 'home' : 'home-outline'} size={18} color={isFocused ? COLORS.primary : 'white'} />
                      );
                    case 'courses':
                      return (
                        <Ionicons name={isFocused ? 'book' : 'book-outline'} size={18} color={isFocused ? COLORS.primary : 'white'} />
                      );
                    case 'my-courses':
                      return (
                        <MaterialCommunityIcons name={isFocused ? 'school' : 'school-outline'} size={20} color={isFocused ? COLORS.primary : 'white'} />
                      );
                    case 'profile':
                      return (
                        <Ionicons name={isFocused ? 'person' : 'person-outline'} size={18} color={isFocused ? COLORS.primary : 'white'} />
                      );
                    default:
                      return null;
                  }
                };

                return (
                  <TouchableOpacity
                    key={route.key}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={styles.item}
                    activeOpacity={0.85}
                  >
                    {isFocused ? (
                      <View style={styles.pill}>
                        <View style={styles.iconLabel}>
                          <View style={styles.iconHolder}>{renderIcon()}</View>
                          <Text style={styles.label}>{String(label)}</Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.iconOnly}>{renderIcon()}</View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </LinearGradient>
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="my-courses"
        options={{
          title: 'My Learning',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  bar: {
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...{
      shadowColor: COLORS.primary,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  pill: {
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconHolder: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  iconOnly: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
