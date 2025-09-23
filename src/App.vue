<script setup>
import QuestionTable from '@/components/QuestionTable.vue'
import Toast from 'primevue/toast'
</script>

<template>
  <div>
    <Toast position="top-right" />   <!-- ③ 提供实例 -->
    <router-view />
  </div>
  <div class="wrapper">
    <QuestionTable/>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
