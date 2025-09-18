<template>
    <div class="chart-card">
      <div ref="container"></div>
    </div>
</template>


<script setup lang="js" name="home">
import { onMounted, onUnmounted, ref } from 'vue';
import { Chart } from '@antv/g2';

let chart;
const container = ref(null);

onMounted(() => {
    chart = renderRadarChart(container.value);
});

onUnmounted(() => {
    // 添加检查确保图表存在再销毁
    if (chart) {
        chart.destroy();
        chart = null;
    }
});

import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight } = storeToRefs(toolStore);
watch(isLight, () => {
  if (chart) {
    chart.options({
      theme: isLight.value ? 'light' : 'dark',
    });
    chart.render();
  }
});
// 渲染雷达图
function renderRadarChart(container) {
  const data = [
    { item: 'Design', type: 'a', score: 70 },
    { item: 'Design', type: 'b', score: 30 },
    { item: 'Development', type: 'a', score: 60 },
    { item: 'Development', type: 'b', score: 70 },
    { item: 'Marketing', type: 'a', score: 50 },
    { item: 'Marketing', type: 'b', score: 60 },
    { item: 'Users', type: 'a', score: 40 },
    { item: 'Users', type: 'b', score: 50 },
    { item: 'Test', type: 'a', score: 60 },
    { item: 'Test', type: 'b', score: 70 },
    { item: 'Language', type: 'a', score: 70 },
    { item: 'Language', type: 'b', score: 50 },
    { item: 'Technology', type: 'a', score: 50 },
    { item: 'Technology', type: 'b', score: 40 },
    { item: 'Support', type: 'a', score: 30 },
    { item: 'Support', type: 'b', score: 40 },
    { item: 'Sales', type: 'a', score: 60 },
    { item: 'Sales', type: 'b', score: 40 },
    { item: 'UX', type: 'a', score: 50 },
    { item: 'UX', type: 'b', score: 60 },
  ];

  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.coordinate({ type: 'polar' });

  chart
    .title({
        title: '雷达图',
        subtitle: '副标题',
    })
    .theme({type: isLight.value ? 'light' : 'dark'}) // Apply dark theme.
    .data(data)
    .scale('x', { padding: 0.5, align: 0 })
    .scale('y', { tickCount: 5, domainMax: 80 })
    .axis('x', {
      grid: true,
      gridLineWidth: 1,
      tick: false,
      gridLineDash: [0, 0],
    })
    .axis('y', {
      zIndex: 1,
      title: false,
      gridConnect: 'line',
      gridLineWidth: 1,
      gridLineDash: [0, 0],
    });

  chart
    .area()
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .style('fillOpacity', 0.5);

  chart
    .line()
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .style('lineWidth', 2);

  chart
    .point()
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .encode('shape', 'point')
    .encode('size', 3)
    .tooltip(null);

  chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });

  chart.render();

  return chart;
}



</script>

<style scoped>
@import "@/assets/chart.css";
</style>