<template>
  <div class="chart-card">
    <div class="table-header">
      <h3>产品数据表</h3>
      <div class="table-controls">
        <a-upload
          :before-upload="beforeUpload"
          :show-upload-list="false"
          accept=".csv,.xlsx,.xls"
        >
          <a-button title="导入数据">
            <!-- 上传图标 -->
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a1 1 0 0 1 1 1v5.586l1.293-1.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L7 8.586V3a1 1 0 0 1 1-1zm-4 9a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1a1 1 0 1 1 2 0v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1a1 1 0 0 1 1-1z"/>
            </svg>
          </a-button>
        </a-upload>
        
        <a-popconfirm
          title="确定要删除选中的项目吗?"
          @confirm="handleBatchDelete"
          :disabled="selectedRowKeys.length === 0"
        >
          <a-button 
            :disabled="selectedRowKeys.length === 0"
            title="批量删除"
          >
            <!-- 删除图标 -->
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5zm1 0v7h4V5H6zm-2 0h1v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5h1a1 1 0 0 1 0 2h-1v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-1a1 1 0 0 1 1-1z"/>
              <path d="M7 2a1 1 0 0 1 2 0v1h3a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2h3V2z"/>
            </svg>
          </a-button>
        </a-popconfirm>
        
        <a-input-search
          v-model:value="searchText"
          placeholder="搜索产品名称"
          style="width: 200px; margin-left: 10px;"
          @search="onSearch"
        />

        <!-- <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="searchText" placeholder="Keyword Search" />
            </IconField> -->
      </div>
    </div>

    <DataTable :value="filteredData"  scrollable scrollHeight="400px" tableStyle="min-width: 50rem">
        <Column v-for="column of columns" :key="column.dataIndex" :field="column.dataIndex" :header="column.title"></Column>
    </DataTable>

  </div>
</template>

<script setup lang="js" name="productTable">
import { ref, reactive, computed } from 'vue';
import { message } from 'ant-design-vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// 表格相关数据
const searchText = ref('');
const selectedRowKeys = ref([]);

// 模拟产品数据
const productData = ref([
  {
    key: '1',
    productName: 'iPhone 15 Pro',
    createdDate: '2023-09-22',
    price: 7999.00,
    revenue: 1599800.00
  },
  {
    key: '2',
    productName: 'Samsung Galaxy S23',
    createdDate: '2023-02-15',
    price: 6999.00,
    revenue: 1399800.00
  },
  {
    key: '3',
    productName: 'MacBook Pro 16',
    createdDate: '2023-11-01',
    price: 19999.00,
    revenue: 3999800.00
  },
  {
    key: '4',
    productName: 'Dell XPS 13',
    createdDate: '2023-08-10',
    price: 12999.00,
    revenue: 2599800.00
  },
  {
    key: '5',
    productName: 'iPad Air',
    createdDate: '2023-03-18',
    price: 4399.00,
    revenue: 879800.00
  },
  {
    key: '6',
    productName: 'Surface Pro 9',
    createdDate: '2023-10-25',
    price: 8999.00,
    revenue: 1799800.00
  },
  {
    key: '7',
    productName: 'AirPods Pro',
    createdDate: '2023-01-05',
    price: 1899.00,
    revenue: 379800.00
  },
  {
    key: '8',
    productName: 'Apple Watch Series 9',
    createdDate: '2023-09-12',
    price: 2999.00,
    revenue: 599800.00
  },
  {
    key: '9',
    productName: 'Sony WH-1000XM5',
    createdDate: '2023-05-30',
    price: 2499.00,
    revenue: 499800.00
  },
  {
    key: '10',
    productName: 'GoPro Hero 12',
    createdDate: '2023-07-14',
    price: 3499.00,
    revenue: 699800.00
  }
]);

// 表格列定义
const columns = ref([
  {
    title: '产品名称',
    dataIndex: 'productName',
    sorter: (a, b) => a.productName.localeCompare(b.productName),
  },
  {
    title: '创建日期',
    dataIndex: 'createdDate',
    sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
  },
  {
    title: '价格',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: '收入',
    dataIndex: 'revenue',
    sorter: (a, b) => a.revenue - b.revenue,
  },
]);

// 表格分页配置
const pagination = reactive({
  current: 1,
  pageSize: 5,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['5', '10', '20'],
});

// 行选择配置
const rowSelection = reactive({
  selectedRowKeys: selectedRowKeys,
  onChange: (selectedKeys) => {
    selectedRowKeys.value = selectedKeys;
  },
});

// 格式化日期
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('zh-CN', options);
};

// 根据搜索文本和排序过滤数据
const filteredData = computed(() => {
  let result = [...productData.value];
  
  // 根据搜索文本过滤
  if (searchText.value) {
    result = result.filter(item => 
      item.productName.toLowerCase().includes(searchText.value.toLowerCase())
    );
  }
  
  pagination.total = result.length;
  return result;
});

// 处理表格变化（排序、分页）
const handleTableChange = (pag, filters, sorter) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
};

// 搜索处理
const onSearch = (value) => {
  searchText.value = value;
  pagination.current = 1;
};

// 重置过滤器
const resetFilters = () => {
  searchText.value = '';
  selectedRowKeys.value = [];
  pagination.current = 1;
};

// 批量删除功能
const handleBatchDelete = () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请先选择要删除的项目');
    return;
  }
  
  // 从产品数据中过滤掉选中的项目
  productData.value = productData.value.filter(
    item => !selectedRowKeys.value.includes(item.key)
  );
  
  // 清空选中项
  selectedRowKeys.value = [];
  message.success(`成功删除 ${selectedRowKeys.value.length} 个项目`);
};

// 导入功能 - 文件上传前的处理
const beforeUpload = (file) => {
  const acceptedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  
  if (!acceptedTypes.includes(file.type)) {
    message.error('请上传 CSV 或 Excel 文件!');
    return false;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    try {
      // 简单解析CSV数据（实际项目中可以使用papaparse等库进行更完整的解析）
      const lines = content.split('\n');
      if (lines.length > 1) {
        // 模拟导入成功
        message.success(`成功导入文件: ${file.name}`);
      } else {
        message.warning('文件内容为空');
      }
    } catch (error) {
      message.error('文件解析失败: ' + error.message);
    }
  };
  
  reader.readAsText(file);
  return false; // 阻止默认上传行为
};
</script>

<style scoped>
@import "@/assets/chart.css";

.chart-card {
  max-width: 1200px;
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
:deep(.ant-btn) {
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
}

/* DataTable暗色主题样式 */
/* src/components/MyTable.vue */
:deep(.p-datatable) {
  .p-datatable-thead > tr > th {
    background: var(--dt-header-bg) !important;
    color: var(--dt-header-text) !important;
    border-color: var(--dt-border) !important;
  }
  
  .p-datatable-tbody > tr {
    background: var(--dt-row-bg);
    color: var(--dt-text);
    border-color: var(--dt-border);
    
    &:nth-child(even) {
      background: var(--dt-row-alt-bg);
    }
  }
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