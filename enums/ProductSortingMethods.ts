export enum ProductSortMethods {
    PRICE_ASC = "Price Ascending",
    PRICE_DESC = "Price Descending",
    NAME_ASC = "Name Ascending",
    NAME_DESC = "Name Descending",
    NEWEST = "Newest First",
    OLDEST = "Oldest First"
}

export function getKeyByValue(value: string): string {
    for (const key in ProductSortMethods) {
        if (ProductSortMethods[key as keyof typeof ProductSortMethods] === value) {
            return key;
        }
    }
    return ProductSortMethods.NEWEST;
}
