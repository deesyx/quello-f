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

import { onMounted, onUnmounted, ref } from 'vue';
import { renderRingChart } from '@/stores/graph';

import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight } = storeToRefs(toolStore);

let chart;
const container = ref(null);

onMounted(() => {
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
</script>

<style scoped>
@import "@/assets/chart.css";
</style>