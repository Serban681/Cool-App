import { Pressable } from "react-native";
import { Div } from "./Div";

export default function MyAvatar({customStyles, handleClick}: {customStyles?: string, handleClick?: () => void}) {
    return (
        <Pressable onPress={handleClick} className={`cursor-pointer ${customStyles}`}>
            <Div className="w-8 h-8 bg-pink rounded-full" />
        </Pressable>
    )
}
