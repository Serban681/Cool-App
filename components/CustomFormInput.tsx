import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface CustomTextInput<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
    label: string;
}

export function CustomTextInput<T extends FieldValues>({label, ...args}: CustomTextInput<T>) {
    const { field, fieldState } = useController(args);
    return (  
        <View className="block my-2">
            <Text className="font-jo-md text-xl">{label}:</Text>
            <TextInput className="focus:outline-none text-xl border-2 font-jo-li rounded-xl py-1 px-2 mb-3 font-light"  {...field} />
        </View>   
    );
}
