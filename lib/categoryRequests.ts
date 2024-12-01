export const getAllCategories = async () => {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/category');

    return response.json();
}
