import endpoint from "utils/endpoint";

export const fetchCategoriesEndpoint = endpoint('get', 'categories/all');
export const addCategoryEndpoint = endpoint('get', 'categories/');
export const deleteCategoryEndpoint = (id: string) => endpoint('get', `categories/${id}`);

