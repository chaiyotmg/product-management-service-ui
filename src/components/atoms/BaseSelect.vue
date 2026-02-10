<script setup lang="ts">
import type { BaseSelectProps } from '@/types';

defineProps<BaseSelectProps>();
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
    <select
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-sans"
      :class="{ 'border-red-500 focus-visible:ring-red-500': error }"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="description" class="text-xs text-slate-500 font-sans">
      {{ description }}
    </p>
    <span v-if="error" class="text-xs text-red-500 font-medium">
      {{ error }}
    </span>
  </div>
</template>
