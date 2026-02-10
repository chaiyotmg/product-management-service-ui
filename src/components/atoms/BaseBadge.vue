<script setup lang="ts">
import type { BaseBadgeProps } from '@/types';

withDefaults(defineProps<BaseBadgeProps>(), {
  variant: 'neutral',
});

const variantClasses = {
  success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-100 text-amber-700 border-amber-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  info: 'bg-sky-100 text-sky-700 border-sky-200',
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
};
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>
