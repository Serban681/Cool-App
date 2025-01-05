import { Product } from "./Product";
import { ProductAttributeAndValue } from "./ProductAttributeAndValue";

export interface ProductVariance {
    id: number,
    product: Product,
    attributesAndValues: ProductAttributeAndValue[],
    quantity: number
}
