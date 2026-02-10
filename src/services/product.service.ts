import api from './api';
import type { ApiResponse, Product } from '@/types';

export const fetchProducts = (params: Record<string, string | number | boolean | undefined> = {}) => 
  api.get<void, ApiResponse<Product[]>>('/products', { params });

export const fetchProductById = (id: string) =>
  api.get<void, ApiResponse<Product>>(`/products/${id}`);

export const createProduct = (data: Partial<Product>) =>
  api.post<Partial<Product>, ApiResponse<Product>>('/products', data);

export const updateProduct = (id: string, data: Partial<Product>) =>
  api.put<Partial<Product>, ApiResponse<Product>>(`/products/${id}`, data);

export const deleteProduct = (id: string) =>
  api.delete<void, ApiResponse<Product>>(`/products/${id}`);
