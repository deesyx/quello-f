<template>
    <!-- <div class="chart-card">
      <div ref="container"></div>
    </div> -->
    <div class="chart-card card">
        <div class="header">高频参考方案TOP10</div>
         <div  class="item" v-for="(solution, index) in top10" :key="index">
          {{ index+1 }}
          <div class="label">{{ solution }}</div>
        </div>
      </div>
</template>


<script setup lang="js" name="home">
// import { onMounted, onUnmounted, ref } from 'vue';
// import { watch } from 'vue';
import { storeToRefs } from 'pinia';

// import { renderHorizontalBarChart } from '@/stores/graph';

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { top10 } = storeToRefs(dataStore);

// console.log("top10:", top10.value);

// import { useToolStore } from '@/stores/util';
// const toolStore = useToolStore();
// const { isLight } = storeToRefs(toolStore);

// let chart;
// const container = ref(null);

// onMounted(() => {
//     chart = renderHorizontalBarChart(container.value, prodModule.value, "高频参考方案TOP10", isLight.value);
// });

// onUnmounted(() => {
//     // 添加检查确保图表存在再销毁
//     if (chart) {
//         chart.destroy();
//         chart = null;
//     }
// });

// watch(isLight, () => {
//   if (chart) {
//     chart.options({
//       theme: isLight.value ? 'light' : 'dark',
//     });
//     chart.render();
//   }
// });

</script>

<style lang="scss" scoped>
@import "@/assets/chart.css";
.card{
  min-width: 300px;
  // max-width:100%;
  // max-width: 450px;
  height: 400px;
  padding: 20px;
}
.header {
  margin: 20px;
}
.item {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items:  top;
  margin-bottom: 10px;
  margin-left: 20px;
  .label{
    font-weight: normal;
    font-size: 14px;
  }
}
</style>