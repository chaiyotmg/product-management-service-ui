<script setup lang="ts">
import { Search } from 'lucide-vue-next';
import type { SearchInputProps } from '@/types';

defineProps<SearchInputProps>();
defineEmits(['update:modelValue', 'search']);
</script>

<template>
  <div class="relative w-full max-w-sm">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search class="h-4 w-4 text-slate-400" />
    </div>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keyup.enter="$emit('search')"
      :placeholder="placeholder || 'Search...'"
      class="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
    />
  </div>
</template>
