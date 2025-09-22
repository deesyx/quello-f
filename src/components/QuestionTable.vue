<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getQuestions} from "@/api/question";
import DataTable, {DataTablePageEvent} from "primevue/datatable";
import Column from "primevue/column";
import {QuestionSearchReq} from "@/type/question.ts";

const questions = ref<Array<any>>([]);
const currentPage = ref<number>(0);
const rowsPerPage = ref<number>(10);
const totalRecords = ref<number>(0);

const searchTitle = ref<string | null>(null);
const searchStatus = ref<string | null>(null);
const searchQType = ref<string | null>(null);

const statusOpts = ['PENDING', 'PROCESSING', 'REVIEWING', 'RESOLVED', 'IN_INSPECTION', 'CLOSED', 'COMPLETED']
const typeOpts = ['FUNCTION', 'INTERACTION', 'PERFORMANCE', 'VISUAL', 'DATA', 'LOGIC', 'SAFE', 'OTHER']

const onPage = (event: DataTablePageEvent): void => {
  currentPage.value = event.page;
  loadData();
};

const onSearch = () => {
  currentPage.value = 0;
  loadData();
};

const loadData = () => {
  const req: QuestionSearchReq = {
    title: searchTitle.value?.trim() || undefined,
    status: searchStatus.value?.trim() || undefined,
    questionType: searchQType.value?.trim() || undefined,
    pageNo: currentPage.value + 1,
    pageSize: rowsPerPage.value
  };

  getQuestions(req).then((res) => {
    const {list, total} = res.data;
    totalRecords.value = total;
    questions.value = list;
  });
};

onMounted(() => {
  loadData();
});

</script>

<template>
  <div class="card">
    <div class="table-header">
      <h3>问题总览列表</h3>
      <div class="table-controls">

        <IconField>
          <InputIcon><i class="pi pi-search"/></InputIcon>
          <InputText v-model="searchTitle" placeholder="标题"/>
        </IconField>

        <Dropdown v-model="searchStatus" :options="statusOpts" placeholder="状态" showClear/>
        <Dropdown v-model="searchQType" :options="typeOpts" placeholder="问题类型" showClear/>

        <Button label="搜索" icon="pi pi-search" @click="onSearch"/>
      </div>
    </div>

    <DataTable class="paginator-blue"
               :value="questions"
               :paginator="true"
               :rows="rowsPerPage"
               :totalRecords="totalRecords"
               :lazy="true"
               :first="currentPage * rowsPerPage"
               @page="onPage($event)"
               currentPageReportTemplate="{first}-{last} of {totalRecords}"
               scrollable
               scrollDirection="both"
               tableStyle="min-width:50rem;"
               style="width: 100%">
      <Column header="问题ID" field="questionId"/>
      <Column header="标题" field="title"/>
      <Column header="产品模块" field="productModule"/>
      <Column header="问题类型" field="questionType"/>
      <Column header="严重等级" field="severity"/>
      <Column header="当前状态" field="status"/>
      <Column header="优先级" field="priority"/>
      <Column header="计划解决时间" field="plannedResolutionDate"/>
      <Column header="实际解决时间" field="actualResolutionDate"/>
      <Column header="提出人" field="reportedBy"/>
      <Column header="责任人" field="responsiblePerson"/>
      <Column header="创建时间" field="createdAt"/>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped>

</style>