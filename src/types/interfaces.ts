import type { Component } from 'vue';

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: Pagination;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string | Category;
  createdAt: string;
  updatedAt: string;
}

export interface BaseBadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: Component;
  rightIcon?: Component;
}

export interface BaseInputProps {
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  description?: string;
  id?: string;
}

export interface BaseModalProps {
  show: boolean;
  title?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface BaseSelectProps {
  modelValue?: string | number;
  options: SelectOption[];
  label?: string;
  error?: string;
  placeholder?: string;
  description?: string;
  id?: string;
}

export interface AlertModalProps {
  show: boolean;
  title?: string;
  message: string;
  buttonLabel?: string;
}

export interface ConfirmModalProps {
  show: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export interface SearchInputProps {
  modelValue: string;
  placeholder?: string;
}

export interface ProductTableProps {
  products: Product[];
  loading: boolean;
  currentPage: number;
  itemsPerPage?: number;
}

export interface ProductFormProps {
  initialData?: Partial<Product>;
  loading?: boolean;
}

export interface CategoryTableProps {
  categories: Category[];
  loading: boolean;
  currentPage: number;
  itemsPerPage?: number;
}

export interface CategoryFormProps {
  initialData?: Partial<Category>;
  loading?: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface BaseToastProps {
  toast: Toast;
}

export interface ApiError {
  message: string;
  errors?: { message: string; path?: string[] }[];
  statusCode?: number;
}
