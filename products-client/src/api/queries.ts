import axios from 'axios';
import { Product } from '@/models/Produc.model';
const API_URI = 'http://localhost:3000/api/products';

export async function getProducts(): Promise<Product[]> {
    const { data } = await axios.get<Product[]>(API_URI);
    return data;
}

export async function addPRoduct(product: FormData) {
    const { data } = await axios({
        baseURL: API_URI,
        headers: {'content-type': 'multipart/form-data'},
        data: product,
        method: 'POST',
    });
    return data;
}

export async function getOneProduct(id: string): Promise<Product> {
    const { data } = await axios.get<Product>(`${API_URI}/${id}`);
    return data;
}

export async function updateProduct(id: string, product: FormData) {
    const response = await axios({
        baseURL: `${API_URI}/${id}`,
        headers: {'content-type': 'multipart/form-data'},
        data: product,
        method: 'PUT'
    });
    return response;
}

export async function deletePoduct(id: string): Promise<{}> {
    return await axios.delete(`${API_URI}/${id}`);
}