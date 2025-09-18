<template>
    <div class="chart-card">
      <div ref="container"></div>
    </div>
</template>


<script setup lang="js" name="home">
import { onMounted, onUnmounted, ref } from 'vue';
import { Chart } from '@antv/g2';
import Papa from 'papaparse';


let chart;
const container = ref(null);

// 1. 动态加载并解析 CSV
const loadCSVData = async () => {
  try {
    // 获取 CSV 原始文本
    const response = await fetch('/src/assets/data/population2015.csv');
    if (!response.ok) throw new Error('CSV 加载失败');
    const csvText = await response.text();
    
    // 2. 解析为 JSON 数据
    const parsedData = Papa.parse(csvText, {
      header: true,    // 第一行为列名
      dynamicTyping: true, // 自动转换数字类型
      skipEmptyLines: true
    }).data;

    console.log(parsedData);

    chart = renderBarChartHorizontal(container.value, parsedData);

  } catch (e) {
    console.error("CSV 处理失败:", e);
  }
};
onMounted(loadCSVData);

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
function renderBarChartHorizontal(container, data) {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 360,
  });

  chart
    .options({
      title: {
        title: '满意度评分', // 主标题的文本
        subtitle: '限制高度的柱形图', // 副标题的文本
      },
      theme: isLight.value ? 'light' : 'dark',
      type: 'interval',
      data: data,
      encode: { x: 'category', y: 'value', color: 'category' },
      style: { minHeight: 50 },
    });

  chart.render();
}



</script>

<style scoped>
@import "@/assets/chart.css";
</style>