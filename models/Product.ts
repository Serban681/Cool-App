export interface Product {
    id?: number,
    name: string,
    price: number,
    photoUrl: string,
    addedDate: Date,
    category: string,
    attributesAndAttributeValues: {
        id?: number,
        name: string,
        values: string[]
    }[]
}
