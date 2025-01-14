import useGetUser from "@/hooks/useGetUser";
import Avatar from "./MyAvatar";
import { BigBtn, SmallBtn } from "./Buttons";
import { useRouter } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { ProfileBoxContext } from "@/context/ProfileBoxContext";
import { useContext } from "react";
import { Div } from "./Div";

export default function ProfileBox() {
    const { user, setEmptyUser } = useGetUser();
    const router = useRouter();

    const { isProfileBoxOpen, setIsProfileBoxOpen } = useContext(ProfileBoxContext);

    const signOut = () => {
        setEmptyUser();
        setIsProfileBoxOpen(false);
        router.push('/');
    }

    return (
        <View className={`${isProfileBoxOpen ? 'block' : 'hidden'} w-64 absolute top-4 right-4 pb-4 opacity-100 bg-white border-2 border-solid border-black rounded-3xl layer z-50`}>
            <View className="absolute right-3 top-3">
                <TouchableOpacity className="relative scale-90" onPress={() => setIsProfileBoxOpen(false)}>
                    <Div className="absolute rotate-45 right-1 top-2 w-5 h-1 bg-black" />
                    <Div className="absolute rotate-45 right-3 top-0 w-1 h-5 bg-black" />
                    {/* <XMarkIcon  className="size-6 hover:scale-125 cursor-pointer" /> */}
                </TouchableOpacity>
            </View>
            <View className="ml-4 mt-4">
                <View className="flex flex-row">
                    <Avatar user={user} />
                    <View className="ml-3">
                        <Text className="font-jo-md">{user.firstName} {user.lastName}</Text>
                        <Text className="text-xs font-jo-li">{user.email}</Text>
                    </View>
                </View>
                <View className="flex flex-col mt-5 mr-4">
                    <SmallBtn handleClick={() => {
                        setIsProfileBoxOpen(false)
                        signOut()
                    }}>Sign Out</SmallBtn>
                    <SmallBtn handleClick={() => {
                        setIsProfileBoxOpen(false) 
                        router.replace('/profile')
                    }} customStyles={'mt-3'} whiteBtn>View Profile</SmallBtn>
                </View>
            </View>
        </View>  
    )
}
