<template>
  <main>
    <div class="scroll-view">
      <!-- <h1>问题库数据看板</h1> -->
      <!--筛选区-->


      <!-- <button @click="test">接口测试</button> -->


      <div class="filter-container">
        <div class="filter-item">
          <label for="productLine">产品模块</label>
          <Select 
            id="productLine"
            v-model="selectedProduct" 
            :options="products" 
            @change="onProductChange"
          ></Select>
        </div>
        <div class="filter-item">
          <label for="dateRange">日期范围</label>
          <DatePicker 
            id="dateRange" 
            v-model="dateRange"
            selectionMode="range" 
            :manualInput="false" 
            dateFormat="yy/mm/dd" 
            placeholder="请选择日期范围" 
            :showButtonBar="true" 
            :minDate="new Date('2023-01-01')" 
            />
            <!-- :change="onDateChange()" -->

        </div>
        <div class="filter-item">
          <label for="period">周期</label>
          <SelectButton id="period" v-model="selectedPeriod" :options="periods" @change="onPeriodChange" :allowEmpty="false" />
        </div>
      </div>
      
      <!-- 数据统计区 -->
      <!-- <section> -->
        <h3>整体情况</h3>
        <div class="stats-container">
          <div v-for="item, id in labelList" :key="id" class="stat-item">
            <div class="stat-icon">
              <img :src="getImageUrl(item)" alt="">
            </div>
            <div class="stat-label">{{ labelMap[item] }}</div>
            <div class="stat-value" v-if="item.includes('Rate')">
              {{ overview && overview[item] !== undefined ? overview[item] * 100 : 0  }}
              <span style="font-size:14px;">%</span>
            </div>
            <div class="stat-value" v-else >
              {{ overview && overview[item] !== undefined ? overview[item] : 0  }}
            </div>
            <div class="stat-change" :class="overview[item+'Gr'] > 0 ? 'positive' : 'negative'">
              <span class="change-icon">
                {{ overview && overview[item+'Gr'] !== undefined ? (overview[item+'Gr'] > 0 ? '↑' : '↓' ) : ''}}
              </span>
              {{ overview && overview[item+'Gr'] !== undefined ? ( Math.abs(overview[item+'Gr'] * 100).toFixed(1) ) : '--' }}%
              <span style="color:var(--text-color-secondary); font-weight: normal;">
                较上{{ selectedPeriod }}
              </span>
            </div>
          </div>
        </div>
        <div class="charts-container">
          <!-- 说明 -->
          <!--
            -- 在不同组件里写的原因是，那个chart变量，
            -- 每个图表需要有一个chart变量，写在一起不方便
          -->
          <lineChart2/>
          <!-- <enterOverview/> -->
        </div>
      <!-- </section> -->

      
        <h3>问题分布</h3>

        <div class="charts-container">
          <ringChart/>
          <barChart/>
          <columnChart/>
          <columnChart_Prod/>
          <!-- <columnChart_source/>
          <RankingReporter/> -->
      </div>


      <h3>问题入库情况</h3>
      <!-- <div class="stats-container">
        <div class="stat-item">
          <div>本{{ selectedPeriod }}入库</div>
          <div class="data">6</div>
        </div>
        <div class="stat-item">
          <div>重复/高频问题</div>
          <div class="data">12</div>
        </div>
      </div> -->
      
        <!-- <div class="dataBoard"> -->
          <!-- <div>按参考价值</div> -->
      <div class="stats-container">
        <!-- <div class="board-container">
          <div class="stat-item">
            <div>总入库</div>
            <div class="data">32</div>
          </div>
          <div class="stat-item">
            <div>新增入库</div>
            <div class="data">6</div>
          </div>
          <div class="stat-item">
            <div>优质案例占比</div>
            <div class="data">8%</div>
          </div>
          <div class="stat-item">
            <div>重复/高频问题</div>
            <div class="data">12</div>
          </div>
        </div> -->
        <div class="board-container">
          
          <div class="stat-item">
            <div class="stat-icon">
              <img :src="getImageUrl('newQuestions')" alt="">
            </div>
            <div class="stat-label">总入库数</div>
            <div class="stat-value">30</div>
            <div class="stat-change positive">
              <span class="change-icon">↑</span> 12% 较上{{ selectedPeriod }}
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 7V17M7 12H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stat-label">新增入库</div>
            <div class="stat-value">5</div>
            <div class="stat-change negative">
              <span class="change-icon">↓</span> 12% 较上{{ selectedPeriod }}
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stat-label">优质案例占比</div>
            <div class="stat-value">8%</div>
            <div class="stat-change negative">
              <span class="change-icon">↓</span> 12% 较上{{ selectedPeriod }}
            </div>
          </div>
        </div>
          
        <ringChart_value/>
        <Top10 />
        
      </div>



    <!-- <h3>问题管理</h3> -->

    <!-- <div class="charts-container">
      <div class="rate-container">
        <div class="rate-header">
          <h4>已逾期问题</h4>
          <button>查看全部 ></button>
        </div>
        <div class="rate-item rate-list" v-for="(issue, index) in overdue" :key="index">
          <div class="rate-item">
            <div>
              <img src="@/assets/images/info.svg" alt="">
            </div>
            <div style="display: flex; flex-direction: column; gap:8px;">
              <div class="rate-label">{{ issue.title }}</div>
              <div class="rate-info">
                <div>责任人：{{ issue.responsiblePerson }}</div>
                <div>{{ issue.plannedResolutionDate }}</div>
              </div>
            </div>
          </div>
          <div class="rate-state">已逾期 {{ Math.floor((Date.now() - new Date(issue.plannedResolutionDate).getTime()) / (1000 * 60 * 60 * 24)) }} 天</div>
        </div>
      </div>

      <div class="rate-container">
        <div class="rate-header">
          <h4>即将逾期问题</h4>
          <button>查看全部 ></button>
        </div>
        <div class="rate-item" v-for="(issue, index) in overdueWarn" :key="index">
          <div class="rate-item">
            <div>
              <img src="@/assets/images/info.svg" alt="">
            </div>
            <div style="display: flex; flex-direction: column; gap:8px;">
              <div class="rate-label">{{ issue.title }}</div>
              <div class="rate-info">
                <div><i>user</i>{{ issue.responsiblePerson }}</div>
                <div>{{ issue.plannedResolutionDate }}</div>
              </div>
            </div>
          </div>
          <div class="rate-state">{{ issue.status }}</div>
        </div>
      </div>



      <div class="rate-container">
        <div class="rate-header">
          <h4>最新问题</h4>
          <button>查看全部 ></button>
        </div>
        <div class="rate-item" v-for="(issue, index) in newlyAdded" :key="index">
          <div class="rate-item">
            <div>
              <img src="@/assets/images/info.svg" alt="">
            </div>
            <div style="display: flex; flex-direction: column; gap:8px;">
              <div class="rate-label">{{ issue.title }}</div>
              <div class="rate-info">
                <div>责任人：{{ issue.responsiblePerson }}</div>
                <div>{{ issue.createdAt }}</div>
              </div>
            </div>
          </div>
          <div class="rate-state">{{ issue.status }}</div>
        </div>
      </div>

    </div> -->
