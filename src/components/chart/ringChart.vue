<template>
  <!-- <div class="stat-item"> -->
    <div class="chart-card">
      <div ref="container"></div>
      <!-- <button @click="onClick">更新数据</button> -->
    </div>
  <!-- </div> -->
</template>


<script setup lang="js" name="home">

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { status } = storeToRefs(dataStore);

import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { renderRingChart } from '@/stores/graph';

import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight } = storeToRefs(toolStore);

let chart;
const container = ref(null);

onBeforeMount(async () => {
  console.log('子组件加载。。。');
  // await dataStore.getDashbaordData();
  // console.log('status:', dataStore.status);
  chart = renderRingChart(container.value, status.value, "状态分布", isLight.value);
});

onUnmounted(() => {
    // 添加检查确保图表存在再销毁
    if (chart) {
        chart.destroy();
        chart = null;
    }
});


watch(isLight, () => {
  if (chart) {
    chart.options({
      theme: isLight.value ? 'light' : 'dark',
    });
    chart.render();
  }
});

// watch(data, () => {
//   if (chart) {
//     chart.destroy();
//     chart = null;
//     chart = renderRingChart(container.value, data.status, "状态分布", isLight.value);
//   }
// });

// Watch for changes in status specifically
watch(
  () => status,
  (newStatus) => {
    console.log('这是监听status的方法:', newStatus.value);
    if (chart && newStatus) {
      chart.destroy();
      chart = null;
      chart = renderRingChart(container.value, newStatus.value, "状态分布", isLight.value);
    }
  },
  { immediate: true } // Trigger immediately on mount
);
</script>

<style scoped>
@import "@/assets/chart.css";
</style>