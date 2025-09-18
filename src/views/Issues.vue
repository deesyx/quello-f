<template>
  <main>
    开发中...
    <button @click="getData">测试</button>
    <IssueTable/>
  </main>
</template>

<script setup lang="ts" name="home">
import { useDataStore } from '@/stores/data';
function getData() {
  const dataStore = useDataStore();
  dataStore.getPageData();
}
import IssueTable from '@/components/chart/IssueTable.vue';

</script>

<style lang="scss" scoped>
@import "@/assets/chart.css";

main {
  width: 100%;
  padding: 60px;
  // display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  // gap: 40px;
  box-sizing: border-box;
  // overflow-y: auto;
  max-height: calc(100vh - 60px);
}

// .chart-card {
//   background: #1E1F25;
//   border-radius: 8px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//   padding: 20px;
//   min-width: 350px;
//   overflow: hidden;
//   height: 100%;
// }

// .chart-card h3 {
//   margin-bottom: 20px;
//   text-align: center;
//   flex-shrink: 0;
//   color: #fff;
// }

:deep(.g2-container) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.g2-container svg) {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: block;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: var(--link-color);
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}

button:hover {
  background-color: var(--link-color-hover);
}
</style>