<!-- 
    <div>
      <IssueTable />
    </div> -->
    </div>
  </main>

</template>

<script setup lang="js" name="issues">
import { onBeforeMount, onMounted, ref } from 'vue'
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import DatePicker from 'primevue/datepicker';

import { storeToRefs } from 'pinia';
import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { mode } = storeToRefs(toolStore);

import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const { selectedProduct, products, modules, periods, selectedPeriod, dateRange, overview, overdue, newlyAdded, overdueWarn, isLoading} = storeToRefs(dataStore);



const loading = ref(true);
onBeforeMount(async () => {
  console.log('父组件加载。。。');

  console.log('加载前，获取后台数据');
  try {
    // await dataStore.getPageData();
    await dataStore.getDashbaordData();
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
  }
});

async function test() {
  // await dataStore.getDashbaordData();
  await dataStore.getQuestionTrendsData();

}
// onMounted(() => {
//   dataStore.getPageData();
// });
// 处理产品选择变化
const onProductChange = (value) => {
  console.log('Selected product:', value);
  // 在这里添加你的筛选逻辑
  // 例如：filterIssuesByProduct(value)
};

import { watch } from 'vue';

// Watch for dateRange changes
watch(dateRange, async (newDateRange, oldDateRange) => {
  // console.log('Date range changed from:', oldDateRange, 'to:', newDateRange);
  // console.log('当前日期范围：', dateRange.value[0], dateRange.value[1]);
  
  // Perform your operations here
  if (newDateRange && newDateRange.length === 2) {
    // Refresh data when date range changes
    await dataStore.getDashbaordData();
    // dataStore.getQuestionTrendsData();
  }
});

// const onDateChange = async (value) => { 
//   console.log('改变日期范围。');
//   overview.value = await dataStore.getDashbaordData();
// };

const onPeriodChange = async (value) => {
  console.log('Selected period:', value);
  // 在这里添加你的筛选逻辑
  await dataStore.getDashbaordData();

};

import IssueTable from '../components/chart/IssueTable.vue';
import lineChart2 from '../components/chart/lineChart2.vue';
import ringChart from '../components/chart/ringChart.vue';
import barChart from '../components/chart/barChart.vue';
import columnChart from '../components/chart/columnChart.vue';
import columnChart_Prod from '../components/chart/columnChart_Prod.vue';
import columnChart_source from '../components/chart/columnChart_source.vue';
import enterOverview from '../components/chart/enterOverview.vue';
import ringChart_value from '@/components/chart/ringChart_value.vue';
import Top10  from '@/components/chart/Top10.vue';
import Ranking  from '@/components/chart/Ranking.vue';
import RankingReporter from '@/components/chart/RankingReporter.vue';
import columnChart_report  from '@/components/chart/columnChart_report.vue';
import { date } from '@primeuix/themes/aura/datepicker';


