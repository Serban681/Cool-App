export enum PaymentMethods {
    CASH = "Cash",
    CARD = "Card"
}

export function getKeyByValue(value: string): string {
    for (const key in PaymentMethods) {
        if (PaymentMethods[key as keyof typeof PaymentMethods] === value) {
            return key;
        }
    }
    return PaymentMethods.CASH;
}
