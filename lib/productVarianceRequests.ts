export async function getVariancesForProduct(productId: number) {
    
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `/product-variance/product/${productId}`)

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}
