import api from './api';
import type { ApiResponse, Category } from '@/types';

export const fetchCategories = (params: Record<string, string | number | boolean | undefined> = {}) =>
  api.get<void, ApiResponse<Category[]>>('/categories', { params });

export const fetchCategoryById = (id: string) =>
  api.get<void, ApiResponse<Category>>(`/categories/${id}`);

export const createCategory = (data: Partial<Category>) =>
  api.post<Partial<Category>, ApiResponse<Category>>('/categories', data);

export const updateCategory = (id: string, data: Partial<Category>) =>
  api.put<Partial<Category>, ApiResponse<Category>>(`/categories/${id}`, data);

export const deleteCategory = (id: string) =>
  api.delete<void, ApiResponse<Category>>(`/categories/${id}`);
