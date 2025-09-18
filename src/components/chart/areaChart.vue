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
    chart = renderAreaChart(container.value);
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
// 渲染面积图
function renderAreaChart(container) {
  const chart = new Chart({
    container,
    autoFit: true,
  });

  // 准备数据
  const data = [
    { year: '2020', value: 150 },
    { year: '2021', value: 300 },
    { year: '2022', value: 200 },
    { year: '2023', value: 400 },
    { year: '2023', value: 400 },
    { year: '2024', value: 350 }
  ];

  // 声明可视化
  chart
    .title({
        title: '面积图',
        subtitle: '副标题',
    })
    .theme({type: isLight.value ?  'light' : 'dark'}) // Apply dark theme.
    .area() // 创建一个 Area 标记
    .data(data) // 绑定数据
    .encode('x', 'year') // 编码 x 通道
    .encode('y', 'value') // 编码 y 通道
    .encode('key', 'year') // 指定 key
    .animate('update', { duration: 300 }); // 指定更新动画的时间

  // 渲染可视化
  chart.render();

  return chart;
}




</script>

<style scoped>
@import "@/assets/chart.css";
</style>