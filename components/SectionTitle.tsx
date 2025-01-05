import { ReactNode } from "react"
import { Text, View } from "react-native"

export const SectionTitle = ({customStyles, pinkStyles, children}: 
        {customStyles?: string, pinkStyles?: string, children: ReactNode}) => {
    return (
        <View className={`block ${customStyles} flex flex-row`}>
            <View className={`w-2 h-5 ${pinkStyles} mr-1 bg-pink inline-block translate-y-1.5`} />
            <Text className="font-jo-md text-2xl inline-block">
                {children}
            </Text>
        </View>
    )
}
