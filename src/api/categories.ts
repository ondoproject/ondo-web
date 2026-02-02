import {apiClient} from "@/api/client.ts";
import {Category} from "@/types/category.ts";

export const getCategories = async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>('/v1/categories');
    return data;
};
