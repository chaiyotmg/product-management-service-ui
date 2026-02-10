<script setup lang="ts">
import type { BaseInputProps } from '@/types';

defineProps<BaseInputProps>();
defineEmits(['update:modelValue']);

defineOptions({
  inheritAttrs: false
});
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="id" class="text-sm font-medium text-slate-700">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      :id="id"
      :type="type || 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-sans"
      :class="{ 'border-red-500 focus-visible:ring-red-500': error }"
    />
    <p v-if="description" class="text-xs text-slate-500 font-sans">
      {{ description }}
    </p>
    <span v-if="error" class="text-xs text-red-500 font-medium">
      {{ error }}
    </span>
  </div>
</template>
