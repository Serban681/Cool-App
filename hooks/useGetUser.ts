import { User } from "@/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useGetUser() {
    const [user, setCurrUser] = useState<User>({
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
    });

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');

            if (storedUser) {
                setCurrUser(JSON.parse(storedUser));
            }
        };

        fetchUser();
    }, [])

    const setUser = (user: User) => {
        setCurrUser(user);

        AsyncStorage.setItem('user', JSON.stringify(user));
    };

    const setEmptyUser = () => {
        setCurrUser({
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
        });

        AsyncStorage.removeItem('user');
    }

    return { user, setUser, setEmptyUser };
}
