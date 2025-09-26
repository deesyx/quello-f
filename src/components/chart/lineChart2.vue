<template>
    <div class="chart-card">
      <div class="chart-header">
        <h4>新增问题趋势</h4>
        <div class="filter-item">
          <!-- <label for="period">周期</label> -->
          <SelectButton id="period" v-model="selectedTrendPeriod" :options="trendPeriods" @change="onTrendPeriodChange" :allowEmpty="false"  size="small"/>
        </div>
      </div>
      <div ref="container"></div>
    </div>
</template>


<script setup lang="js" name="home">
import { onMounted, onUnmounted, ref } from 'vue';
import { renderLineChart } from '@/stores/graph';
import SelectButton from 'primevue/selectbutton';

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { createdAt, questionTrendData, trendPeriods, selectedTrendPeriod } = storeToRefs(dataStore);

import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight } = storeToRefs(toolStore);

let chart;
const container = ref(null);


onMounted( async () => {
  await dataStore.getQuestionTrendsData();
  console.log(questionTrendData.value);
  chart = renderLineChart(container.value, questionTrendData.value, '新增问题趋势', isLight.value);
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

watch(questionTrendData, () => {
  if (chart) {
    chart.destroy();
    chart = null;
    chart = renderLineChart(container.value, questionTrendData.value, '新增问题趋势', isLight.value);
  }
});

async function onTrendPeriodChange() {
  await dataStore.getQuestionTrendsData();

  chart.destroy();
  chart = null;
  chart = renderLineChart(container.value, questionTrendData.value, '新增问题趋势', isLight.value);
}


</script>

<style scoped>
@import "@/assets/chart.css";

.chart-card {
  width: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    color: var(--h4-color);
  }
}
</style>