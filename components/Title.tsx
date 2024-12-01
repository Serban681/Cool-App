import { Pressable, Text, View } from "react-native"

export const StyledLogo = ({customStyles, handleClick}: {customStyles?: string, handleClick?:() => void}) => {
    return (
        <Pressable className={customStyles} onPress={handleClick} >
            <Text className="my-auto font-rg text-3xl text-black">C00L shop</Text>
            <View className="w-8 h-2.5 bg-pink inline-block translate-x-5 -translate-y-[2px] rotate-12" />
        </Pressable>
    )
}

export const SimpleLogo = ({customStyles}: {customStyles?: string}) => {
    return <h1 className={`${customStyles} my-auto font-rg text-3xl text-white`}>C00L shop</h1>
}
