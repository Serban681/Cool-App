import { Image, Pressable } from "react-native";
import { Div } from "./Div";
import { User } from "@/models/User";

export default function MyAvatar({customStyles, user , handleClick}: {customStyles?: string, user: User, handleClick?: () => void}) {
    return (
        <Pressable onPress={handleClick} className={`cursor-pointer ${customStyles}`}>
            { !!user.profileImageUrl ? (
                <Image 
                    className="w-8 h-8 rounded-full"
                    source={{ uri: user.profileImageUrl! }}
                    alt="avatar image"
                />
            ) :
            (
                <Div className="w-8 h-8 bg-pink rounded-full" />
            )       
        }           
        </Pressable>
    )
}
