<template>
    <div class="chart-card">
      <div v-if="!isLoading" ref="container"></div>
      <div v-else>数据加载中...</div>
    </div>
</template>


<script setup lang="js" name="home">
import { onMounted, onUnmounted, ref } from 'vue';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

import { renderHorizontalBarChart } from '@/stores/graph';

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { prodModule, isLoading } = storeToRefs(dataStore);

import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight } = storeToRefs(toolStore);

let chart;
const container = ref(null);

// onMounted(() => {
//     chart = renderHorizontalBarChart(container.value, prodModule.value, "产品模块分布", isLight.value);
// });

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


watch([prodModule, container], ([newValue, newContainer]) => {
    // console.log('Watcher triggered:', { newSeverity, newContainer });
    
    if (newContainer && newValue && typeof newValue === 'object' && Object.keys(newValue).length > 0) {
        try {
            if (chart) {
                chart.destroy();
            }
            chart = renderHorizontalBarChart(newContainer, newValue, "产品模块分布", isLight.value);
        } catch (error) {
            console.error('图表渲染错误:', error);
        }
    }
}, { flush: 'post' }); // Post ensures DOM is updated



</script>

<style scoped>
@import "@/assets/chart.css";
</style>