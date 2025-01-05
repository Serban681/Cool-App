import { BigBtn, TagSystem } from "@/components/Buttons";
import Header from "@/components/Header";
import ProfileBox from "@/components/ProfileBox";
import { SectionTitle } from "@/components/SectionTitle";
import { ShopContext } from "@/context/ShopContext";
import useGetUser from "@/hooks/useGetUser";
import useRemoveNavHeader from "@/hooks/useRemoveNavHeader"
import { addProductToCart } from "@/lib/cartRequests";
import { getProductById } from "@/lib/productRequests";
import { getVariancesForProduct } from "@/lib/productVarianceRequests";
import { Product } from "@/models/Product";
import { ProductVariance } from "@/models/ProductVariance";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native"

export default function ProductPage() {
    useRemoveNavHeader()

    const { id } = useLocalSearchParams();

    const [product, setProduct] = useState<Product>();
    const [variances, setVariances] = useState<ProductVariance[]>([]);
    const [error, setError] = useState<string>('');

    const { user } = useGetUser();

    const { cart, setCart, notifierState, setNotifierState } = useContext(ShopContext)!;

    const [selectedAttributeValues, setSelectedAttributeValues] = useState<{
        attribute: string,
        value: string
    }[]>([]);
    const [groupedSelectedAttributeValues, setGroupedSelectedAttributeValues] = useState<string[]>([]);

    const handleAttributeValueSelection = (attribute: string, attributeValue: string) => {
        let newSelectedAttributeValues = selectedAttributeValues.map(elem => {
            if(elem.attribute === attribute) {
                elem.value = attributeValue
            }
            return elem
        })
        setSelectedAttributeValues(newSelectedAttributeValues)
        setGroupedSelectedAttributeValues(newSelectedAttributeValues.map(elem => elem.value))   
    }

    useEffect(() => {
        getProductById(+id)
            .then(res => {
                setProduct(res)
                setSelectedAttributeValues(res.attributesAndAttributeValues.map(elem => ({attribute: elem.name, value: ''})))
            })
            .catch((err: Error) => setError(err.message));
        
        getVariancesForProduct(+id) 
            .then(res => setVariances(res))
            .catch((err: Error) => setError(err.message))
    }, [])

    const findCartEntryInCart = (productId: number) : number => {
        cart?.cartEntries.forEach(cartEntry => {
            if(cartEntry.productVariance.product.id === productId) {
                return cartEntry.id
            }
        })

        return -1
    }

    const canOrder = () : boolean => {
        return selectedAttributeValues.every(elem => elem.value !== '')
    }

    const findVarianceByAttributes = () : ProductVariance | null => {
        for(let variance of variances) {
            if(variance.attributesAndValues.every(elem => selectedAttributeValues.some(selectedElem => selectedElem.attribute === elem.name && selectedElem.value === elem.value))) {
                return variance
            }
        }

        return null
    }

    const addToCartToggle = (productId: number) => {
        if(user.id === -1) {
            setNotifierState({ ...notifierState, message: 'You need to be logged in to order products'})
            return
        }

        //let cartEntryId = findCartEntryInCart(productId)

        // if(canOrder() && cartEntryId === -1) {
        //     addProductToCart(productId, cart!.id)
        //         .then(res => setCart(res))
        // }

        if(canOrder()) {
            const variance = findVarianceByAttributes()
            addProductToCart(variance!.id, cart!.id)
                .then(res => setCart(res))
                .catch((err: Error) => setNotifierState({ ...notifierState, message: err.message}))
        }
    }

    return (
        <ScrollView>
            <Header />
            <ProfileBox />
            {
                !!error ? <Text>{error}</Text>
            :
                <View className="flex flex-col mx-5">
                    <SectionTitle customStyles="mt-10">{product?.name}</SectionTitle>
                    <View className="flex flex-col justify-around mt-8">
                        <Image 
                            className="h-96 w-96"
                            source={{ 
                                uri: product?.photoUrl
                            }}  
                            alt="product image"/>
                        <View>
                            {product?.attributesAndAttributeValues.map((attribute, index) => (
                                <View key={index}>
                                    <Text className="font-jo-md text-2xl mb-4 capitalize">{attribute.name}</Text> 
                                    <View>
                                        <TagSystem
                                            tags={attribute.values}
                                            selectedTags={groupedSelectedAttributeValues}
                                            handleTagSelection={(attributeValue) => handleAttributeValueSelection(attribute.name, attributeValue)}
                                            customStyles="mr-5"
                                            />
                                    </View>
                                </View>
                            ))}
                            <BigBtn 
                                handleClick={() => addToCartToggle(product?.id!)} 
                                active={canOrder()} 
                                customStyles="my-8">Add to cart</BigBtn>
                        </View>
                    </View>
                </View>
            }
        </ScrollView>
    )
}
