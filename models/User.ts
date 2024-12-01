import { Address } from './Address'

export interface SimpleUser {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
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
