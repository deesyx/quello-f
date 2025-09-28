<template>
  <!-- <div class="stat-item"> -->
    <div class="chart-card">
      <div v-if="!isLoading" ref="container"></div>
      <div v-else>数据加载中...</div>
      <!-- <button @click="onClick">更新数据</button> -->
    </div>
  <!-- </div> -->
</template>


<script setup lang="js" name="home">

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { status, isLoading } = storeToRefs(dataStore);

import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { renderRingChart } from '@/stores/graph';

import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight } = storeToRefs(toolStore);

let chart;
const container = ref(null);

// onMounted(async () => {
//   // console.log('子组件加载。。。');
//   // await dataStore.getDashbaordData();
//   // console.log('status:', status.value, container.value);
//   chart = renderRingChart(container.value, status.value, "状态分布", isLight.value);
// });

onUnmounted(() => {
  // console.log('子组件销毁。。。');
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


// 注释：搞了半天原来是因为DOM未更新导致container为null，图表无法渲染
watch([status, container], ([newStatus, newContainer]) => {
    console.log('Watcher triggered:', { newStatus, newContainer });
    
    if (newContainer && newStatus && Object.keys(newStatus).length > 0) {
        try {
            if (chart) {
                chart.destroy();
            }
            chart = renderRingChart(newContainer, newStatus, "状态分布", isLight.value);
            console.log('绘制状态分布图。。。');
        } catch (error) {
            console.error('图表渲染错误:', error);
        }
    }
}, { flush: 'post' }); // Post ensures DOM is updated


</script>

<style scoped>
@import "@/assets/chart.css";
</style>