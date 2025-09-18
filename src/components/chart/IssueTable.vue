<template>
  <div class="card">
    <div class="table-header">
      <h3>问题总览列表</h3>
      <div class="table-controls">
        
        <!-- <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="searchText" placeholder="Keyword Search" />
            </IconField> -->
      </div>
    </div>

    <DataTable class="custom-datatable" :value="questions"  scrollable scrollHeight="400px" scrollDirection="both" tableStyle="min-width:50rem;"  style="width: 100%" >
        <Column v-for="column of columns" :key="column.dataIndex" :field="column.dataIndex" :header="column.title"></Column>
    </DataTable>

  </div>
</template>

<script setup lang="js" name="productTable">
import { ref, reactive, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { questions } = storeToRefs(dataStore);

// 表格列定义
const columns = ref([
  {
    title: '产品模块',
    dataIndex: 'productModule',
    sorter: (a, b) => a.productModule.localeCompare(b.productModule),
  },
  {
    title: '标题',
    dataIndex: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: '问题描述',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: '问题类型',
    dataIndex: 'questionType',
    sorter: (a, b) => a.questionType.localeCompare(b.questionType),
  },
  {
    title: '影响评级',
    dataIndex: 'severity',
    sorter: (a, b) => a.severity.localeCompare(b.severity),
  },
  {
    title: '报告人',
    dataIndex: 'reportedBy',
    sorter: (a, b) => a.reportedBy.localeCompare(b.reportedBy),
  },
  // {
  //   title: '报告组',
  //   dataIndex: 'reportedByGroup',
  //   sorter: (a, b) => a.reportedByGroup.localeCompare(b.reportedByGroup),
  // },
  {
    title: '优先级',
    dataIndex: 'priority',
    sorter: (a, b) => a.priority.localeCompare(b.priority),
  },
  {
    title: '状态',
    dataIndex: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: '责任人',
    dataIndex: 'responsiblePerson',
    sorter: (a, b) => a.responsiblePerson.localeCompare(b.responsiblePerson),
  },
]);



// function getData() {
//   const dataStore = useDataStore();
//   dataStore.getPageData();
// }

// onMounted(() => {
//   getData();
// });

</script>

<style lang="scss" scoped>
// @import "@/assets/chart.css";

.card {
  // max-width: 1200px;
  // overflow: scroll;    
  background: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  min-width: 100%;
  overflow: hidden;
  height: 100%;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-header h3 {
  color: var(--text-color);
  margin: 0;
}

.table-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 图标按钮样式 */
/* :deep(.ant-btn) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.85);
}

:deep(.ant-btn:hover) {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

:deep(.ant-btn[disabled]) {
  color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
} */

/* DataTable暗色主题样式 */
/* src/components/MyTable.vue */
:deep(.p-datatable) {
  .p-datatable-thead > tr > th {
    font-size: 14px;
    background: var(--dt-header-bg);
    color: var(--dt-header-text);
    border: var(--dt-border);
  }
  
  .p-datatable-tbody > tr {
    font-size: 14px;
    font-weight: normal;
    background: var(--dt-row-bg);
    color: var(--dt-text);
    border: var(--dt-border);
    
    // &:nth-child(even) {
    //   background: var(--dt-row-alt-bg);
    // }
  }

  // .p-datatable-row-selected {
  //   background-color: var(--dt-row-alt-bg);
  // }
}



/* :deep(.ant-input) {
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
} */


/* 使用 ::v-deep (或 /deep/ 或 >>>，取决于 Vue 版本和构建工具) */
// .custom-datatable ::v-deep(.p-datatable-thead) > tr > th {
//   background-color: var(--dt-row-alt-bg);
//   color: #ffffff;
//   font-size: 14px;
//   font-weight: bold;
// }

// .custom-datatable ::v-deep(.p-datatable-tbody) > tr > td {
//   background-color: var(--dt-row-bg);
//   font-size: 0.9rem;
//   // border: none; // 例如：去除边框
// }

/* 鼠标悬停效果 */
// .custom-datatable ::v-deep(.p-datatable-tbody) > tr:not(.p-highlight):hover > td {
//   background-color: var(--dt-row-bg) !important;
// }
</style>