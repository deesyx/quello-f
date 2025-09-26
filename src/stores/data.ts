import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// import { getQuestionDetail, searchQuestions  } from '@/api/question';
// import type { Question, QuestionDetail, QuestionSearchReq } from '@/types/question';
import { getQuestions, createQuestion, dashboardSearch, getQuestionTrends } from "@/api/question";

const periodMap = {
  '年': 'YEAR',
  '季度':'QUARTER', 
  '月': 'MONTH',
  '周': 'WEEK'
}
type PeriodKey = '年' | '季度' | '月' | '周';

const statusMap = {
  'REVIEWING': '待评审',
  'PENDING': '待处理',
  'PROCESSING': '处理中',
  'RESOLVED': '验收中',
  'IN_INSPECTION': '验收中',
  'COMPLETED': '已完成',
  'CLOSED': '已关闭',
}

export const useDataStore = defineStore('data', {
    state: () => ({
        //////// 筛选条件 ///////
        products: ['全部', '磐匠', '数字可信', '文旅', '信创'], // 产品线列表
        selectedProduct: '全部', // 选中的产品线
        modules: [], // 模块列表
        dateRange: null, // 日期范围
        periods: ['年', '季度', '月', '周'], // 周期
        selectedPeriod: '年' as PeriodKey,
        trendPeriods: ['月', '周'], // 周期
        selectedTrendPeriod: '月' as PeriodKey,
        // 日期范围
        startDate: null,
        endDate: null,
        // // 领域分类
        // type: null, // 用户研究、UI设计、其他

        // 筛选结果
        result: [], // 筛选结果

        // 数据总览
        // overview: {
        //   totalQuestions: 0, totalQuestionsGr: 0,
        //   adoptionRate: 0, adoptionRateGr: 0,
        //   newQuestions: 0, newQuestionsGr: 0,
        //   onScheduleResolutionRate: 0, onScheduleResolutionRateGr: 0,
        //   overtimeRate: 0, overtimeRateGr: 0,
        //   resolvedQuestions: 0, resolvedQuestionsGr: 0,
        // },

        status: [], // 状态分布

        questionTrendData:[], // 问题趋势数据


        // 写在一起
        data: {
          overview: {
            totalQuestions: 0, totalQuestionsGr: 0,
            adoptionRate: 0, adoptionRateGr: 0,
            newQuestions: 0, newQuestionsGr: 0,
            onScheduleResolutionRate: 0, onScheduleResolutionRateGr: 0,
            overtimeRate: 0, overtimeRateGr: 0,
            resolvedQuestions: 0, resolvedQuestionsGr: 0,
          },
          status: [], // 状态分布
        },

        // 问题列表
        questions:[
          {
            id: '1',
            productModule: '用户中心',
            page: '登录页面',
            title: '登录按钮点击无响应',
            content: '在移动设备上，当用户输入正确的账号密码后，点击登录按钮没有任何反应。需要多次点击才能成功登录。',
            questionType: '功能问题',
            severity: '高',
            reportedBy: '张三',
            reportedByGroup: '用户体验组',
            priority: 'P1',
            responsiblePerson: '李四',
            responsiblePersonGroup: '前端开发组',
            status: '已完成',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            plannedResolutionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            actualResolutionDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            includedInLibrary: true,
            screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=login%20button%20unresponsive%20mobile&sign=4e839cb75736e02bd8a23836e4440b58',
            optimizationSuggestion: '优化按钮点击区域大小，增加点击反馈',
            solution: '修复了按钮点击事件绑定问题，增加了加载状态提示',
            '验收情况': '问题已修复，点击响应正常，用户体验良好',
            source: '用户反馈',
            tag: '最佳实践',
          },
        ],
    }),
    getters: {
        // 总览
        // totalquestions: (state) => state.questions.length,
        // newIssue: (state) => state.questions.filter(issue => issue.status === '待评审').length,
        // solvedIssue: (state) => state.questions.filter(issue => issue.status === '已完成').length,
        // overdueIssue: (state) => state.questions.filter(issue => new Date(issue.plannedResolutionDate) < new Date()).length, // 这个日期比较的到时候写

        // // 采纳率
        // adopt: (state) => {
        //   return state.questions.filter(issue => {
        //     return issue.status !== '已关闭';
        //   }).length / state.questions.length * 100;
        // },
        
        // 状态分布
        // status: (state) => [
        //     { '状态': '待评审', '数量': state.questions.filter(issue => issue.status === '待评审').length },
        //     { '状态': '待处理', '数量': state.questions.filter(issue => issue.status === '待处理').length },
        //     { '状态': '处理中', '数量': state.questions.filter(issue => issue.status === '处理中').length },
        //     { '状态': '已解决', '数量': state.questions.filter(issue => issue.status === '已解决').length },
        //     { '状态': '验收中', '数量': state.questions.filter(issue => issue.status === '验收中').length },
        //     { '状态': '已完成', '数量': state.questions.filter(issue => issue.status === '已完成').length },
        //     { '状态': '已关闭', '数量': state.questions.filter(issue => issue.status === '已关闭').length },
        // ],

        overview: (state) => {
          // console.log('调用了getter：', state.data.overview)
          return state.data.overview;
        },

        // status: (state) => {
        //   // console.log('调用了getter：', state.data.status)
        //   return state.data.status;
        // },

        // 类型分布
        questionType: (state) => [
            { '问题类型': '功能问题', '个数': state.questions.filter(issue => issue.questionType === '功能问题').length },
            { '问题类型': '界面设计', '个数': state.questions.filter(issue => issue.questionType === '界面设计').length },
            { '问题类型': '性能问题', '个数': state.questions.filter(issue => issue.questionType === '性能问题').length },
            { '问题类型': '交互体验', '个数': state.questions.filter(issue => issue.questionType === '交互体验').length },
            { '问题类型': '内容问题', '个数': state.questions.filter(issue => issue.questionType === '内容问题').length },
            { '问题类型': '兼容性问题', '个数': state.questions.filter(issue => issue.questionType === '兼容性问题').length },
        ],

        // 严重程度分布
        severity: (state) => [
          { '等级': '严重', '数量': state.questions.filter(issue => issue.severity === '严重').length },
          { '等级': '高', '数量': state.questions.filter(issue => issue.severity === '高').length },
          { '等级': '中', '数量': state.questions.filter(issue => issue.severity === '中').length },
          { '等级': '低', '数量': state.questions.filter(issue => issue.severity === '低').length },
        ],

        // 产品模块分布
        prodModule: (state) => [
          { '产品模块': '全局', '数量': state.questions.filter(issue => issue.productModule === '全局').length },
          { '产品模块': '首页', '数量': state.questions.filter(issue => issue.productModule === '首页').length },
          { '产品模块': '消息中心', '数量': state.questions.filter(issue => issue.productModule === '消息中心').length },
          { '产品模块': '帮助中心', '数量': state.questions.filter(issue => issue.productModule === '帮助中心').length },
          { '产品模块': '设置', '数量': state.questions.filter(issue => issue.productModule === '设置').length },
          { '产品模块': '支付', '数量': state.questions.filter(issue => issue.productModule === '支付').length },
          { '产品模块': '搜索功能', '数量': state.questions.filter(issue => issue.productModule === '搜索功能').length },
          { '产品模块': '用户中心', '数量': state.questions.filter(issue => issue.productModule === '用户中心').length },
          { '产品模块': '订单管理', '数量': state.questions.filter(issue => issue.productModule === '订单管理').length },
        ],

        // 日期
        createdAt: (state) => {
          const currentYear = new Date().getFullYear();
          const result = [];
          
          for (let month = 0; month < 12; month++) {
            const startDate = new Date(currentYear, month, 1);
            const nextMonth = month === 11 ? 0 : month + 1;
            const endYear = month === 11 ? currentYear + 1 : currentYear;
            const endDate = new Date(endYear, nextMonth, 1);
            
            result.push({
              '日期': `${startDate.getMonth() + 1}月`,
              '数量': state.questions.filter(issue => {
                const reportDate = new Date(issue.createdAt);
                return reportDate >= startDate && reportDate < endDate;
              }).length
            });
          }
          
          return result;
        },

        // 来源
        source: (state) => {
          // 使用对象来定义来源类型，便于维护和扩展
          const sourceTypes = [
            '可用性测试',
            '竞品分析',
            '专家走查',
            '满意度调研',
            '用户反馈',
            '其他'
          ];
                      
          return sourceTypes.map(type => ({
            '研究方法': type,
            '数量': state.questions.filter(issue => issue.source === type).length
          }));
        },

        // 逾期
        overdue: (state) => {
          const now = new Date();
          return state.questions.filter(issue => {
            // 使用可选链操作符确保安全访问属性
            return issue.status !== '已完成' && 
                   issue.status !== '已关闭' && 
                   issue.plannedResolutionDate instanceof Date && 
                   issue.plannedResolutionDate < now;
          });
        },

        // 即将逾期
        overdueWarn: (state) => {
          const now = new Date();
          const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
          return state.questions.filter(issue => {
            // 使用可选链操作符确保安全访问属性
            return issue.status !== '已完成' && 
                   issue.status !== '已关闭' && 
                   issue.plannedResolutionDate instanceof Date && 
                   issue.plannedResolutionDate >= now &&  // 还未逾期
                   issue.plannedResolutionDate <= threeDaysLater; // 但3天内将逾期
          });
        },


        // 最新问题 - 按报告时间排序的前10个问题
        latestquestions: (state) => {
          // 创建副本避免修改原始数组，然后按报告时间从新到旧排序，取前10个
          return [...state.questions]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 10);
        },

        // 新增问题
        newlyAdded: (state) => {
          return state.questions
            // .filter(issue => issue.status === '待处理' || issue.status === '待评审')
            .sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            })
            .slice(0, 8);
        },



        // 问题价值分布
        tag: (state) => [
          { '价值': '最佳实践', '数量': state.questions.filter(issue => issue.tag === '最佳实践').length },
          { '价值': '避坑指南', '数量': state.questions.filter(issue => issue.tag === '避坑指南').length },
        ],

        // 入库数

        // 高频参考方案Top10
        // top10: (state) => state.questions.splice(0, 10).filter(issue => issue.solution.length > 0).map(issue => issue.solution),
        // top10: (state) => state.questions.filter(issue => issue.solution.length > 0).map(issue => issue.solution),

        // 按组统计问题数
        questionsByGroup: (state) => {
            const groupMap: Record<string, number> = {};
            state.questions.forEach(issue => {
                const group = issue.reportedByGroup;
                if (group) {
                    if (!groupMap[group]) {
                        groupMap[group] = 0;
                    }
                    groupMap[group]++;
                }
            });
            
            // 转换为数组格式
            return Object.keys(groupMap).map(group => ({
                '组别': group,
                '问题数': groupMap[group]
            }));
        },

    },
    actions: { 
      // async fetchData(questionId: string) {
      //   try {
      //     // loading.value = true;
      //     const response = await getQuestionDetail(questionId);
      //     if (response.data.code === 0) {
      //       // question.value = response.data.data;
      //       console.log(response.data.data);
      //     } else {
      //       // error.value = response.data.msg || '获取数据失败';
      //     }
      //   } catch (err) {
      //     // error.value = '网络请求异常';
      //     console.error('获取问题详情失败:', err);
      //   } finally {
      //     // loading.value = false;
      //   }
      // },
      // async fetchAllQuestions(searchParams: QuestionSearchReq) { 
      //   try {
      //     // loading.value = true;
      //     const response = await searchQuestions({
      //       ...searchParams,
      //       // ...searchParams.value,
      //       // page: pagination.value.page,
      //       // size: pagination.value.size
      //     });
          
      //     if (response.data.code === 0) {
      //       console.log(response.data.data);
      //       // questions.value = response.data.data.list;
      //       // pagination.value.total = response.data.data.total;
      //     } else {
      //       // error.value = response.data.msg || '获取列表失败';
      //     }
      //   } catch (err) {
      //     // error.value = '网络请求异常';
      //     console.error('获取问题列表失败:', err);
      //   } finally {
      //     // loading.value = false;
      //   }
      // }

      async getPageData() {
        try {
          const currentPage = ref(1);
          const pageSize = 10;
          // const dataList = ref<Array<any>>([]);
          const dataTotal = ref(0);
          await getQuestions({pageNo: currentPage.value, pageSize: pageSize}).then((res) => {
            const {list, total} = res.data;
            dataTotal.value = total;
            this.questions = list;
            console.log("获取到的问题：", this.questions);
          });
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      },

      createQuestion() { 
        createQuestion({title: '测试标题', content: '测试内容'}).then((res) => { 
          console.log(res);
        })
      },

      async getDashbaordData() { 
        try {
          const startDate = (this.dateRange ? new Date(this.dateRange[0]).toISOString() : new Date('2020-01-01').toISOString()).substring(0, 10);
          const endDate = (this.dateRange ? new Date(this.dateRange[1]).toISOString() : new Date().toISOString()).substring(0, 10);
          // console.log('开始日期: ', startDate, '结束日期: ', endDate);
          if (endDate === '1970-01-01') return this.overview;
      
          const response = await dashboardSearch({
            startDate, 
            endDate,
            period: periodMap[this.selectedPeriod]
          });
          
          console.log('getDashboardData: ', response.data);


          // this.data = response.data;


          this.data.overview = response.data.overview;
          // this.overview = this.data.overview;
          console.log('总问题数：', this.overview);

          this.data.status = response.data.statusDistributions.map((item: any) => ({
            '状态': statusMap[item.key as keyof typeof statusMap],
            '数量': item.value
          }));
          this.status = this.data.status;
          console.log('状态分布：', this.status);

          return response.data;
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          return this.overview; // Return current overview on error
        }
      },
      

      async getQuestionTrendsData() { 
        try {
          const startDate = (this.dateRange ? new Date(this.dateRange[0]).toISOString() : new Date('2020-01-01').toISOString()).substring(0, 10);
          const endDate = (this.dateRange ? new Date(this.dateRange[1]).toISOString() : new Date().toISOString()).substring(0, 10);
          if (endDate === '1970-01-01') return this.overview;

          const response = await getQuestionTrends({
            startDate, 
            endDate,
            period: periodMap[this.selectedTrendPeriod]
          });

          this.data = response.data;


          
          // 映射为中文字段名
          this.questionTrendData = response.data.map((item: any) => ({
            '日期': item.time,
            '数量': item.count
          }));
          console.log('新增问题趋势：（字段映射后）', this.questionTrendData);
          return this.questionTrendData;
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          return this.overview; // Return current overview on error
        }
      },
    }
})
