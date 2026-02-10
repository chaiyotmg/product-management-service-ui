<script setup lang="ts">
import { Pencil, Trash2, FolderOpen } from 'lucide-vue-next';
import type { CategoryTableProps } from '@/types';

withDefaults(defineProps<CategoryTableProps>(), {
  itemsPerPage: 10
});

defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr class="bg-slate-50/50 border-b border-slate-100">
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider w-16 whitespace-nowrap">No.</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">Name</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">Slug</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">Description</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider whitespace-nowrap">Created At</th>
          <th class="px-6 py-4 text-xs font-semibold text-slate-500 tracking-wider text-right whitespace-nowrap">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100" :class="{ 'opacity-50 pointer-events-none transition-opacity duration-200': loading && categories.length > 0 }">
        <!-- Initial Loading State -->
        <template v-if="loading && categories.length === 0">
          <tr v-for="i in 3" :key="i" class="animate-pulse">
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-4"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-24"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-20"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-48"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-slate-100 rounded w-32"></div></td>
            <td class="px-6 py-4 text-right"><div class="h-8 bg-slate-100 rounded w-20 ml-auto"></div></td>
          </tr>
        </template>
        <!-- Empty State -->
        <tr v-else-if="!loading && categories.length === 0">
          <td colspan="6" class="px-6 py-12 text-center">
            <div class="flex flex-col items-center justify-center gap-3">
              <FolderOpen class="h-12 w-12 text-slate-200" />
              <p class="text-slate-500 font-medium">No categories found.</p>
            </div>
          </td>
        </tr>
        <tr v-for="(category, index) in categories" :key="category._id" class="hover:bg-slate-50/50 transition-colors">
          <td class="px-6 py-4 text-sm text-slate-500 font-sans">
            {{ (currentPage - 1) * itemsPerPage + index + 1 }}
          </td>
          <td class="px-6 py-4">
            <span class="font-semibold text-slate-900">{{ category.name }}</span>
          </td>
          <td class="px-6 py-4">
            <code class="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200 font-sans">
              {{ category.slug }}
            </code>
          </td>
          <td class="px-6 py-4 text-slate-600 text-sm max-w-xs truncate">
            {{ category.description || '-' }}
          </td>
          <td class="px-6 py-4 text-slate-500 text-sm">
            {{ new Date(category.createdAt).toLocaleDateString() }}
          </td>
          <td class="px-6 py-4 text-right">
            <div class="flex items-center justify-end gap-2">
              <button @click="$emit('edit', category)" class="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                <Pencil class="h-4 w-4" />
              </button>
              <button @click="$emit('delete', category._id)" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
