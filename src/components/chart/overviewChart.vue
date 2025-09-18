<template>
    <div class="chart-card">
      <div class="chart-header">
        <h3>工作概览111</h3>
        <div class="filter-controls">
          <Select 
            v-model="selectedYear" 
            :options="yearOptions" 
            optionLabel="label" size="small" 
            :placeholder="''+selectedYear" 
            class="w-full md:w-56"
            @change="applyFilters"
            style="width: 120px; margin-right: 10px;"
          />
          <Select 
            v-model="selectedPeriodType" 
            :options="periodTypeOptions" 
            optionLabel="label" 
            size="small" 
            placeholder="月度" 
            class="w-full md:w-56" 
            @change="applyFilters"
            style="width: 120px; margin-right: 10px;"
          />
        </div>
      </div>
      <div ref="container"></div>
    </div>
</template>


<script setup lang="js" name="overviewChart">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Chart } from '@antv/g2';
// import { Select } from 'ant-design-vue';
import Select from 'primevue/select';


// 图表相关
let chart;
const container = ref(null);


import { storeToRefs } from 'pinia';
import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { mode, modeString } = storeToRefs(toolStore);
watch(mode, () => {
  chart = renderLineChart(container.value);
});



// 筛选相关
const selectedYear = ref(new Date().getFullYear());
const selectedPeriodType = ref('monthly');
const yearOptions = ref([]);
const periodTypeOptions = ref([
  { label: '月度', value: 'monthly' },
  { label: '季度', value: 'quarterly' },
  { label: '年度', value: 'yearly' },
  { label: '半年度', value: 'halfYearly' }
]);


const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

// 生成年份选项 (最近5年)
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 4; i <= currentYear; i++) {
    years.push({ label: `${i}年`, value: i });
  }
  yearOptions.value = years;
};

// 模拟不同时间维度的数据
const generateMonthlyData = (year) => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const data = [];
  const cities = ['北京', '上海', '广州', '深圳'];
  
  cities.forEach(city => {
    months.forEach((month, index) => {
      // 模拟一些有规律的数据
      const baseValue = 50 + Math.sin(index / 12 * Math.PI * 2) * 30;
      const randomFactor = 20 * Math.random();
      const value = Math.round(baseValue + randomFactor + (city === '北京' ? 10 : city === '上海' ? 5 : 0));
      
      data.push({
        name: city,
        period: month,
        value: value
      });
    });
  });
  
  return data;
};

const generateQuarterlyData = (year) => {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const data = [];
  const cities = ['北京', '上海', '广州', '深圳'];
  
  cities.forEach(city => {
    quarters.forEach((quarter, index) => {
      // 模拟季度数据，通常逐季度增长
      const baseValue = 60 + index * 15 + (city === '北京' ? 15 : city === '上海' ? 10 : 0);
      const randomFactor = 25 * Math.random();
      const value = Math.round(baseValue + randomFactor);
      
      data.push({
        name: city,
        period: quarter,
        value: value
      });
    });
  });
  
  return data;
};

const generateHalfYearlyData = (year) => {
  const halfYears = ['上半年', '下半年'];
  const data = [];
  const cities = ['北京', '上海', '广州', '深圳'];
  
  cities.forEach(city => {
    halfYears.forEach((half, index) => {
      // 模拟半年度数据
      const baseValue = 180 + index * 30 + (city === '北京' ? 20 : city === '上海' ? 15 : 0);
      const randomFactor = 30 * Math.random();
      const value = Math.round(baseValue + randomFactor);
      
      data.push({
        name: city,
        period: half,
        value: value
      });
    });
  });
  
  return data;
};

const generateYearlyData = (year) => {
  const years = [year-2, year-1, year];
  const data = [];
  const cities = ['北京', '上海', '广州', '深圳'];
  
  cities.forEach(city => {
    years.forEach((y, index) => {
      // 模拟年度数据，逐年增长
      const baseValue = 300 + index * 50 + (city === '北京' ? 30 : city === '上海' ? 20 : 0);
      const randomFactor = 40 * Math.random();
      const value = Math.round(baseValue + randomFactor);
      
      data.push({
        name: city,
        period: `${y}年`,
        value: value
      });
    });
  });
  
  return data;
};

// 根据筛选条件处理数据
const processData = () => {
  switch (selectedPeriodType.value) {
    case 'monthly':
      return generateMonthlyData(selectedYear.value);
    case 'quarterly':
      return generateQuarterlyData(selectedYear.value);
    case 'halfYearly':
      return generateHalfYearlyData(selectedYear.value);
    case 'yearly':
      return generateYearlyData(selectedYear.value);
    default:
      return generateMonthlyData(selectedYear.value);
  }
};

// 应用筛选条件
const applyFilters = () => {
  const filteredData = processData();
  updateChart(filteredData);
};

// 更新图表
const updateChart = (data) => {
  if (chart) {
    chart.changeData(data);
    // 更新x轴标签
    chart.options({
      data: data,
      encode: { x: "period", y: "value", color: "name" }
    });
    chart.render();
  }
};

// 渲染图表
const renderLineChart = (container) => {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 320,
  });

  chart.options({
    theme: modeString.value,
    type: "interval",
    autoFit: true,
    data: processData(),
    encode: { x: "period", y: "value", color: "name" },
    transform: [{ type: "dodgeX" }],
    interaction: { elementHighlight: { background: true } },
    style: {
      minHeight: 20,
      columnWidthRatio: 0.5,
      radiusTopLeft: 20,
      radiusTopRight: 20,
      insetBottom: 5,
      // 绘图属性
      fill: (d) => {
        const colorMap = {
          '北京': '#11CABE',
          '上海': '#246CF9',
          '广州': '#F9A824',
          '深圳': '#E5246C'
        };
        return colorMap[d.name] || '#11CABE';
      },
      fillOpacity: 0.9,
      opacity: 1,
      cursor: 'pointer',
    },
    axis: {
      x: { title: false },
      y: { title: false }
    },
    legend: {
      color: {
        layout: { justifyContent: 'center' }
      }
    }
  });

  // 渲染可视化
  chart.render();
  return chart;
};

onMounted(() => {
  generateYearOptions();
  chart = renderLineChart(container.value);
});

onUnmounted(() => {
  // 添加检查确保图表存在再销毁
  if (chart) {
    chart.destroy();
    chart = null;
  }
});
</script>

<style scoped>
@import "@/assets/chart.css";

.chart-card {
    /* min-width: 800px; */
    max-width: 1200px;
    /* background-color: var(--bg-color); */
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  margin: 0;
  /* color: #fff; */
}

.filter-controls {
  display: flex;
  align-items: center;
}

/* 暗色主题下拉框样式 */
:deep(.ant-select-selector) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #fff !important;
}

:deep(.ant-select-selection-item) {
  color: #fff !important;
}

:deep(.ant-select-arrow) {
  color: rgba(255, 255, 255, 0.45) !important;
}
</style>