<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Chart } from '@antv/g2';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    default: () => ['#000000', '#a0ff03']
  },
  percentage: {
    type: String,
    default: '70%'
  }
});

let chart = null;
const chartContainer = ref(null);

const initChart = () => {
  if (!chartContainer.value) return;

  chart = new Chart({
    container: chartContainer.value,
    width: 100,
    height: 100,
    autoPaint: true,
  });

  chart
    .interval()
    .data(props.data)
    .encode('y', (d) => d)
    .encode('color', (d, idx) => idx)
    .scale('y', { domain: [0, 1] })
    .scale('color', { range: props.colors })
    .axis(false)
    .legend(false)
    .animate({ enter: { type: 'waveIn' } });

  chart.text()
    .style({
      text: props.percentage,
      x: '50%',
      y: '50%',
      textAlign: 'center',
      fontSize: 16,
      fontStyle: 'bold',
    });

  chart.render();
};

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});
</script>

<style scoped>
.chart-container {
  width: 100px;
  height: 100px;
  display: inline-block;
}
</style>