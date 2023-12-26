import switchTheme from 'react-native-theme-switch-animation';
import { useContext, useState, createContext, useCallback, useMemo } from "react";
import { Button, StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  function changeTheme() {
    switchTheme({
      switchThemeFunction: () => {
        toggleTheme();
      },
      animationConfig: {
        type: 'circular',
        duration: 900,
        startingPoint: {
          cxRatio: 0.5,
          cyRatio: 0.5
        }
      },
    });
  }

  return (
    <View style={[styles.container, isDark && styles.dark]}>
      <Button
        onPress={changeTheme}
        title="Change theme"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDark && styles.dark]}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();
function MainDrawerNavigaror() {
  const { isDark } = useContext(ThemeContext);
  const headerTintColor = isDark ? "white" : 'rgb(0, 122, 255)'
  const backgroundColor = isDark ? "black" : "white"

  return (
    <Drawer.Navigator
      screenOptions={{
        // Try to change "drawerType"
        drawerType: "back",
        headerTintColor,
        headerBackground: () => <View style={{ flex: 1, backgroundColor }} />,
        drawerStyle: { width: "30%", backgroundColor }
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  )
}

const ThemeContext = createContext(null);

export default function App() {
  const [isDark, setDark] = useState(false);

  const toggleTheme = useCallback(() => {
    setDark(prev => !prev);
  }, []);

  const contextValue = useMemo(() => ({
    isDark,
    toggleTheme
  }), [isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <NavigationContainer>
        <MainDrawerNavigaror />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dark: {
    backgroundColor: 'black'
  }
})
