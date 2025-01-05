import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function({message}: {message: string}) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if(message != '') {
            setIsActive(true)
            setTimeout(() => setIsActive(false), 3000)   
        }     
    }, [message])

    return (
        <View className={`w-96 p-3 bg-red-400 absolute rounded-md top-0 ${ isActive ?  'translate-y-10' : '-translate-y-16' } left-1/2 -translate-x-1/2 z-50`}>
            <Text className="text-white font-jo-md">{message}</Text>
        </View>
    )
}
