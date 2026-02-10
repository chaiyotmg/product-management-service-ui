<script setup lang="ts">
import { Boxes, Package, Tag, Menu, X } from 'lucide-vue-next';
import { ref, type Ref, type Component } from 'vue';
import { ToastContainer } from '@/components/molecules';

const isMobileMenuOpen:Ref<boolean> = ref(false);

const navItems: { name: string; href: string; icon: Component }[] = [
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Categories', href: '/categories', icon: Tag },
];

const APP_NAME: string = "Product Management";

</script>

<template>
  <div class="min-h-screen flex bg-slate-50">
    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex w-64 flex-col fixed inset-y-0 bg-white border-r border-slate-200">
      <div class="p-6 flex items-center gap-3">
        <Boxes class="w-9 h-9"/>
        <h1 class="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          {{ APP_NAME }}
        </h1>
      </div>
      
      <nav class="flex-1 px-4 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          v-slot="{ isActive }"
          class="flex"
        >
          <span
            class="group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all w-full gap-3"
            :class="isActive 
              ? 'bg-primary-50 text-primary-700 shadow-sm shadow-primary-100' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
          >
            <component :is="item.icon" class="h-5 w-5" :class="isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'" />
            {{ item.name }}
          </span>
        </router-link>
      </nav>
    </aside>

    <!-- Mobile Header -->
    <header class="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 px-4 h-16 flex items-center gap-3 z-30">
      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
        <component :is="isMobileMenuOpen ? X : Menu" class="h-6 w-6" />
      </button>
      <div class="flex items-center gap-2">
        <Boxes class="w-7 h-7"/>
        <h1 class="text-lg font-bold text-slate-900">{{ APP_NAME }}</h1>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <div class="fixed inset-0 z-40 md:hidden overflow-hidden" :class="{ 'pointer-events-none': !isMobileMenuOpen }">
        <!-- Overlay backdrop -->
        <Transition
          enter-active-class="transition-opacity ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="isMobileMenuOpen" class="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" @click="isMobileMenuOpen = false"></div>
        </Transition>

        <!-- Sidebar panel -->
        <Transition
          enter-active-class="transition-transform ease-out duration-300"
          enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform ease-in duration-200"
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-full"
        >
          <nav v-if="isMobileMenuOpen" class="relative w-72 h-full bg-white flex flex-col p-6 shadow-2xl">
            <!-- Close Button Inside Sidebar -->
            <button 
              @click="isMobileMenuOpen = false" 
              class="absolute top-4 right-4 p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <X class="h-6 w-6" />
            </button>

            <!-- Logo Area in Mobile Menu -->
            <div class="flex items-center gap-3 mb-8">
              <Boxes class="w-8 h-8"/>
              <span class="text-xl font-bold text-slate-900">{{ APP_NAME }}</span>
            </div>

            <div class="flex flex-col gap-2">
              <router-link
                v-for="item in navItems"
                :key="item.href"
                :to="item.href"
                v-slot="{ isActive }"
                class="flex"
                @click="isMobileMenuOpen = false"
              >
                <span
                  class="flex items-center px-4 py-4 text-base font-semibold rounded-xl w-full gap-4 transition-all"
                  :class="isActive 
                    ? 'bg-primary-50 text-primary-700 shadow-sm shadow-primary-100' 
                    : 'text-slate-600 hover:bg-slate-50'"
                >
                  <component :is="item.icon" class="h-6 w-6" :class="isActive ? 'text-primary-600' : 'text-slate-400'" />
                  {{ item.name }}
                </span>
              </router-link>
            </div>
          </nav>
        </Transition>
      </div>
    </Teleport>

    <!-- Main Content -->
    <main class="flex-1 md:ml-64 pt-16 md:pt-0 min-w-0">
      <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </main>
    <ToastContainer />
  </div>
</template>
