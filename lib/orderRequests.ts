import { OrderRequest } from "@/models/OrderRequest";

export const createOrder = async (orderRequest: OrderRequest) => {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderRequest)
    });

    if(!response.ok) {
        return Promise.reject(await response.json());
    }

    return response
};
