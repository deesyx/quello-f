import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Button from 'primevue/button'; // 引入组件

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark'
        }
    },
    locale: {
         // 以下为中文配置项
         startsWith: '开头是',
         contains: '包含',
         notContains: '不包含',
         endsWith: '结尾是',
         equals: '等于',
         notEquals: '不等于',
         noFilter: '无筛选',
         lt: '小于',
         lte: '小于等于',
         gt: '大于',
         gte: '大于等于',
         dateIs: '日期是',
         dateIsNot: '日期不是',
         dateBefore: '日期早于',
         dateAfter: '日期晚于',
         clear: '清除',
         apply: '应用',
         accept: '是',
         reject: '否',
         choose: '选择',
         upload: '上传',
         cancel: '取消',
         dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
         dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
         dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
         monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
         monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
         today: '今天',
         weekHeader: '周',
         firstDayOfWeek: 0,
         dateFormat: 'yyyy/mm/dd',
         weak: '弱',
         medium: '中',
         strong: '强',
         passwordPrompt: '请输入密码',
         emptyFilterMessage: '未找到结果', // 由 'No results found' 翻译而来
         emptyMessage: '无可用数据',         // 由 'No available data' 翻译而来
         // ... 可以根据需要添加更多组件的翻译文本
    }
});
app.component('Button', Button); // 全局注册组件
app.mount('#app')
