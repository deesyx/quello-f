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
    chart = renderLineChart(container.value);
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

function renderLineChart(container) {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 360,
  });

  // 准备数据
  const data = [
    { year: '2020', value: 150 },
    { year: '2021', value: 300 },
    { year: '2022', value: 200 },
    { year: '2023', value: 400 },
    { year: '2024', value: 350 }
  ];

  // 声明可视化
  chart.options({
    theme: isLight.value ? 'light' : 'dark',
    type: 'line',
    title: {
        title: '折线图',
        subtitle: '副标题',
    },
    data: data,
    encode: { x: 'year', y: 'value', key: 'year' },
    style: {
        lineWidth: 3,
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