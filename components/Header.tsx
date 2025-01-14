import { Image, Pressable, Text, View } from "react-native";
import { StyledLogo } from "./Title";
import { useRouter } from 'expo-router';
import MyAvatar from "./MyAvatar";
import { BigBtn } from "./Buttons";
import { useContext, useEffect } from "react";

import useGetUser from "@/hooks/useGetUser";
import { ProfileBoxContext } from "@/context/ProfileBoxContext";
import ProfileBox from "./ProfileBox";
import { ShopContext } from "@/context/ShopContext";
import { getCartByUserId } from "@/lib/cartRequests";

export default function Header() {
    const router = useRouter();

    const { user } = useGetUser();

    const { isProfileBoxOpen, setIsProfileBoxOpen } = useContext(ProfileBoxContext);

    const { cart, setCart } = useContext(ShopContext)!;

    useEffect(() => {
        if(user.id !== -1)
            getCartByUserId(user.id!)
                .then(res => setCart(res))
                .catch(err => console.log(err))
            
    }, [user])

    const getTotalItems = () => {
        return cart?.cartEntries.reduce((acc, curr) => acc + curr.quantity, 0)
    }

    return (
        <View className="mx-5">
            <View className="flex flex-row justify-between mt-5">
                <StyledLogo handleClick={() => router.replace('/')}/>
                <View className='flex flex-row'>
                    {user.id !== -1 && 
                        <View className='relative hover:scale-110'>
                            <Pressable className="mr-5" onPress={() => router.replace('/cart')}>
                                <Image 
                                    className="h-9 w-9"
                                    source={{
                                        uri: 'https://cdn-icons-png.flaticon.com/512/263/263142.png'
                                    }}  
                                    alt="cart image"/>
                            </Pressable>
                            
                            {cart?.cartEntries.length! > 0 && <View className='w-4 h-4 bg-red-500 absolute top-0 right-3 rounded-full'>
                                <Text className='text-xs font-jo-md text-center text-white'>{getTotalItems()}</Text>
                            </View>}
                        </View>
                    }
                    {user.id !== - 1 ? 
                        <MyAvatar user={user} handleClick={() => setIsProfileBoxOpen(true)} customStyles='mt-1' />
                        :
                        <BigBtn handleClick={() => router.replace('/login')} customStyles="inline-block">Sign In</BigBtn>
                    }
                </View>
            </View>
        </View>
    )
    
}


