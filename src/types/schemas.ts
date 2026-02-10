import { z } from 'zod';

export const searchSchema = z.object({
  search: z.string().max(100, 'Search term too long').default('')
});

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  price: z.number().min(0, 'Price must be positive'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  categoryId: z.string().min(1, 'Category is required'),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  description: z.string().max(200, 'Description is too long').optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
