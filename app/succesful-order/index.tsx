import { BigBtn } from "@/components/Buttons";
import useRemoveNavHeader from "@/hooks/useRemoveNavHeader";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
    useRemoveNavHeader();

    const router = useRouter();

    return (
        <View className="w-full h-full flex flex-col justify-center items-center">
            <Text className="font-jo-md text-2xl text-center">Thanks for ordering!</Text>
            <Text className="mt-8 mb-4 font-jo-li w-72 text-center">Your order has been placed successfully. You will receive a confirmation email shortly.</Text>  
            <View className="flex justify-center">
                <BigBtn handleClick={() => router.replace('/')} customStyles="mt-5">To Home Page</BigBtn> 
            </View>
        </View>
    );
}
