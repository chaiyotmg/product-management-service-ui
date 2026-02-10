<script setup lang="ts">
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-vue-next';
import type { BaseToastProps } from '@/types/interfaces';

defineProps<BaseToastProps>();
const emit = defineEmits(['close']);

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const variants = {
  success: 'bg-emerald-50 border-emerald-100 text-emerald-800',
  error: 'bg-red-50 border-red-100 text-red-800',
  info: 'bg-blue-50 border-blue-100 text-blue-800',
  warning: 'bg-amber-50 border-amber-100 text-amber-800',
};

const iconColors = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-amber-500',
};
</script>

<template>
  <div 
    class="flex items-center gap-3 p-4 rounded-xl border shadow-lg max-w-sm pointer-events-auto"
    :class="variants[toast.type]"
    role="alert"
  >
    <div class="shrink-0" :class="iconColors[toast.type]">
      <component :is="icons[toast.type]" class="h-5 w-5" />
    </div>
    
    <div class="flex-1 text-sm font-medium">
      {{ toast.message }}
    </div>

    <button 
      @click="emit('close')"
      class="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
    >
      <X class="h-4 w-4" />
    </button>
  </div>
</template>
