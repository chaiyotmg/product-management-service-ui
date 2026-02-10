<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { productSchema } from '@/types';
import { BaseInput, BaseSelect, BaseButton } from '@/components/atoms';
import { fetchCategories } from '@/services';
import type { Category, ProductFormProps } from '@/types';

const props = defineProps<ProductFormProps>();
const emit = defineEmits(['submit', 'cancel']);

const categories = ref<Category[]>([]);
const categoriesLoading = ref(false);

const schema = toTypedSchema(productSchema);

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: props.initialData?.name || '',
    description: props.initialData?.description || '',
    price: props.initialData?.price || 0,
    stock: props.initialData?.stock || 0,
    categoryId: (typeof props.initialData?.categoryId === 'object' ? props.initialData.categoryId._id : props.initialData?.categoryId) || '',
  },
});

const [name, nameProps] = defineField('name');
const [description, descriptionProps] = defineField('description');
const [price, priceProps] = defineField('price');
const [stock, stockProps] = defineField('stock');
const [categoryId, categoryIdProps] = defineField('categoryId');

const loadCategories = async () => {
  categoriesLoading.value = true;
  try {
    const response = await fetchCategories({ page: 1, limit: 10 });
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to load categories:', error);
  } finally {
    categoriesLoading.value = false;
  }
};

watch(() => props.initialData, (newData) => {
  if (newData) {
    resetForm({
      values: {
        name: newData.name || '',
        description: newData.description || '',
        price: newData.price || 0,
        stock: newData.stock || 0,
        categoryId: (typeof newData.categoryId === 'object' ? newData.categoryId._id : newData.categoryId) || '',
      }
    });
  }
}, { deep: true });

const onSubmit = handleSubmit((values) => {
  emit('submit', values);
});

onMounted(loadCategories);
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <BaseInput
      v-if="props.initialData?._id"
      :model-value="props.initialData.sku"
      label="SKU"
      disabled
      description="SKU cannot be edited."
    />
    <BaseInput
      v-model="name"
      v-bind="nameProps"
      label="Product Name"
      placeholder="Product Name ..."
      :error="errors.name"
    />

    <BaseSelect
      v-model="categoryId"
      v-bind="categoryIdProps"
      label="Category"
      placeholder="Select a category"
      :options="categories.map(c => ({ label: c.name, value: c._id }))"
      :error="errors.categoryId"
    />

    <div class="grid grid-cols-2 gap-4">
      <BaseInput
        v-model.number="price"
        v-bind="priceProps"
        type="number"
        label="Price (THB)"
        placeholder="0.00"
        :error="errors.price"
      />
      <BaseInput
        v-model.number="stock"
        v-bind="stockProps"
        type="number"
        label="Stock"
        placeholder="0"
        :error="errors.stock"
      />
    </div>

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
          Save Product
        </BaseButton>
      </slot>
    </div>
  </form>
</template>
