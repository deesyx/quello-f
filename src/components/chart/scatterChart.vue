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
    chart = renderScatterChart(container.value);
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

// 渲染散点图
function renderScatterChart(container) {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 360,
  });

  // 准备数据
  const data = [
    { x: 10, y: 20 },
    { x: 15, y: 35 },
    { x: 20, y: 30 },
    { x: 25, y: 50 },
    { x: 30, y: 45 }
  ];

  // 声明可视化
  chart.options({
    theme: isLight.value ? 'light' : 'dark',
    type:'point',
    title: {
        title: '散点图', // 主标题的文本
        subtitle: '副标题', // 副标题的文本
    },
    data,
    encode: {
        x: 'x',
        y: 'y',
        key: 'x'
    },
    animate: {
      update: { duration: 300 }
    }
  });

  // 渲染可视化
  chart.render();

  return chart;
}


</script>

<style scoped>
@import "@/assets/chart.css";
</style>