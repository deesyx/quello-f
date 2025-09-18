<script setup lang="ts">
import {ref} from "vue";
import {getQuestions} from "@/api/question";

const currentPage = ref(1);
const pageSize = 10;
const dataList = ref<Array<any>>([]);
const dataTotal = ref(0);

const getPageData = () => {
  getQuestions({pageNo: currentPage.value, pageSize: pageSize}).then((res) => {
    const {list, total} = res.data;
    dataTotal.value = total;
    dataList.value = list;
  });
};

const initData = () => {
  getPageData();
};

// 添加分页处理函数
const handlePageChange = (page: number) => {
  currentPage.value = page;
  getPageData();
};

initData();
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in dataList" :key="index">
        <div>
          <span>{{ item.questionId }}</span>
          <span>{{ item.title }}</span>
          <span>{{ item.productModule }}</span>
          <span>{{ item.questionType }}</span>
          <span>{{ item.severity }}</span>
          <span>{{ item.status }}</span>
          <span>{{ item.priority }}</span>
          <span>{{ item.plannedResolutionDate }}</span>
          <span>{{ item.actualResolutionDate }}</span>
          <span>{{ item.reportedBy }}</span>
          <span>{{ item.responsiblePerson }}</span>
          <span>{{ item.createdAt }}</span>
        </div>
      </li>
    </ul>
  </div>

  <!-- 添加分页组件 -->
  <div class="pagination-container">
    <el-pagination
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="dataTotal"
        layout="prev, pager, next"
    />
  </div>
</template>

<style lang="less" scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>