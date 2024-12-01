import { ReactNode } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Div } from "./Div";

export const BigBtn = (
        {children, active=true, handleClick, whiteBtn=false, customStyles}: 
        {children: ReactNode, active?: boolean, whiteBtn?: boolean, handleClick?: () => void, customStyles?: string}
    ) => {
        return (
            <Pressable onPress={() => handleClick && handleClick()} className={`${active ? (whiteBtn ? 'bg-white border-2 border-black' : 'bg-black') : 'bg-light-gray' } ${customStyles} rounded-full px-10 h-11 flex justify-center items-center`}>
                <Text className={`${active ? (whiteBtn ? ' text-black' : 'text-white') : 'text-dark-gray'} font-jo-md text-base`}>{children}</Text>
            </Pressable>
        );
}

export const SmallBtn = (
    {children, active=true, handleClick, whiteBtn=false, customStyles}: 
    {children: ReactNode, active?: boolean, whiteBtn?: boolean, handleClick?: () => void, customStyles?: string}
) => {
    return (
        <Pressable onPress={() => handleClick && handleClick()} className={`${active ? (whiteBtn ? 'bg-white border-2 border-black' : 'bg-black') : 'bg-light-gray' } ${customStyles} rounded-full px-10 h-11 hover:scale-110 flex justify-center items-center`}>
            <Text className={`${active ? (whiteBtn ? ' text-black' : 'text-white') : 'text-dark-gray'}`} >{children}</Text>
        </Pressable>
    );
}

const TagBtn = ({text, selected, handleClick, customStyles}: 
    {text: string, selected: boolean, handleClick: () => void, customStyles?: string}) => 
        {
            return (
                <Pressable onPress={() => handleClick()} className={`${customStyles} self-start rounded-full inline-flex justify-center px-5 font-medium h-8 text-sm hover:scale-110 ${selected ? "bg-black" : "bg-light-gray"}`}>
                    <Text className={`font-jo-md ${selected ? "text-white" : "text-dark-gray"}`}>{text}</Text>
                </Pressable>
            )
}

export const TagSystem = ({tags, selectedTags, handleTagSelection, customStyles}: 
        {tags: string[], selectedTags: string[], handleTagSelection: (tag: string) => void, customStyles?: string}) => {
    return (
        <View className={`${customStyles} flex flex-row flex-wrap`}>
            {tags.map((tag, index) => (
                <TagBtn 
                    key={index} 
                    text={tag} 
                    selected={selectedTags.includes(tag)} 
                    handleClick={() => handleTagSelection(tag)} 
                    customStyles="mr-3 mb-3" />
            ))}
        </View>
    )
}
