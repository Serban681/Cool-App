import { Product } from "@/models/Product";
import { BigBtn } from "./Buttons";
import { useRouter } from "expo-router";
import { Div } from "./Div";
import { Image, Text, View } from "react-native";

export default function ProductCard({ product, customStyles }: { product: Product, customStyles?: string }) {
    const router = useRouter();
    
    return (
        <Div className="flex flex-col px-5 py-4 w-96 h-[27rem] border-2 border-solid border-black rounded-3xl shadow-big">
            <View className="flex flex-row justify-center mt-2">
                <Image className="h-52 w-52"
                    source={{ 
                        uri: product.photoUrl
                    }}  
                    alt="product image"/>
            </View>

            <View className="mt-4 flex flex-row justify-center">
                <Text className="font-jo-md text-xl">{product.name}</Text>
            </View>
            <View className="mt-3 flex flex-row justify-center items-center">
                <Text className="font-jo-li text-sm">Price: {product.price.toFixed(2)}$</Text>
            </View>
            <View className="flex flex-row justify-center mt-6">
                <BigBtn handleClick={() => router.replace('/camera')}> 
                    {/* //(`/product/${product.id!}`)}> */}
                    More
                </BigBtn>
            </View>
        </Div>
    )
}
