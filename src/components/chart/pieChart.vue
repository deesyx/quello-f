<template>
    <div class="chart-card">
      <!-- <h3>饼图</h3> -->
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

    chart = renderPieChart(container.value, parsedData);

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

// 饼图
function renderPieChart(container, data) {
  const chart = new Chart({
    container,
    autoFit: true,
  });

  // 声明可视化
  chart
    .theme({type: isLight.value ?  'light' : 'dark' }) // Apply dark theme.
    .coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 })
    .options({
      type: 'interval',
      height: 360,
      title: {
        title: '饼图', // 主标题的文本
        subtitle: '副标题', // 副标题的文本
      },
      data: data,
      // data: {
      //   type: 'fetch',
      //   value:
      //     '/assets/data/population2015.csv',
      //     // 'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
      // },
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta' },
      scale: {
        color: { palette: 'spectral', offset: (t) => t * 0.8 + 0.1 },
      },
      legend: false,
      encode: { y: 'value', color: 'category' },
      style: { radius: 4, inset: 1 },
      labels: [
        {
          text: 'category',
          radius: 0.8,
          style: { fontSize: 10, fontWeight: 'bold' },
        },
        {
          text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
          radius: 0.8,
          style: { fontSize: 9, dy: 12 },
        },
      ],
      animate: { enter: { type: 'waveIn', duration: 1000 } },
    });

  chart.render();

  return chart;
}



</script>


<style scoped>
@import "@/assets/chart.css";
</style>