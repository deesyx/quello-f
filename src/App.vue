<template>
  <div class="app-layout">
    <!-- Sidebar Navigation -->
    <aside class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="brand-area" v-if="!isSidebarCollapsed">
          <img class="logo" src="@/assets/images/方块.svg" alt="Logo">
          <span>GUX数据看板</span>
        </div>
        <button class="toggle-btn" @click="toggleSidebar">
          <svg v-if="isSidebarCollapsed" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <nav class="nav-menu">
        <RouterLink to="/" class="nav-link" @click="handleMobileNavigation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">数据看板</span>
        </RouterLink>
        <RouterLink to="/issues" class="nav-link" @click="handleMobileNavigation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">问题管理</span>
        </RouterLink>
        <!-- <RouterLink to="/dashboard" class="nav-link" @click="handleMobileNavigation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12H3M12 3V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">数据看板</span>
        </RouterLink> -->
        <RouterLink to="/analysis" class="nav-link" @click="handleMobileNavigation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">分析报告</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="main-wrapper">
      <header class="darkheader">
        <div class="header-content">
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div>
            {{ $route.name }}
          </div>
          <div class="theme-toggle">
            <a href="#" @click="toggleMode">
              <div class="user-img-box" v-if="mode">
                <img src="@/assets/images/darkmode3.svg" alt="user-img">
              </div>
              <div class="user-img-box" v-else>
                <img src="@/assets/images/lightmode2.svg" alt="user-img">
              </div>
            </a>
          </div>
        </div>
      </header>
      
      <main class="content-area">
        <!-- 页面内容区 -->
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useToolStore } from '@/stores/util';
import { onMounted, ref, onBeforeUnmount } from 'vue';

const toolStore = useToolStore();
const { mode } = storeToRefs(toolStore);

// Sidebar state
const isSidebarCollapsed = ref(false);
const isMobileMenuOpen = ref(false);

onMounted(() => {
  toolStore.applyTheme();
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

function toggleMode() {
  toolStore.toggleMode();
}

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  isSidebarCollapsed.value = !isMobileMenuOpen.value;
}

function handleMobileNavigation() {
  if (window.innerWidth <= 768) {
    isMobileMenuOpen.value = false;
    isSidebarCollapsed.value = true;
  }
}

function checkScreenSize() {
  if (window.innerWidth <= 768) {
    isSidebarCollapsed.value = true;
  } else {
    isSidebarCollapsed.value = false;
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background-color: var(--nav-bg);
  height: 100%;
  transition: all 0.3s ease;
  border-right: 1px solid var(--dt-border);
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  border-bottom: 1px solid var(--dt-border);
}

.sidebar-header .brand-area {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.sidebar-header .logo {
  width: 32px;
  height: 32px;
}

.sidebar-header span {
  font-weight: bold;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  padding: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.nav-menu {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  flex-grow: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.2s;
  overflow: hidden;
}

.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.nav-link.router-link-exact-active {
  background-color: rgba(80, 70, 228, 0.1);
  color: var(--link-color);
  border-left: 4px solid var(--link-color);
}

.nav-link span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

header.darkheader {
  padding: 0;
  border-bottom: 1px solid var(--dt-border);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  padding: 5px;
}

.theme-toggle {
  margin-left: auto;
}

.user-img-box { 
  width: 36px;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: var(--page-bg-color);
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  .sidebar.collapsed {
    transform: translateX(-100%);
  }

  .mobile-menu-btn {
    display: block;
  }

  .content-area {
    padding: 15px;
  }
}
</style>