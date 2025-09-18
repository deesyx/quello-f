<template>
    <div class="chart-card">
      <div ref="container"></div>
    </div>
</template>


<script setup lang="js" name="home">
import { onMounted, onUnmounted, ref } from 'vue';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

import { renderColumnChart } from '@/stores/graph';

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { issuesByGroup } = storeToRefs(dataStore);

let chart;
const container = ref(null);
import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight } = storeToRefs(toolStore);
onMounted(() => {
    chart = renderColumnChart(container.value, issuesByGroup.value, "报告人组分布", isLight.value);
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

function onClick() {
  updateBarChart(chart);
}

// 更新条形图的数据
function updateBarChart(chart) {
  // 确保图表存在
  if (!chart) return;
  
  // 获得 Interval Mark
  const interval = chart.getNodesByType('interval')[0];

  // 模拟并且更新 Interval 的数据
  const newData = interval.data().map((d) => ({
    ...d,
    sold: Math.random() * 400 + 100,
  }));

  interval.data(newData);

  // 重新渲染
  chart.render();
}


</script>

<style scoped>
@import "@/assets/chart.css";
</style>