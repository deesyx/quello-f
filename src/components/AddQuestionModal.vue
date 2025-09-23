<script setup lang="ts">
import {ref, reactive} from 'vue'
import {useToast} from 'primevue/usetoast'
import {createQuestions} from '@/api/question'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import FloatLabel from 'primevue/floatlabel'
import {QuestionCreateReq} from "@/type/question.ts";

/* -------- 弹窗开关 -------- */
const show = ref(false)

/* -------- 下拉选项 -------- */
const typeOpts = ['FUNCTION', 'INTERACTION', 'PERFORMANCE', 'VISUAL', 'DATA', 'LOGIC', 'SAFE', 'OTHER']
const severityOpts = ['SERIOUS', 'HIGH', 'MEDIUM', 'LOW']
const priorityOpts = ['P0', 'P1', 'P2', 'P3']

/* -------- 表单数据 -------- */
const form = reactive<QuestionCreateReq & { plannedResolutionDate?: Date | null }>({
  title: '',
  content: '',
  productModule: '',
  questionType: '',
  severity: '',
  priority: '',
  plannedResolutionDate: null,
  reportedBy: '',
  responsiblePerson: ''
})

/* -------- 提交 -------- */
const toast = useToast()
const emit = defineEmits<{ (e: 'added'): void }>()

async function submit() {
  // 简单校验
  for (const k in form) {
    if (k === 'plannedResolutionDate') continue
    if (!form[k as keyof typeof form]) {
      toast.add({severity: 'warn', summary: '请完整填写必填项', life: 2000})
      return
    }
  }

  // 日期转 string
  const req = {
    ...form, plannedResolutionDate: form.plannedResolutionDate
        ? form.plannedResolutionDate.toISOString().slice(0, 10)
        : ''
  }
  await createQuestions(req)
  toast.add({severity: 'success', summary: '创建成功', life: 2000})
  show.value = false
  emit('added')
}
</script>

<template>
  <!-- 1. 触发按钮 -->
  <Button label="新建问题" icon="pi pi-plus" @click="show = true"/>

  <!-- 2. 模态框 -->
  <Dialog
      v-model:visible="show"
      appendTo="self"
      header="新增问题"
      :modal="true"
      :style="{ width: '520px' }"
      :breakpoints="{ '600px': '90vw' }"
  >
    <div class="field">
      <FloatLabel>
        <InputText id="title" v-model="form.title"/>
        <label for="title">标题 *</label>
      </FloatLabel>
    </div>

    <div class="field">
      <FloatLabel>
        <InputText id="content" v-model="form.content"/>
        <label for="content">问题描述 *</label>
      </FloatLabel>
    </div>

    <div class="field">
      <FloatLabel>
        <InputText id="productModule" v-model="form.productModule"/>
        <label for="productModule">产品模块 *</label>
      </FloatLabel>
    </div>

    <div class="field">
      <FloatLabel>
        <Dropdown
            v-model="form.questionType"
            :options="typeOpts"
            placeholder="问题类型"
            class="w-full"
        />
        <label for="questionType">问题类型 *</label>
      </FloatLabel>
    </div>

    <div class="field">
      <FloatLabel>
        <Dropdown
            v-model="form.severity"
            :options="severityOpts"
            placeholder="严重等级"
            class="w-full"
        />
        <label for="severity">严重等级 *</label>
      </FloatLabel>
    </div>

    <div class="field">
      <FloatLabel>
        <Dropdown
            v-model="form.priority"
            :options="priorityOpts"
            placeholder="优先级"
            class="w-full"
        />
        <label for="priority">优先级 *</label>
      </FloatLabel>
    </div>

    <div class="field">
      <FloatLabel>
        <Calendar
            v-model="form.plannedResolutionDate"
            dateFormat="yy-mm-dd"
            showIcon
            class="w-full"
        />
        <label for="plannedResolutionDate">计划解决时间 *</label>
      </FloatLabel>
    </div>

    <div class="field">
      <FloatLabel>
        <InputText id="reportedBy" v-model="form.reportedBy"/>
        <label for="reportedBy">提出人 *</label>
      </FloatLabel>
    </div>

    <div class="field">
      <FloatLabel>
        <InputText id="responsiblePerson" v-model="form.responsiblePerson"/>
        <label for="responsiblePerson">责任人 *</label>
      </FloatLabel>
    </div>

    <template #footer>
      <Button label="取消" icon="pi pi-times" text @click="show = false"/>
      <Button label="保存" icon="pi pi-check" @click="submit"/>
    </template>
  </Dialog>
</template>

<style scoped>
.field {
  margin-bottom: 1.2rem;
}

.w-full {
  width: 100%;
}
</style>