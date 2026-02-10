<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next';
import { BaseModal, BaseButton } from '@/components/atoms';
import type { ConfirmModalProps } from '@/types';

withDefaults(defineProps<ConfirmModalProps>(), {
  title: 'Confirm Action',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'danger',
  loading: false
});

defineEmits(['close', 'confirm']);
</script>

<template>
  <BaseModal :show="show" :title="title" @close="$emit('close')">
    <div class="flex items-start gap-4">
      <div 
        class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
        :class="{
          'bg-red-50 text-red-600': variant === 'danger',
          'bg-amber-50 text-amber-600': variant === 'warning',
          'bg-blue-50 text-blue-600': variant === 'info'
        }"
      >
        <AlertTriangle class="h-5 w-5" />
      </div>
      <div class="flex-1">
        <p class="text-sm text-slate-600">{{ message }}</p>
      </div>
    </div>

    <template #footer>
      <BaseButton 
        variant="outline" 
        @click="$emit('close')"
      >
        {{ cancelLabel }}
      </BaseButton>
      <BaseButton 
        :variant="variant === 'danger' ? 'danger' : 'primary'" 
        @click="$emit('confirm')"
        :loading="loading"
      >
        {{ confirmLabel }}
      </BaseButton>
    </template>
  </BaseModal>
</template>
