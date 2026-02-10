<script setup lang="ts">
import { watch } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { categorySchema } from '@/types';
import { BaseInput, BaseButton } from '@/components/atoms';
import type { CategoryFormProps } from '@/types';

const props = defineProps<CategoryFormProps>();
const emit = defineEmits(['submit', 'cancel']);

const schema = toTypedSchema(categorySchema);

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: props.initialData || { name: '', description: '' },
});

const [name, nameProps] = defineField('name');
const [description, descriptionProps] = defineField('description');

watch(() => props.initialData, (newData) => {
  if (newData) resetForm({ values: newData });
}, { deep: true });

const onSubmit = handleSubmit((values) => {
  emit('submit', values);
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <BaseInput
      v-model="name"
      v-bind="nameProps"
      label="Category Name"
      placeholder="Category Name ..."
      :error="errors.name"
    />
    
    <BaseInput
      v-model="description"
      v-bind="descriptionProps"
      label="Description (Optional)"
      placeholder="Description ..."
      :error="errors.description"
    />

    <div class="pt-2 flex justify-end gap-3">
      <slot name="actions" :loading="loading">
        <BaseButton 
          type="button" 
          variant="outline" 
          @click="$emit('cancel', $event)"
        >
          Cancel
        </BaseButton>
        <BaseButton 
          type="submit" 
          variant="primary" 
          :loading="loading"
          class="min-w-[100px]"
        >
          Save Category
        </BaseButton>
      </slot>
    </div>
  </form>
</template>
