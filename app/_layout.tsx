import { SplashScreen, Stack } from "expo-router";

import "../global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { ProfileBoxProvider } from "@/context/ProfileBoxContext";
import { ShopContextProvider } from "@/context/ShopContext";

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Righteous': require('../assets/fonts/Righteous-Regular.ttf'),
    'Josefin-Light': require('../assets/fonts/JosefinSans-Light.ttf'),
    'Josefin-Medium': require('../assets/fonts/JosefinSans-Medium.ttf')
  })

  useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);

    if (!loaded && !error) {
      return null;
  }

  return (
    <ShopContextProvider>
      <ProfileBoxProvider>
        <Stack />
      </ProfileBoxProvider>
    </ShopContextProvider>
  )
}