// 维护icon路径
const labelList = [
  'totalQuestions',
  'newQuestions',
  'adoptionRate',
  'resolvedQuestions',
  'onScheduleResolutionRate',
  'overtimeRate',
];
// Create a helper function to resolve image paths
const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}.svg`, import.meta.url).href;
};
const labelMap = {
  totalQuestions: '总问题数',
  newQuestions: '新增问题数',
  adoptionRate: '采纳率',
  resolvedQuestions: '解决问题数',
  onScheduleResolutionRate: '按时解决率',
  overtimeRate: '超时率',
};
</script>

<style lang="scss" scoped>

main {
  height: calc(100vh - 60px);
  // padding: 60px 20px;
  box-sizing: border-box;
  // overflow-y: auto; // 允许内容溢出时出现滚动条
  -webkit-overflow-scrolling: touch;
  background-color: var(--page-bg-color);
  .scroll-view {
    // width: 70%;
    max-width: 1300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 20px;

    section {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}

// 筛选容器 - 横向排列不同的筛选项
.filter-container {
  width: 100%;
  background-color: var(--bg-color);
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: space-between;
}

// 筛选项 - 竖向排列标题和控件
.filter-item {
  display: flex;
  flex-direction: row;
  gap: 16px;
  // justify-content: center;
  align-items: center;
  
  label {
    font-size: 14px;
    color: var(--text-color-secondary);
    font-weight: normal;
  }
  
  // 确保控件宽度适配内容
  :deep(.p-select) {
    min-width: 150px;
  }
  
  :deep(.p-selectbutton) {
    min-width: 200px;
  }
}


// 数据统计容器 - 横向排列各项统计数据
.stats-container, .charts-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}

.board-container {
  display: flex;
  flex-direction: column;
  gap: 20px;

  // 让整列卡片占1/3的宽度
  min-width: 420px;
  overflow: hidden;
  height: 100%;
}


// 单个统计数据项

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  min-width: 200px;
  background: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  
  .stat-label {
    font-size: 14px;
    color: var(--text-color-secondary);
    font-weight: normal;
  }
  
  .stat-value {
    font-family: 'D-DIN-PRO';
    font-size: 24px;
    font-weight: bold;
    color: var(--text-color);
  }
  
  .stat-change {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    
    .change-icon {
      font-size: 10px;
    }
  }
  
  .stat-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 42px;
    height: 42px;
    // width: 20%;
    padding: 10px 12px;
    background-color: var(--icon-bg-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 16px;
      // width: 100%;
    }
  }
}


.stat-item-width {
  min-width: 300px;
  gap: 16px;
}

.positive {
  color: #23C799;
}

.negative {
  color: #FF4040;
}


// :deep(.g2-container) {
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   flex-grow: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// :deep(.g2-container svg) {
//   width: 100%;
//   height: 100%;
//   max-width: 100%;
//   max-height: 100%;
//   display: block;
// }



.issue-management {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
}
.rate-container { 
  overflow: hidden;
  height: 100%;
  background-color: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 420px;
  padding: 20px 32px;
  height: 500px;
  .rate-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .rate-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
    // align-items: top;
    img {
      width: 16px;
    }
    .rate-label{
      font-size: 14px;
    }
    .rate-info {
      color: var(--text-color-secondary);
      font-size: 11px;
      font-weight: normal;
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
    .rate-state {
      color: red;
      font-size: 12px;
      font-weight: normal;
      background-color: #ff000030;
      height: 24px;
      border-radius: 20px;
      padding: 4px 8px;
    }
  }
  

  button {
    background:none;
    color: var(--link-color);
    cursor: pointer;
    flex-shrink: 0;
    font-size: 14px;
  }

  button:hover {
    color: var(--link-color-hover);
  }
}
      



/* 暗色主题表格样式 */
// :deep(.ant-table) {
//   background: #1E1F25;
//   color: rgba(255, 255, 255, 0.85);
// }

// :deep(.ant-table-thead > tr > th) {
//   background: #2a2b30;
//   color: rgba(255, 255, 255, 0.85);
// }

// :deep(.ant-table-tbody > tr > td) {
//   background: #1E1F25;
//   color: rgba(255, 255, 255, 0.65);
//   border-bottom: 1px solid #303030;
// }

// :deep(.ant-table-tbody > tr:hover > td) {
//   background: #2a2b30;
// }

// :deep(.ant-table-tbody > tr.ant-table-row-selected > td) {
//   background: #111a2c;
// }

// :deep(.ant-pagination) {
//   color: rgba(255, 255, 255, 0.85);
// }

// :deep(.ant-pagination-item) {
//   background: #1E1F25;
//   border: 1px solid #434343;
// }

// :deep(.ant-pagination-item a) {
//   color: rgba(255, 255, 255, 0.85);
// }

// :deep(.ant-pagination-item-active) {
//   background: #177ddc;
//   border-color: #177ddc;
// }

// :deep(.ant-input) {
//   background: rgba(255, 255, 255, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   color: rgba(255, 255, 255, 0.85);
// }

// :deep(.ant-input::placeholder) {
//   color: rgba(255, 255, 255, 0.3);
// }

// :deep(.ant-input-search-button) {
//   background: #177ddc;
//   border-color: #177ddc;
// }
</style>
