import { Cart } from "@/models/Cart";

export async function getCartByUserId(userId: number) : Promise<Cart> {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/cart/user/' + userId);
    
    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}

export async function removeCartFromUser(userId: number) {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `/cart/remove-user/${userId}`, {
        method: 'PUT',
    })       
    
    if(!response.ok) {
        return Promise.reject(await response.json());
    }

    return response;
}

export async function addProductToCart(productVarianceId: number, cartId: number) {
    
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `/cart/add-product?productVarianceId=${productVarianceId}&cartId=${cartId}`, {
        method: 'POST'
    })

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}

export async function removeProductFromCart(cartEntryId: number) {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `/cart/remove-product?cartEntryId=${cartEntryId}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}

export async function updateCartEntryQuantity(cartEntryId: number, quantity: number) {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `/cart/product/update-quantity?cartEntryId=${cartEntryId}&quantity=${quantity}`, {
        method: 'PUT'
    })

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}
