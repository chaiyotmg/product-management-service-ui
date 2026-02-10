<script setup lang="ts">
import { useToastStore } from '@/stores/toast';
import BaseToast from '../atoms/BaseToast.vue';

const toastStore = useToastStore();
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none min-w-[320px]">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-12 scale-95"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition-all duration-300 ease-in absolute"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 translate-x-12 scale-95"
        move-class="transition-all duration-300"
      >
        <BaseToast 
          v-for="toast in toastStore.toasts" 
          :key="toast.id" 
          :toast="toast"
          @close="toastStore.remove(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>
