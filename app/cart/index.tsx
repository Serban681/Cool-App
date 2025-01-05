// import { BigBtn } from "@/components/styled-components/Buttons";
// import CartEntryComponent from "@/components/styled-components/CartEntryComponent"
// import { SectionTitle } from "@/components/styled-components/SectionTitle"
// import { ShopContext } from "@/context/ShopContext";
// import { useRouter } from "next/navigation";
// import { useContext } from "react";

import { BigBtn } from "@/components/Buttons";
import CartEntryComponent from "@/components/CartEntryComponent";
import Header from "@/components/Header";
import ProfileBox from "@/components/ProfileBox";
import { SectionTitle } from "@/components/SectionTitle";
import { ShopContext } from "@/context/ShopContext";
import useRemoveNavHeader from "@/hooks/useRemoveNavHeader";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Page() {
    useRemoveNavHeader();

    const { cart, setCart } = useContext(ShopContext)!;
    
    const router = useRouter();

    return (
        <ScrollView>
            <Header />
            <ProfileBox />
            
            <View className="mx-5 mt-5">
                <SectionTitle customStyles="mb-4">My Cart</SectionTitle>

                <View>
                    {cart?.cartEntries.length === 0 && <Text className="font-jo-md text-center">Your cart is empty</Text>}
                </View>

                {cart?.cartEntries.map((cartEntry, index) => (
                    <CartEntryComponent customStyles="mb-5" key={index} cartEntry={cartEntry} />
                ))}
                <Text className="text-lg font-jo-md mt-10">Total Price: {cart?.totalPrice.toFixed(2)}$</Text>
                {cart?.cartEntries.length !== 0 && <BigBtn handleClick={() => router.replace('/checkout')} customStyles="mt-2">Proceed to checkout</BigBtn>}
            </View>
        </ScrollView>
    )
}
