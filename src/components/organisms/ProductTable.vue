<script setup lang="ts">
import { Pencil, Trash2, Package } from 'lucide-vue-next';
import type { ProductTableProps } from '@/types';
import { BaseBadge } from '@/components/atoms';

withDefaults(defineProps<ProductTableProps>(), {
  itemsPerPage: 10
});

defineEmits(['edit', 'delete']);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(price);
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse min-w-[800px]">
      <thead>
        <tr class="bg-slate-50/50 border-b border-slate-100">
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider w-16 whitespace-nowrap">No.</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">Product</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">Category</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">SKU</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">Price</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">Stock</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider text-right whitespace-nowrap">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100" :class="{ 'opacity-50 pointer-events-none transition-opacity duration-200': loading && products.length > 0 }">
        <!-- Initial Loading State -->
        <template v-if="loading && products.length === 0">
          <tr v-for="i in 3" :key="i" class="animate-pulse">
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-4"></div></td>
            <td class="px-6 py-4"><div class="h-10 bg-slate-100 rounded w-48"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-24"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-20"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-16"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-12"></div></td>
            <td class="px-6 py-4 text-right"><div class="h-8 bg-slate-100 rounded w-20 ml-auto"></div></td>
          </tr>
        </template>

        <!-- Empty State -->
        <tr v-else-if="!loading && products.length === 0">
          <td colspan="7" class="px-6 py-12 text-center">
            <div class="flex flex-col items-center justify-center gap-3">
              <Package class="h-12 w-12 text-slate-200" />
              <p class="text-slate-500 font-medium">No products found.</p>
            </div>
          </td>
        </tr>

        <!-- Data State -->
        <template v-else>
          <tr v-for="(product, index) in products" :key="product._id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 text-sm text-slate-500 font-sans">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="flex flex-col">
                  <span class="font-semibold text-slate-900">{{ product.name }}</span>
                  <span class="text-xs text-slate-500 truncate max-w-[150px] font-sans">{{ product.description || 'No description' }}</span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <BaseBadge variant="info">
                {{ typeof product.categoryId === 'object' ? product.categoryId.name : 'Unknown' }}
              </BaseBadge>
            </td>
            <td class="px-6 py-4">
              <span class="text-sm font-medium text-slate-600 font-sans">{{ product.sku }}</span>
            </td>
            <td class="px-6 py-4 font-medium text-slate-700">
              {{ formatPrice(product.price) }}
            </td>
            <td class="px-6 py-4">
              <span :class="product.stock > 10 ? 'text-slate-600 font-sans' : 'text-amber-600 font-semibold font-sans'" class="text-sm">
                {{ product.stock }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button @click="$emit('edit', product)" class="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                  <Pencil class="h-4 w-4" />
                </button>
                <button @click="$emit('delete', product._id)" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
