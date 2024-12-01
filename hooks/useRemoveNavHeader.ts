import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function useRemoveNavHeader() {
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
}
