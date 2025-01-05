import { Text, View } from "react-native";
import { Div } from "./Div";
import { Picker } from "@react-native-picker/picker";

export const CustomDropdown = ({name, options, selected, handleSelect, margins = 0}: 
    {name: string, options: string[], selected: string, handleSelect: (name: string, selected: string) => void,  margins?: number}) => {
    return (
        <Picker style={{backgroundColor: '#313131', color: '#ffffff', margin: margins}} dropdownIconColor="#ffffff" selectedValue={selected} onValueChange={(itemValue) => handleSelect(name, itemValue)}>
            {options.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
            ))}
        </Picker>
    );
}
