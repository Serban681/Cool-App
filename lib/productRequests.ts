import { Product } from "@/models/Product";

export async function getAllProducts(categories: string[], sortMethod: string): Promise<{
    category: string,
    products: Product[]
}[]> {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/product/search',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categories,
                sortMethod
            })
        }
    );

    return response.json();
}

export async function getProductById(id: number) : Promise<Product> {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/product/' + id);
    
    if(!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}
