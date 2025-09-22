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

const onPage = (event: DataTablePageEvent): void => {
  currentPage.value = event.page;
  const searchReq: QuestionSearchReq = {
    title: "",
    status: "",
    questionType: "",
    pageNo: event.page + 1,
    pageSize: event.rows
  };
  loadData(searchReq);
};

const loadData = (req: QuestionSearchReq) => {
  getQuestions(req).then((res) => {
    const {list, total} = res.data;
    totalRecords.value = total;
    questions.value = list;
  });
};

onMounted(() => {
  const searchReq: QuestionSearchReq = {
    title: "",
    status: "",
    questionType: "",
    pageNo: 1,
    pageSize: rowsPerPage.value
  };
  loadData(searchReq);
});

</script>

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