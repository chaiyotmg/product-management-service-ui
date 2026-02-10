<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

import type { BaseModalProps } from '@/types';

const props = defineProps<BaseModalProps>();
const emit = defineEmits(['close']);

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    emit('close');
  }
};

watch(() => props.show, (isShown) => {
  if (isShown) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, { immediate: true });

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40" @click="$emit('close')"></div>
    </Transition>

    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-full sm:max-h-[90vh]">
          <div v-if="title" class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="text-lg font-semibold text-slate-800">{{ title }}</h3>
            <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors">
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-6 py-6 overflow-y-auto min-h-0 flex-1">
            <slot />
          </div>
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
