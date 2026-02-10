<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Plus } from 'lucide-vue-next';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '@/services';
import type { Product, Pagination, ApiError } from '@/types';
import { BaseButton, BaseModal } from '@/components/atoms';
import { SearchInput, ConfirmModal } from '@/components/molecules';
import { ProductForm, ProductTable } from '@/components/organisms';
import { useToastStore } from '@/stores/toast';

const toastStore = useToastStore();
const products = ref<Product[]>([]);
const loading = ref<boolean>(false);
const submitLoading = ref<boolean>(false);
const searchQuery = ref<string>('');
const lastSearchedTerm = ref<string>('');
const pagination = ref<Pagination | null>(null);
const currentPage = ref<number>(1);
let searchTimer: ReturnType<typeof setTimeout> | null = null;
const showFormModal = ref<boolean>(false);
const editingProduct = ref<Product | null>(null);
const confirmState = ref<{ show: boolean; id: string; message: string; loading: boolean }>({ show: false, id: '', message: '', loading: false });
const showAlert = (message: string) => {
  toastStore.error(message);
};

const handleApiError = (error: unknown, defaultMessage: string) => {
  const apiError = error as ApiError;
  if (apiError.message === 'Validation Error' && apiError.errors && Array.isArray(apiError.errors)) {
    const messages = apiError.errors.map((e) => e.message).join(', ');
    showAlert(messages);
  } else {
    showAlert(apiError.message || defaultMessage);
  }
};

const showConfirm = (id: string, message: string) => {
  confirmState.value = { show: true, id, message, loading: false };
};

const loadProducts = async (
  page = currentPage.value,
  limit = 10,
  search = searchQuery.value.trim()
) => {
  loading.value = true;
  try {
    const params: Record<string, string | number> = {
      page,
      limit
    };

    if (search.length > 0) {
      params.search = search;
    }

    const response = await fetchProducts(params);
    products.value = response.data;
    pagination.value = response.pagination || null;
    currentPage.value = page;
    lastSearchedTerm.value = search;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  if (searchTimer) {
    clearTimeout(searchTimer);
    searchTimer = null;
  }
  const searchVal = searchQuery.value.trim();
  if (searchVal.length > 0 || lastSearchedTerm.value.length > 0) {
    loadProducts(1, 10, searchVal);
  }
};


const openEditModal = (product: Product) => {
  editingProduct.value = product;
  showFormModal.value = true;
};

const handleSubmit = async (data: Partial<Product>) => {
  submitLoading.value = true;
  try {
    if (editingProduct.value) {
      await updateProduct(editingProduct.value._id, data);
    } else {
      await createProduct(data);
    }
    showFormModal.value = false;
    toastStore.success(editingProduct.value ? 'Product updated' : 'Product created');
    loadProducts();
  } catch (error) {
    showFormModal.value = false;
    handleApiError(error, 'Failed to save product');
  } finally {
    submitLoading.value = false;
  }
};

const confirmDelete = async () => {
  if (!confirmState.value.id) return;
  confirmState.value.loading = true;
  try {
    await deleteProduct(confirmState.value.id);
    confirmState.value.show = false;
    toastStore.success('Product deleted');
    loadProducts();
  } catch (error) {
    confirmState.value.show = false;
    showAlert((error as ApiError).message || 'Failed to delete product');
  } finally {
    confirmState.value.loading = false;
  }
};

const handleDelete = (id: string) => {
  showConfirm(id, 'Are you sure you want to delete this product? This action cannot be undone.');
};

onMounted(loadProducts);

watch(searchQuery, () => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    handleSearch();
  }, 1000);
});


</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Products</h2>
      </div>
          <BaseButton 
            @click="showFormModal = true" 
            class="w-full sm:w-auto"
            :left-icon="Plus"
          >
            Add Product
          </BaseButton>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-start gap-3">
        <div class="flex items-center gap-2 w-full max-w-sm">
          <SearchInput v-model="searchQuery" @search="handleSearch" placeholder="Search products..." />
          <BaseButton variant="outline" @click="handleSearch" class="h-10">
            Search
          </BaseButton>
        </div>
      </div>

      <!-- Loading Progress Bar -->
      <div class="h-0.5 w-full bg-slate-50 overflow-hidden relative">
        <div 
          v-if="loading" 
          class="absolute inset-0 bg-primary-500 animate-progress origin-left"
        ></div>
      </div>

      <ProductTable 
        :products="products" 
        :loading="loading" 
        :current-page="currentPage" 
        @edit="openEditModal" 
        @delete="handleDelete" 
      />

      <div v-if="pagination && pagination.totalPages >= 1" class="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-slate-500">
          Showing page {{ pagination.page }} of {{ pagination.totalPages }}
        </p>
        <div class="flex items-center gap-1">
          <BaseButton 
            variant="outline" size="sm" 
            :disabled="currentPage === 1"
            @click="loadProducts(currentPage - 1)"
            class="px-2"
          >
            Prev
          </BaseButton>
          
          <div class="flex items-center gap-1 px-2">
            <BaseButton
              v-for="p in pagination.totalPages"
              :key="p"
              :variant="currentPage === p ? 'primary' : 'ghost'"
              size="sm"
              @click="loadProducts(p)"
              class="w-8 h-8 p-0"
            >
              {{ p }}
            </BaseButton>
          </div>

          <BaseButton 
            variant="outline" size="sm" 
            :disabled="currentPage === (pagination?.totalPages || 1)"
            @click="loadProducts(currentPage + 1)"
            class="px-2"
          >
            Next
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <BaseModal
      :show="showFormModal"
      :title="editingProduct ? 'Edit Product' : 'Add New Product'"
      @close="showFormModal = false"
    >
      <ProductForm
        :initial-data="editingProduct || {}"
        :loading="submitLoading"
        @submit="handleSubmit"
        @cancel="showFormModal = false"
      />
    </BaseModal>

    <!-- Confirmation Modal -->
    <ConfirmModal
      :show="confirmState.show"
      title="Delete Product"
      :message="confirmState.message"
      :loading="confirmState.loading"
      @close="confirmState.show = false"
      @confirm="confirmDelete"
    />
  </div>
</template>
