import { Text, View } from "react-native";
import { StyledLogo } from "./Title";
import { useRouter } from 'expo-router';
import MyAvatar from "./MyAvatar";
import { BigBtn } from "./Buttons";
import { useContext, useEffect } from "react";

import useGetUser from "@/hooks/useGetUser";
import { ProfileBoxContext } from "@/context/ProfileBoxContext";
import ProfileBox from "./ProfileBox";

export default function Header() {
    const router = useRouter();

    const { user } = useGetUser();

    const { isProfileBoxOpen, setIsProfileBoxOpen } = useContext(ProfileBoxContext);

    return (
        <View className="mx-5">
            <View className="flex flex-row justify-between mt-5">
                <StyledLogo handleClick={() => router.replace('/')}/>
                <View className='flex flex-row'>
                    {/* {user.id !== -1 && 
                        <View className='relative hover:scale-110'>
                            {cart?.cartEntries.length! > 0 ? <ShoppingCartSolid onClick={() => router.push('/cart')} className='size-7 mt-2 mr-4' /> : <ShoppingCartOutline onClick={() => router.push('/cart')} className='size-7 mt-2 mr-4' />}
                            
                            {cart?.cartEntries.length! > 0 && <View className='w-4 h-4 bg-red-500 absolute top-1 right-2.5 rounded-full'>
                                <Text className='text-xs font-medium text-center text-white'>{getTotalItems()}</Text>
                            </View>}
                        </View>
                    } */}
                    {user.id !== - 1 ? 
                        <>
                            <MyAvatar handleClick={() => setIsProfileBoxOpen(true)} customStyles='mt-1' />
                        </>
                        :
                        <BigBtn handleClick={() => router.replace('/login')} customStyles="inline-block">Sign In</BigBtn>
                    }
                </View>
            </View>
        </View>
    )
    
}


