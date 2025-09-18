<template>
    <section>
        <div class="data-card" v-for="(item, index) in data" :key="index">
            <img :src="getImageUrl(item.name+'.webp')" alt="">
            <div :style="`color: ${item.color}`" class="value-display">
                <h3>{{ item.name }}</h3>
                <div>{{ item.value }}</div>
            </div>
        </div>
    </section>
</template>


<script setup lang="js" name="home">
import { onMounted, onUnmounted, ref } from 'vue';

const getImageUrl = (filename) => {
  return new URL(`../../assets/images/${filename}`, import.meta.url).href;
};


const data = ref([
    {
        name: '产品数',
        value: 1240,
        color: '#9333EA'
    },
    {
        name: '用户量',
        value: 2580,
        color: '#2563EB'
    },
    {
        name: '订购量',
        value: 8500,
        color: '#16A34A'
    },
    {
        name: '交易额（元）',
        value: 14509,
        color: '#D97706'
    },
]);

</script>

<style lang="scss" scoped>
section {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 32px;
    width: 100%;
    justify-content: center;
}
.data-card {
    // background: #1E1F25;
    background: var(--bg-color);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    min-width: 175px;
    overflow: hidden;
    // margin-right: 26px;
    display: flex;
    h3 {
        color: #757B8C;
        font-size: 14px;
        font-weight: normal;
    }
    img {
        width: 35px;
        height: 35px;
        margin-right: 15px;
    }
    div.value-display {
        color: var(--text-color);
        font-size: 20px;
        font-weight: 500;
    }
}
</style>