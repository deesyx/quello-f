<template>
  <div class="app-layout">
    <!-- Sidebar Navigation -->
    <aside class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="brand-area" v-if="!isSidebarCollapsed">
          <img class="logo" src="@/assets/images/Logo.svg" alt="Logo">
          <span>GUX数据展示</span>
        </div>
        <button class="toggle-btn" @click="toggleSidebar">
          <!-- <svg v-if="isSidebarCollapsed" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> -->
          <!-- <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> -->
          <img v-if="isSidebarCollapsed" width="20" height="20"  src="@/assets/images/toggle.svg" alt="toggle">
          <img v-else width="20" height="20"  src="@/assets/images/toggle.svg" alt="toggle">
        </button>
      </div>
      
      <nav class="nav-menu">
        <RouterLink to="/" class="nav-link" @click="handleMobileNavigation">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <g><rect x="0" y="0" width="24" height="24" rx="0" fill="currentColor" fill-opacity="0" style="mix-blend-mode:passthrough"/><g transform="matrix(1,0,0,-1,0,40)"><path d="M4,28Q4.03125,30.1875,5.0625,32Q6.125,33.8125,8,34.9375Q9.90625,36,12,36Q14.09375,36,16,34.9375Q17.875,33.8125,18.9375,32Q19.96875,30.1875,20,28Q19.96875,25.8125,18.9375,24Q17.875,22.1875,16,21.0625Q14.09375,20,12,20Q9.90625,20,8,21.0625Q6.125,22.1875,5.0625,24Q4.03125,25.8125,4,28ZM14,25Q14,25.625,13.65625,26.125Q13.3125,26.625,12.75,26.84375L12.75,33.25Q12.6875,33.9375,12,34Q11.3125,33.9375,11.25,33.25L11.25,26.84375Q10.6875,26.625,10.34375,26.125Q10,25.625,10,25Q10.03125,24.15625,10.59375,23.59375Q11.15625,23.03125,12,23Q12.84375,23.03125,13.40625,23.59375Q13.96875,24.15625,14,25ZM8.5,30.5Q8.9375,30.5,9.21875,30.78125Q9.5,31.0625,9.5,31.5Q9.5,31.9375,9.21875,32.21875Q8.9375,32.5,8.5,32.5Q8.0625,32.5,7.78125,32.21875Q7.5,31.9375,7.5,31.5Q7.5,31.0625,7.78125,30.78125Q8.0625,30.5,8.5,30.5ZM8,28Q8,28.4375,7.71875,28.71875Q7.4375,29,7,29Q6.5625,29,6.28125,28.71875Q6,28.4375,6,28Q6,27.5625,6.28125,27.28125Q6.5625,27,7,27Q7.4375,27,7.71875,27.28125Q8,27.5625,8,28ZM17,27Q17.4375,27,17.71875,27.28125Q18,27.5625,18,28Q18,28.4375,17.71875,28.71875Q17.4375,29,17,29Q16.5625,29,16.28125,28.71875Q16,28.4375,16,28Q16,27.5625,16.28125,27.28125Q16.5625,27,17,27ZM16.5,31.5Q16.5,31.9375,16.21875,32.21875Q15.9375,32.5,15.5,32.5Q15.0625,32.5,14.78125,32.21875Q14.5,31.9375,14.5,31.5Q14.5,31.0625,14.78125,30.78125Q15.0625,30.5,15.5,30.5Q15.9375,30.5,16.21875,30.78125Q16.5,31.0625,16.5,31.5Z" fill="currentColor" fill-opacity="1" style="mix-blend-mode:passthrough"/></g></g>
            </svg>
          </div>
          <span v-if="!isSidebarCollapsed">数据看板</span>
        </RouterLink>
        <RouterLink to="/issues" class="nav-link" @click="handleMobileNavigation">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="master_svg0_2_12849"><rect x="5" y="4" width="14" height="16" rx="0"/></clipPath></defs>
              <g><rect x="0" y="0" width="24" height="24" rx="0" fill="currentColor" fill-opacity="0" style="mix-blend-mode:passthrough"/><g clip-path="url(#master_svg0_2_12849)"><g transform="matrix(1,0,0,-1,0,40.6875)"><g><path d="M12,28.34375Q13.09375,28.34375,14,28.875Q14.90625,29.40625,15.46875,30.34375Q16,31.28125,16,32.34375Q16,33.40625,15.46875,34.34375Q14.90625,35.28125,14,35.8125Q13.09375,36.34375,12,36.34375Q10.90625,36.34375,10,35.8125Q9.09375,35.28125,8.53125,34.34375Q8,33.40625,8,32.34375Q8,31.28125,8.53125,30.34375Q9.09375,29.40625,10,28.875Q10.90625,28.34375,12,28.34375ZM10.5625,26.84375Q8.21875,26.78125,6.625,25.21875Q5.0625,23.625,5,21.28125Q5,20.875,5.28125,20.625Q5.53125,20.34375,5.9375,20.34375L18.0625,20.34375Q18.46875,20.34375,18.71875,20.625Q19,20.875,19,21.28125Q18.9375,23.625,17.375,25.21875Q15.78125,26.78125,13.4375,26.84375L10.5625,26.84375Z" fill="currentColor" fill-opacity="1" style="mix-blend-mode:passthrough"/></g></g></g></g>
            </svg>
          </div>
          <span v-if="!isSidebarCollapsed">问题管理</span>
        </RouterLink>
        <!-- <RouterLink to="/dashboard" class="nav-link" @click="handleMobileNavigation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12H3M12 3V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="!isSidebarCollapsed">数据看板</span>
        </RouterLink> -->
        <RouterLink to="/analysis" class="nav-link" @click="handleMobileNavigation">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <g><rect x="0" y="0" width="24" height="24" rx="0" fill="currentColor" fill-opacity="0" style="mix-blend-mode:passthrough"/><g transform="matrix(1,0,0,-1,0,40)"><path d="M12.0313654,28.5L12.0313654,35.46875L12.0313654,28.5L12.0313654,35.46875Q12.0627308,35.9375,12.5332098,36Q14.509225,35.96875,16.077491000000002,35.03125Q17.677121,34.125,18.586716,32.53125Q19.527676,30.96875,19.55904,29Q19.496309,28.53125,19.025829,28.5L12.0313654,28.5ZM3.5,27.5Q3.562730625,30.40625,5.3819188,32.4375Q7.1697416,34.5,9.9926195,34.9375Q10.4630995,34.9375,10.525830299999999,34.4375L10.525830299999999,27L15.450184,22.09375Q15.763837,21.71875,15.387453,21.375Q13.505535,20.03125,11.027675200000001,20Q8.926199,20.03125,7.2324722,21.03125Q5.5387454,22.03125,4.5350553,23.71875Q3.531365313,25.40625,3.5,27.5ZM19.998154,27Q20.5,26.9375,20.5,26.46875Q20.092251,23.78125,18.178967,22.03125Q17.833948,21.75,17.520295,22.03125L12.5332098,27L19.998154,27Z" fill="currentColor" fill-opacity="1" style="mix-blend-mode:passthrough"/></g></g>
            </svg>
          </div>
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
                <img src="@/assets/images/moon.svg" alt="user-img">
              </div>
              <div class="user-img-box" v-else>
                <img src="@/assets/images/sun.svg" alt="user-img">
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
  toolStore.loadFromLocalStorage(); 
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
  // border-right: 1px solid var(--dt-border);
  display: flex;
  flex-direction: column;
  z-index: 100;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.1),0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 15px;
  border-bottom: 1px solid var(--dt-border);
  height: 80px;
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
  font-size: 16px;
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
  img {
    width: 24px;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  text-decoration: none;
  color: var(--nav-link-color);
  transition: all 0.2s;
  overflow: hidden;
  border-radius: 4px;
  margin-left:12px;
  margin-right:12px;
  margin-bottom: 8px;
  // Prevent flex shrink
  flex-shrink: 0;
  .nav-link svg {
    width: 24px !important;
    height: 24px !important;
    flex-shrink: 0;
    min-width: 24px;
  }
}
// When sidebar is collapsed, remove gap and center content
.sidebar.collapsed .nav-link {
  justify-content: center;
  gap: 0;
}
.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.nav-link.router-link-exact-active {
  background-color: var(--link-color);
  color: var(--nav-link-hover);
  // width: 90%;
  // border-left: 20px solid;
  border-radius: 4px;
  margin-left:12px;
  margin-right:12px;
}

.nav-link span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon-wrapper {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 15px 28px;
  height: 80px;
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
  width: 24px;
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