<template>
    <div class="chart-card">
      <h4>问题入库情况</h4>
      <div class="board-list">
        <div class="dataBoard">
          <div>本{{ selectedPeriod }}入库</div>
          <div class="data">6</div>
        </div>
        <div class="dataBoard">
          <div>重复/高频问题</div>
          <div class="data">12</div>
        </div>
      </div>
      <div class="dataBoard">
        <div>按参考价值</div>
        <ringChart_value/>
        
      </div>
      <div class="dataBoard">
        <div>高频参考方案</div>
        <div>12</div>
      </div>
    </div>
</template>


<script setup lang="js" name="home">
import { onMounted, onUnmounted, ref } from 'vue';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

import ringChart_value from '@/components/chart/ringChart_value.vue';

import { renderBarChart } from '@/stores/graph';

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { selectedPeriod } = storeToRefs(dataStore);

import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight } = storeToRefs(toolStore);


</script>

<style lang="scss" scoped>
// @import "@/assets/chart.css";
.board-list {
  display: flex;
  flex-direction: row;
}
.dataBoard {
    // background: #1E1F25;
    background: var(--bg-color);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    min-width: 175px;
    overflow: hidden;
    // margin-right: 26px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    h3 {
        color: #757B8C;
        font-size: 14px;
        font-weight: normal;
    }
    img {
        width: 35px;
        height: 35px;
        margin-right: 15px;
    }
    div.value-display {
        color: var(--text-color);
        font-size: 20px;
        font-weight: 500;
    }
    .data {
      font-size: 24px;
    }
}
</style>