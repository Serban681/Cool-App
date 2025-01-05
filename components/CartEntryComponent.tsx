import { CartEntry } from '@/models/CartEntry'
import { useContext } from 'react';
import { ShopContext } from '@/context/ShopContext';
import { removeProductFromCart, updateCartEntryQuantity } from '@/lib/cartRequests';
import { SmallTag } from './Tag';
import { Div } from './Div';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

const CartEntryComponent = ({ customStyles, cartEntry }: { customStyles: string, cartEntry: CartEntry }) => {
    const { setCart, notifierState, setNotifierState } = useContext(ShopContext)!;

    const increaseQuantity = (e: any) => {
        updateCartEntryQuantity(cartEntry.id, cartEntry.quantity + 1)
            .then(async res => await setCart(res))
            .catch(async err => await setNotifierState({ ...notifierState, message: err }))
    }
    
    const decreaseQuantity = (e: any) => {
        if(cartEntry.quantity === 1) {
            removeProductFromCart(cartEntry.id)
                .then(async res => await setCart(res))
                .catch(async err => await setNotifierState({ ...notifierState, message: err }))

            return
        }
        updateCartEntryQuantity(cartEntry.id, cartEntry.quantity -1)
            .then(async res => await setCart(res))
            .catch(async err => await setNotifierState({ ...notifierState, message: err }))
    }

    const removeCartEntry = (e: any) => {
        removeProductFromCart(cartEntry.id)
            .then(async res => await setCart(res))
            .catch(async err => await setNotifierState({ ...notifierState, message: err }))
    }

    return (
        <View className={`${customStyles} px-4 w-full h-24 border-2 border-black shadow-big rounded-3xl flex flex-row justify-between items-center`}>
            <View className="flex flex-row text-xl font-medium">
                <Text className="inline-block mr-3 text-sm w-20 font-jo-md">{cartEntry.productVariance.product.name}</Text>
                <View className='flex flex-row translate-y-[0.4rem]'>{ cartEntry.productVariance.attributesAndValues.map((attributeAndValue, index) => <SmallTag key={index} value={attributeAndValue.value} customStyles='ml-2' />) }</View> 
            </View>
            <View className='flex flex-row'>
                <Text className="mr-4 text-base font-medium inline">Qty: <View className="translate-y-[0.5rem] bg-black p-1"><Text className='text-white'>{cartEntry.quantity}</Text></View></Text>
                <Pressable onPress={decreaseQuantity} className="mr-2 hover:scale-110 translate-y-[-0.1rem] bg-black inline-flex justify-center items-center text-white text-xl font-medium rounded-full w-8 h-8">
                    <View className="w-3 h-[0.2rem] bg-white"></View>
                </Pressable>
                <Pressable onPress={increaseQuantity} className="-translate-y-[0.1rem] hover:scale-110 bg-black inline-flex justify-center items-center text-white text-xl font-medium rounded-full w-8 h-8">
                    <View>
                        <View className="translate-y-[0.35rem] w-3 h-[0.2rem] bg-white"></View>
                        <View className="translate-x-[0.3rem] translate-y-[-0.1rem] w-[0.2rem] h-3 bg-white"></View>
                    </View>
                </Pressable>
            </View>
            <View className='-translate-y-[0.65rem]'>
                <TouchableOpacity className="relative scale-90" onPress={() => removeCartEntry(cartEntry.id)}>
                    <Div className="absolute rotate-45 right-1 top-2 w-5 h-1 bg-black" />
                    <Div className="absolute rotate-45 right-3 top-0 w-1 h-5 bg-black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartEntryComponent;
