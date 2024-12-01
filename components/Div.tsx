import { StyleProp, View, ViewStyle } from "react-native";

interface DivProps {
    children?: React.ReactNode; // For React children
    style?: StyleProp<ViewStyle>; // To support styles (can be ViewStyle or an array of ViewStyles)
    [key: string]: any; // To allow additional props like onPress, testID, etc.
  }

export const Div = ({ children, style, ...props } : DivProps) => (
    <View style={[{ alignSelf: 'flex-start' }, style]} {...props}>
        {children}
    </View>
);
