import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from "react-native";

interface CustomTextInput<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
    label: string;
}

export function CustomTextInput({ label, value, setValue, customStyles } : { label: string, value: string, setValue: (newText: string) => void, customStyles?: string}) {
    return (
        <View className={`${customStyles} block my-2`}>
             <Text className="font-jo-md text-xl text-black">{label}:</Text>
             <TextInput className="focus:outline-none text-xl border-2 font-jo-li rounded-xl py-1 px-2 mb-3 font-light" value={value} onChangeText={setValue} />
         </View>  
    )
}
