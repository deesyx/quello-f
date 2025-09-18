<template>
    <section>
        <div class="data-card" v-for="(item, index) in data" :key="index">
            <!-- <div>
                <img :src="getImageUrl(item.name+'.webp')" alt="">
            </div> -->
            <div>
                <h3>{{ item.name }}</h3>
                <span>{{ item.value }}</span>
            </div>
            <div ref="container" class="chart-container" :data-index="index"></div>
        </div>
    </section>
</template>


<script setup lang="js" name="home">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Chart } from '@antv/g2';

const getImageUrl = (filename) => {
  return new URL(`../../assets/images/${filename}`, import.meta.url).href;
};



const container = ref([]);
let charts = [];

const data = ref([
    {
        name: '产品数',
        value: 1240,
        ratio: 0.5,
    },
    {
        name: '用户量',
        value: 2580,
        ratio: 0.32,
    },
    {
        name: '订购量',
        value: 8500,
        ratio: 0.28,
    },
    {
        name: '交易额（元）',
        value: 14509,
        ratio: 0.28,
    },
]);



import { storeToRefs } from 'pinia';
import { useToolStore } from '@/stores/util';
const toolStore = useToolStore();
const { isLight, modeString } = storeToRefs(toolStore);
watch(isLight, () => {
  initCharts();
});

const initCharts = () => {
  // 清除之前创建的图表
  charts.forEach(chart => {
    if (chart) {
      chart.destroy();
    }
  });
  charts = [];

  // 为每个容器创建一个环图
  container.value.forEach((el, index) => {
    if (el) {
      const chart = new Chart({
        container: el,
        width: 100,
        height: 100,
        autoFit: false,
      });

      chart.coordinate({ type: 'theta', innerRadius: 0.9 });
      
      chart
        .options({
          theme: modeString.value
        })
        .interaction({ tooltip: false })
        .interval()
        .data([1, data.value[index].ratio])
        .encode('y', (d) => d)
        .encode('color', (d, idx) => idx)
        .scale('y', { domain: [0, 1] })
        .scale('color', { range: isLight.value ?  ['#eee', '#246CF9'] : ['#333', '#246CF9'] })
        .animate({ enter: { type: 'waveIn' } })
        .axis(false)
        .legend(false)
        .style('radius', 8); // 添加圆角

      chart
        .text()
        .style({
          text: `${Math.round(data.value[index].ratio * 100)}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 12,
          // 根据当前主题设置文本颜色
          fill: isLight.value ? '#333' : '#fff',
        });

      chart.render();
      charts.push(chart);
    }
  });
};

onMounted(() => {
  // 使用 nextTick 确保 DOM 已经渲染
  setTimeout(() => {
    initCharts();
  }, 0);
});

onUnmounted(() => {
  // 组件销毁时清除图表
  charts.forEach(chart => {
    if (chart) {
      chart.destroy();
    }
  });
  charts = [];
});
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
    background: var(--bg-color);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 8px;
    min-width: 250px;
    overflow: hidden;
    // margin-right: 26px;
    display: flex;
    // justify-content: center;
    justify-content: space-between;
    align-items: center;
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
    div {
        margin-left: 20px;
        color: var(--text-color);
        font-size: 20px;
        font-weight: 500;
        align-items: center;
    }
}

.chart-container {
  width: 100px;
  height: 100px;
  margin-left: auto;
}
</style>