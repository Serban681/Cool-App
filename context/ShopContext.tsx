import { Cart } from "@/models/Cart";
import { createContext, useState } from "react";

interface NotifierContextState {
    message: string;
    isError?: boolean;
}

interface ShopContextProps {
    cart: Cart | null;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
    notifierState: NotifierContextState;
    setNotifierState: React.Dispatch<React.SetStateAction<NotifierContextState>>;
}

export const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart>({
        id: -1,
        user: {
            id: -1,
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            defaultDeliveryAddress: {
                id: -1,
                streetLine: '',
                city: '',
                postalCode: '',
                county: '',
                country: ''
            },
            defaultBillingAddress: {
                id: -1,
                streetLine: '',
                city: '',
                postalCode: '',
                county: '',
                country: ''
            }
        },
        cartEntries: [],
        totalPrice: 0
    })

    const [notifierState, setNotifierState] = useState<NotifierContextState>({
        message: '',
        isError: true
    })

    return (
        <ShopContext.Provider value={{ cart, setCart, notifierState, setNotifierState }}>
            {children}
        </ShopContext.Provider>
    )
}
