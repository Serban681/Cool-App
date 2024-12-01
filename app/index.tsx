import { TagSystem } from "@/components/Buttons";
import { CustomDropdown } from "@/components/CustomDropdown";
import { Div } from "@/components/Div";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProfileBox from "@/components/ProfileBox";
import { SectionTitle } from "@/components/SectionTitle";
import { getKeyByValue, ProductSortMethods } from "@/enums/ProductSortingMethods";
import useRemoveNavHeader from "@/hooks/useRemoveNavHeader";
import { getAllCategories } from "@/lib/categoryRequests";
import { getAllProducts } from "@/lib/productRequests";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  useRemoveNavHeader()

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelection = (category: string) => {
    if(!!selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(selectedCategory => selectedCategory !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const [sortingMethod, setSortingMethod] = useState<string>(ProductSortMethods.NEWEST);

  const [categorisedProducts, setCategorisedProducts] = useState<{
    category: string,
    products: Product[]
  }[]>([]);

  useEffect(() => {
    getAllCategories()    
      .then(res => res.map((category: Category) => category.name))
      .then(data => setCategories(data));
  }, [])

  useEffect(() => {
    getAllProducts(selectedCategories, getKeyByValue(sortingMethod))
      .then(res => setCategorisedProducts(res));
  }, [selectedCategories, sortingMethod])

  return (
    <ScrollView>
      <Header />
      <ProfileBox />
        <TagSystem 
            tags={categories} 
            selectedTags={selectedCategories} 
            handleTagSelection={(category) => handleCategorySelection(category)} 
            customStyles="inline-block mt-8 ml-5" />

        <CustomDropdown name={'sort_dropdown'} options={Object.values(ProductSortMethods)} selected={sortingMethod} handleSelect={(name, selected) => setSortingMethod(selected)} />

        <View className="flex flex-row justify-center">
          <View className="flex flex-col mb-8">
            {categorisedProducts.length > 0 ? 
              categorisedProducts.map((elem, index) => (
                <Div key={index}>
                  <SectionTitle customStyles="mt-8 mb-3">{elem.category}</SectionTitle>
                  
                    <Div className="grid grid-cols-1 gap-14">
                      {elem.products.map(product => <ProductCard key={product.id} product={product} />)}
                    </Div>
                  
                </Div>
              ))
              
              : <Text className="font-jo-md">Loading...</Text>
            }
          </View>
        </View>
         
        {/* {categorisedProducts[0]?.products.map((prod, id) => (
          <Text className="font-jo-li" key={id}>{prod.name}</Text>
        ))}
        <Text className="color-red-500">miau</Text>

        {categorisedProducts[0]?.products.map((prod, id) => (
          <Text className="font-jo-li" key={id}>{prod.name}</Text>
        ))}
        <Text className="color-red-500">miau</Text>

        {categorisedProducts[0]?.products.map((prod, id) => (
          <Text className="font-jo-li" key={id}>{prod.name}</Text>
        ))}
        <Text className="color-red-500">miau</Text>

        {categorisedProducts[0]?.products.map((prod, id) => (
          <Text className="font-jo-li" key={id}>{prod.name}</Text>
        ))}
        <Text className="color-red-500">miau</Text> */}
    </ScrollView>
  );
}
