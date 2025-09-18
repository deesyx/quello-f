<template>
    <div class="chart-card">
      <div ref="container"></div>
    </div>
</template>


<script setup lang="js" name="home">
import { onMounted, onUnmounted, ref } from 'vue';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

import { renderHorizontalBarChart } from '@/stores/graph';

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { prodModule } = storeToRefs(dataStore);

import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight } = storeToRefs(toolStore);

let chart;
const container = ref(null);

onMounted(() => {
    chart = renderHorizontalBarChart(container.value, prodModule.value, "产品模块分布", isLight.value);
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

</script>

<style scoped>
@import "@/assets/chart.css";
</style>