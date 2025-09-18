<template>
  <main>
    开发中...
    <!-- <div class="scroll-view">
      <dataBoardPieLight/>
      <overviewChart/>
    </div> -->
  </main>
</template>

<script setup lang="js" name="analysis">
import dataBoardPieLight from '@/components/chart/dataBoardPieLight.vue';
import overviewChart from '@/components/chart/overviewChart.vue';


</script>

<style lang="scss" scoped>
main {
  width: 100%;
  padding: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  box-sizing: border-box;
  // overflow-y: auto;
  max-height: calc(100vh - 60px);
}


.chart-card {
  background: #FFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-width: 350px;
  overflow: hidden;
  width: 100%;

}

.chart-card h3 {
  color: #fff;
  margin-bottom: 20px;
  text-align: left;
  flex-shrink: 0;
}

:deep(.g2-container) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.g2-container svg) {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: block;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}

button:hover {
  background-color: #3aa474;
}

/* 暗色主题表格样式 */
:deep(.ant-table) {
  background: #1E1F25;
  color: rgba(255, 255, 255, 0.85);
}

:deep(.ant-table-thead > tr > th) {
  background: #2a2b30;
  color: rgba(255, 255, 255, 0.85);
}

:deep(.ant-table-tbody > tr > td) {
  background: #1E1F25;
  color: rgba(255, 255, 255, 0.65);
  border-bottom: 1px solid #303030;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background: #2a2b30;
}

:deep(.ant-table-tbody > tr.ant-table-row-selected > td) {
  background: #111a2c;
}

:deep(.ant-pagination) {
  color: rgba(255, 255, 255, 0.85);
}

:deep(.ant-pagination-item) {
  background: #1E1F25;
  border: 1px solid #434343;
}

:deep(.ant-pagination-item a) {
  color: rgba(255, 255, 255, 0.85);
}

:deep(.ant-pagination-item-active) {
  background: #177ddc;
  border-color: #177ddc;
}

:deep(.ant-input) {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.85);
}

:deep(.ant-input::placeholder) {
  color: rgba(255, 255, 255, 0.3);
}

:deep(.ant-input-search-button) {
  background: #177ddc;
  border-color: #177ddc;
}
</style>