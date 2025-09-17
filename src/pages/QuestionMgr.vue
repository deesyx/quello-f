<script setup lang="ts">
import {ref} from "vue";
import {getQuestions} from "@/api/question";

const currentPage = ref(1);
const pageSize = 12;
const dataList = ref<Array<any>>([]);
const dataTotal = ref(0);

const getPageData = () => {
  currentPage.value
  getQuestions({pageNo: currentPage.value, pageSize: pageSize}).then((res) => {
    const {list, total} = res.data;
    dataTotal.value = total;
    list.forEach((item: any) => {
      dataList.value.push(item);
    });
  });
};

const loadMore = () => {
  currentPage.value += 1;
  getPageData();
};

const initData = () => {
  getPageData();
};
initData();
</script>

<template>
  <div>
    <ul class="agree-container" v-infinite-scroll="loadMore">
      <li class="agree-item" v-for="(item, index) in dataList" :key="index">
        <div class="main">
          <span>{{ item.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
textarea {
  overflow: auto;
}

.agree-container {
  width: 40rem;
  height: 90vh;

  .agree-item {
    display: flex;
    flex-direction: row;
    padding-top: 24px;

    .user-avatar {
      margin-right: 24px;
      flex-shrink: 0;

      .avatar-item {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 100%;
        border: 1px solid rgba(0, 0, 0, 0.08);
        object-fit: cover;
      }
    }

    .main {
      flex-grow: 1;
      flex-shrink: 1;
      display: flex;
      flex-direction: row;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      .info {
        flex-grow: 1;
        flex-shrink: 1;

        .user-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;

          a {
            color: #333;
            font-size: 16px;
            font-weight: 600;
          }
        }

        .interaction-hint {
          font-size: 14px;
          color: rgba(51, 51, 51, 0.6);
          margin-bottom: 8px;
        }

        .interaction-content {
          display: flex;
          font-size: 14px;
          color: #333;
          line-height: 140%;
          cursor: pointer;
          margin-bottom: 12px;

          .msg-count {
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 13px;
            color: #fff;
            background-color: red;
            text-align: center;
            border-radius: 100%;
          }
        }

        .quote-info {
          font-size: 12px;
          display: flex;
          align-items: center;
          color: rgba(51, 51, 51, 0.6);
          margin-bottom: 12px;
          cursor: pointer;
        }

        .quote-info::before {
          content: "";
          display: inline-block;
          border-radius: 8px;
          margin-right: 6px;
          width: 4px;
          height: 17px;
          background: rgba(0, 0, 0, 0.08);
        }
      }

      .extra {
        min-width: 48px;
        flex-shrink: 0;
        margin-left: 24px;

        .extra-image {
          cursor: pointer;
          width: 48px;
          height: 48px;
          border: 1px solid rgba(0, 0, 0, 0.02);
          border-radius: 6px;
          object-fit: cover;
        }
      }
    }
  }
}
</style>