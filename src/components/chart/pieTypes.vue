<template>
    <div class="chart-card">
      <div ref="container"></div>
      <!-- <button @click="onClick">更新数据</button> -->
    </div>
</template>


<script setup lang="js" name="home">


import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { questionType } = storeToRefs(dataStore);




import { onMounted, onUnmounted, ref } from 'vue';
import { Chart } from '@antv/g2';

let chart;
const container = ref(null);

onMounted(() => {
    chart = renderBarChart(container.value);
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
// 渲染条形图
function renderBarChart(container) {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 360,
  });

  
// const chart = new Chart({
//   container,
//   width: 500,
//   height: 400,
// });

  chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });

  chart
    .options({
      title: {
        title: '类型分布', // 主标题的文本
        // subtitle: '限制高度的柱形图', // 副标题的文本
      },
      theme: isLight.value ? 'light' : 'dark',
      style: { radius: 4, inset: 1 },
    })
    .interval()
    .data(questionType)
    .transform({ type: 'sortX', by: 'y', reverse: true }) // 按Y值排序X轴
    .transform({ type: 'stackY' })
    .encode('y', 'value')
    .encode('color', 'id')
    // .scale('color', {
    //   range: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'],
    // })
    .label({
      text: 'value',
      fontWeight: 'bold',
      offset: 14,
    })
    .label({
      text: 'id',
      position: 'spider',
      connectorDistance: 0,
      fontWeight: 'bold',
      textBaseline: 'bottom',
      // textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
      dy: -4,
    })
    // .style('radius', 4)
    // .style('stroke', 'rgba(0,0,0,0)')
    // .style('lineWidth', 2)
    .animate('enter', { type: 'waveIn' })
    .legend(false);

  chart.render();


  return chart;
}



</script>

<style scoped>
@import "@/assets/chart.css";
</style>