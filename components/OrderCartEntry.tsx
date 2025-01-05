import { Text, View } from "react-native";
import { CartEntry } from "@/models/CartEntry";
import { SmallTag } from "./Tag";

export default function OrderCartEntry({ cartEntry }: { cartEntry: CartEntry }) {
    return (
        <View className="mt-3 border-b-2 pb-2 flex flex-row justify-between">
            <View className="flex flex-row">
                <Text className="text-black font-jo-md text-base inline-block">{cartEntry.productVariance.product.name}</Text>
                
                <View className="flex flex-row translate-y-0.5">
                    {cartEntry.productVariance.attributesAndValues.map((attributeAndValue, index) => <SmallTag customStyles="ml-3" value={attributeAndValue.value} key={index} />)}
                </View>
            </View>

            <Text className="text-black font-jo-md text-base inline-block">{cartEntry.quantity} x {cartEntry.productVariance.product.price.toFixed(2)}$</Text>
        </View>
    )
}
