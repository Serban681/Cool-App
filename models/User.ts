import { Address } from './Address'

export interface SimpleUser {
    id?: number,
    firstName: string,
    lastName: string,
    profileImageUrl?: string | null,
    email: string,
    phoneNumber: string,
    gender: string,
    age: string,
    password: string,
    defaultDeliveryAddressId?: number,
    defaultBillingAddressId?: number
}

export interface User extends SimpleUser {
    defaultDeliveryAddressId?: never,
    defaultBillingAddressId?: never,
    defaultDeliveryAddress: Address,
    defaultBillingAddress: Address
}
