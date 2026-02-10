<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';
import { BaseModal, BaseButton } from '@/components/atoms';
import type { AlertModalProps } from '@/types';

withDefaults(defineProps<AlertModalProps>(), {
  title: 'Notification',
  buttonLabel: 'Understand'
});

defineEmits(['close']);
</script>

<template>
  <BaseModal :show="show" :title="title" @close="$emit('close')">
    <div class="flex items-start gap-4">
      <div class="shrink-0 w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
        <AlertCircle class="h-5 w-5" />
      </div>
      <div class="flex-1">
        <p class="text-sm text-slate-600 leading-relaxed">{{ message }}</p>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="primary" @click="$emit('close')">
        {{ buttonLabel }}
      </BaseButton>
    </template>
  </BaseModal>
</template>
