import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// import { getQuestionDetail, searchQuestions  } from '@/api/question';
// import type { QuestionDetail, QuestionSearchReq } from '@/types/question';
import {getQuestions} from "@/api/question";

export const useDataStore = defineStore('data', {
    state: () => ({
        //////// 筛选条件 ///////
        products: ['全部', '磐匠', '数字可信', '文旅', '信创'], // 产品线列表
        selectedProduct: '全部', // 选中的产品线
        modules: [], // 模块列表
        dateRange: null, // 日期范围
        periods: ['年', '季度', '月', '周'], // 周期
        selectedPeriod: '年',
        // 日期范围
        startDate: null,
        endDate: null,
        // // 领域分类
        // type: null, // 用户研究、UI设计、其他

        // 筛选结果
        result: [], // 筛选结果

        // 问题列表
        questions:[],
        //{
        //     "id": 1,
        //     "questionId": "Q20250315001",
        //     "title": "登录按钮点击无响应",
        //     "content": "在Chrome浏览器下，点击登录按钮后无任何反应，控制台显示JS错误：Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')",
        //     "productModule": "用户中心",
        //     "questionType": "FUNCTION",
        //     "severity": "MEDIUM",
        //     "status": "COMPLETED",
        //     "priority": "P0",
        //     "plannedResolutionDate": "2025-03-20",
        //     "actualResolutionDate": "2025-03-18",
        //     "reportedBy": "张伟",
        //     "responsiblePerson": "李娜",
        //     "version": 2,
        //     "createdAt": "2025-03-15T09:15:22",
        //     "updatedAt": "2025-09-16T13:50:22"
        // }
        issues: [
            {
                id: '1',
                productModule: '用户中心',
                page: '登录页面',
                issueSummary: '登录按钮点击无响应',
                issueDetails: '在移动设备上，当用户输入正确的账号密码后，点击登录按钮没有任何反应。需要多次点击才能成功登录。',
                issueType: '功能问题',
                impactRating: '高',
                reporter: '张三',
                reporterGroup: '用户体验组',
                acceptanceStatus: '已采纳',
                priority: 'P1',
                assignee: '李四',
                assigneeGroup: '前端开发组',
                status: '已完成',
                reportTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                actualResolutionTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                includedInLibrary: true,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=login%20button%20unresponsive%20mobile&sign=4e839cb75736e02bd8a23836e4440b58',
                optimizationSuggestion: '优化按钮点击区域大小，增加点击反馈',
                solution: '修复了按钮点击事件绑定问题，增加了加载状态提示',
                '验收情况': '问题已修复，点击响应正常，用户体验良好',
                source: '用户反馈',
                tag: '最佳实践',
              },
              {
                id: '2',
                productModule: '用户中心',
                page: '注册页面',
                issueSummary: '验证码输入框无法获取焦点',
                issueDetails: '在iOS设备上，用户完成短信验证后，验证码输入框偶尔无法获取焦点，导致无法完成注册流程。',
                issueType: '功能问题',
                impactRating: '中',
                reporter: '王五',
                reporterGroup: '测试组',
                acceptanceStatus: '已采纳',
                priority: 'P1',
                assignee: '钱七',
                assigneeGroup: '前端开发组',
                status: '处理中',
                reportTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=verification%20code%20input%20focus%20issue&sign=19b18f391aacb7dd9fdcfe94a8adaf62',
                optimizationSuggestion: '优化输入框焦点管理逻辑，增加自动聚焦功能',
                solution: '',
                '验收情况': '',
                source: '用户反馈',
                tag: '最佳实践',
              },
              {
                id: '3',
                productModule: '用户中心',
                page: '个人资料页',
                issueSummary: '头像上传后预览不更新',
                issueDetails: '用户上传新头像并成功保存后，页面上的头像预览仍显示旧头像，需要刷新页面才能看到更新。',
                issueType: '功能问题',
                impactRating: '低',
                reporter: '孙八',
                reporterGroup: '运营组',
                acceptanceStatus: '已采纳',
                priority: 'P3',
                assignee: '李四',
                assigneeGroup: '前端开发组',
                status: '待处理',
                reportTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=avatar%20preview%20not%20updating&sign=dd573d5019d42ff75247d9c314d78275',
                optimizationSuggestion: '上传成功后立即更新预览图，无需刷新页面',
                solution: '',
                '验收情况': '',
                source: '竞品分析',
                tag: '最佳实践',
              },
              
              // 2. 商品相关问题
              {
                id: '4',
                productModule: '商品列表',
                page: '商品列表页',
                issueSummary: '商品卡片加载缓慢',
                issueDetails: '在商品数量较多时，商品列表滚动加载卡顿，图片显示延迟严重。',
                issueType: '性能问题',
                impactRating: '中',
                reporter: '王五',
                reporterGroup: '测试组',
                acceptanceStatus: '已采纳',
                priority: 'P2',
                assignee: '赵六',
                assigneeGroup: '前端开发组',
                status: '处理中',
                reportTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=product%20list%20loading%20slow&sign=db9951553a9a04272845166817f45cc2',
                optimizationSuggestion: '实现图片懒加载和分页加载机制',
                solution: '',
                '验收情况': '',
                source: '竞品分析',
                tag: '最佳实践',

              },
              {
                id: '5',
                productModule: '商品详情',
                page: '商品详情页',
                issueSummary: '图片放大功能卡顿',
                issueDetails: '点击商品图片查看大图时，图片加载缓慢且缩放操作卡顿，尤其在网络环境较差时更为明显。',
                issueType: '性能问题',
                impactRating: '中',
                reporter: '张三',
                reporterGroup: '用户体验组',
                acceptanceStatus: '已采纳',
                priority: 'P2',
                assignee: '赵六',
                assigneeGroup: '前端开发组',
                status: '验收中',
                reportTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                actualResolutionTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=product%20image%20zoom%20lag&sign=33e90d60e9d4567be9579b2c071cc140',
                optimizationSuggestion: '优化图片加载策略，使用渐进式加载和缩略图预览',
                solution: '实现了图片懒加载和渐进式加载，优化了缩放动画性能',
                '验收情况': '图片加载速度明显提升，缩放操作流畅',
                source: '竞品分析',
                tag: '最佳实践',
              },
              {
                id: '6',
                productModule: '商品详情',
                page: '商品评价页',
                issueSummary: '评价图片显示变形',
                issueDetails: '用户上传的方形评价图片在展示时被拉伸为圆形，导致图片内容变形，影响查看体验。',
                issueType: '界面设计',
                impactRating: '低',
                reporter: '周九',
                reporterGroup: '产品组',
                acceptanceStatus: '已采纳',
                priority: 'P3',
                assignee: '吴十',
                assigneeGroup: '前端开发组',
                status: '已完成',
                reportTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                actualResolutionTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                includedInLibrary: true,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=review%20image%20distortion&sign=73f19632a8e987652e437ac7f2192359',
                optimizationSuggestion: '修改图片展示方式，使用方形或圆角矩形展示评价图片',
                solution: '将评价图片容器修改为圆角矩形，保持图片原有比例',
                '验收情况': '图片显示正常，无变形问题',
                source: '可用性测试',
                tag: '最佳实践',
              },
              
              // 3. 购物车相关问题
              {
                id: '7',
                productModule: '购物车',
                page: '购物车页面',
                issueSummary: '商品数量修改后总价未实时更新',
                issueDetails: '用户修改购物车中商品数量后，商品小计金额更新，但页面底部的订单总价未实时更新，需要刷新页面才能显示正确金额。',
                issueType: '功能问题',
                impactRating: '高',
                reporter: '张三',
                reporterGroup: '用户体验组',
                acceptanceStatus: '已采纳',
                priority: 'P0',
                assignee: '钱七',
                assigneeGroup: '前端开发组',
                status: '处理中',
                reportTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=cart%20total%20price%20not%20updating&sign=5b63f209db075d0dcac867c3df68abba',
                optimizationSuggestion: '优化价格计算逻辑，确保数量变更时实时更新总价',
                solution: '',
                '验收情况': '',
                source: '可用性测试',
                tag: '最佳实践',

              },
              {
                id: '8',
                productModule: '购物车',
                page: '购物车页面',
                issueSummary: '商品删除后无确认提示',
                issueDetails: '用户点击删除购物车商品时，系统未弹出确认提示框，直接删除商品，容易导致误操作。',
                issueType: '交互体验',
                impactRating: '中',
                reporter: '周九',
                reporterGroup: '产品组',
                acceptanceStatus: '已采纳',
                priority: 'P2',
                assignee: '吴十',
                assigneeGroup: '前端开发组',
                status: '已完成',
                reportTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
                actualResolutionTime: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
                includedInLibrary: true,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=cart%20item%20delete%20no%20confirmation&sign=91c8d8532a8151154c64aabaaaa53e79',
                optimizationSuggestion: '添加删除确认弹窗，防止用户误操作',
                solution: '实现了删除确认弹窗功能，用户点击删除后需二次确认',
                '验收情况': '删除确认功能正常，有效防止误操作',
                source: '可用性测试',
                tag: '避坑指南',

              },
              
              // 4. 订单相关问题
              {
                id: '9',
                productModule: '订单管理',
                page: '订单列表页',
                issueSummary: '订单状态筛选无效',
                issueDetails: '在订单列表页选择"待发货"筛选条件后，页面仍然显示所有状态的订单，筛选功能失效。',
                issueType: '功能问题',
                impactRating: '中',
                reporter: '王五',
                reporterGroup: '测试组',
                acceptanceStatus: '已采纳',
                priority: 'P1',
                assignee: '郑十一',
                assigneeGroup: '后端开发组',
                status: '处理中',
                reportTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=order%20status%20filter%20not%20working&sign=192f6c53e05ed031123bc899bde1bbda',
                optimizationSuggestion: '修复筛选接口参数传递问题，确保状态筛选正确生效',
                solution: '',
                '验收情况': '',
                source: '专家走查',
                tag: '避坑指南',
              },
              {
                id: '10',
                productModule: '订单管理',
                page: '订单详情页',
                issueSummary: '物流信息不更新',
                issueDetails: '订单发货后，订单详情页的物流信息长时间不更新，用户无法追踪最新物流状态。',
                issueType: '功能问题',
                impactRating: '高',
                reporter: '孙八',
                reporterGroup: '运营组',
                acceptanceStatus: '已采纳',
                priority: 'P1',
                assignee: '郑十一',
                assigneeGroup: '后端开发组',
                status: '待处理',
                reportTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=logistics%20information%20not%20updating&sign=36f400e2a835bb8f8ff11a78e98e4af5',
                optimizationSuggestion: '优化物流信息拉取机制，增加定时更新和手动刷新功能',
                solution: '',
                '验收情况': '',
                source: '专家走查',
                tag: '避坑指南',
              },
              
              // 5. 支付相关问题
              {
                id: '11',
                productModule: '支付',
                page: '结算页面',
                issueSummary: '优惠券选择后金额未重新计算',
                issueDetails: '用户选择优惠券后，订单金额未重新计算，仍显示原价，需要重新进入结算页面才能生效。',
                issueType: '功能问题',
                impactRating: '高',
                reporter: '张三',
                reporterGroup: '用户体验组',
                acceptanceStatus: '已采纳',
                priority: 'P0',
                assignee: '钱七',
                assigneeGroup: '前端开发组',
                status: '已关闭',
                reportTime: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
                actualResolutionTime: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
                includedInLibrary: true,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=coupon%20discount%20not%20applied&sign=9c29cd28db36312964aa2f581bad3de8',
                optimizationSuggestion: '优化优惠券选择逻辑，实时更新订单金额',
                solution: '修复了优惠券选择事件监听，实现金额实时计算更新',
                '验收情况': '优惠券选择后金额实时更新，功能正常',
                source: '专家走查',
                tag: '避坑指南',

              },
              {
                id: '12',
                productModule: '支付',
                page: '支付结果页',
                issueSummary: '支付成功后跳转延迟',
                issueDetails: '用户完成支付后，页面停留在支付中状态超过10秒才跳转到支付成功页面，期间用户可能会重复点击。',
                issueType: '性能问题',
                impactRating: '中',
                reporter: '王五',
                reporterGroup: '测试组',
                acceptanceStatus: '已采纳',
                priority: 'P2',
                assignee: '郑十一',
                assigneeGroup: '后端开发组',
                status: '处理中',
                reportTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=payment%20success%20redirect%20delay&sign=a2ee61e608d179dc30eebf787270f36a',
                optimizationSuggestion: '优化支付结果轮询机制，减少轮询间隔时间',
                solution: '',
                '验收情况': '',
                source: '专家走查',
                tag: '避坑指南',
              },
              
              // 6. 搜索相关问题
              {
                id: '13',
                productModule: '搜索功能',
                page: '搜索结果页',
                issueSummary: '搜索结果与关键词相关性低',
                issueDetails: '用户搜索特定商品关键词时，搜索结果排序混乱，相关性低的商品排在前面，影响查找效率。',
                issueType: '功能问题',
                impactRating: '高',
                reporter: '周九',
                reporterGroup: '产品组',
                acceptanceStatus: '待讨论',
                priority: 'P1',
                assignee: '郑十一',
                assigneeGroup: '后端开发组',
                status: '待处理',
                reportTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=search%20results%20irrelevant&sign=31108625145f4b9d408db848c3109494',
                optimizationSuggestion: '优化搜索算法，提高结果相关性排序',
                solution: '',
                '验收情况': '',
                source: '专家走查',
                tag: '避坑指南',
                
              },
              {
                id: '14',
                productModule: '搜索功能',
                page: '搜索框',
                issueSummary: '搜索历史记录无法删除',
                issueDetails: '用户希望删除特定搜索历史记录，但系统未提供删除功能，只能清除全部历史记录。',
                issueType: '交互体验',
                impactRating: '低',
                reporter: '孙八',
                reporterGroup: '运营组',
                acceptanceStatus: '已采纳',
                priority: 'P3',
                assignee: '吴十',
                assigneeGroup: '前端开发组',
                status: '处理中',
                reportTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=search%20history%20cannot%20delete&sign=388e0787638ad9e98c183b87c6a459bc',
                optimizationSuggestion: '添加单条搜索历史删除功能，支持长按删除',
                solution: '',
                '验收情况': '',
                source: '专家走查',
                tag: '避坑指南',

              },
              
              // 7. 首页相关问题
              {
                id: '15',
                productModule: '首页',
                page: '首页轮播',
                issueSummary: '轮播图切换动画卡顿',
                issueDetails: '首页轮播图自动切换时动画卡顿，特别是在低端Android设备上更为明显，影响整体页面流畅度。',
                issueType: '性能问题',
                impactRating: '中',
                reporter: '张三',
                reporterGroup: '用户体验组',
                acceptanceStatus: '已采纳',
                priority: 'P2',
                assignee: '赵六',
                assigneeGroup: '前端开发组',
                status: '已完成',
                reportTime: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
                actualResolutionTime: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
                includedInLibrary: true,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=carousel%20animation%20lag&sign=70b069b96283c7f1a8fcd3351bfd48a4',
                optimizationSuggestion: '优化轮播图动画实现，使用CSS动画替代JS动画',
                solution: '重构了轮播图组件，使用CSS transform和transition实现平滑动画',
                '验收情况': '轮播切换流畅，无卡顿现象',
                source: '专家走查',
                tag: '避坑指南',

              },
              {
                id: '16',
                productModule: '首页',
                page: '推荐商品区',
                issueSummary: '推荐商品重复展示',
                issueDetails: '首页推荐商品区域存在大量重复商品，同一商品出现3-4次，影响用户体验和页面美观度。',
                issueType: '内容问题',
                impactRating: '低',
                reporter: '周九',
                reporterGroup: '产品组',
                acceptanceStatus: '已采纳',
                priority: 'P3',
                assignee: '孙八',
                assigneeGroup: '运营组',
                status: '已完成',
                reportTime: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                actualResolutionTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                includedInLibrary: true,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=duplicate%20recommended%20products&sign=e4e7c63b25b2f37bf4935b7763e3b2a8',
                optimizationSuggestion: '优化推荐算法，增加去重逻辑，确保商品不重复展示',
                solution: '调整了推荐算法参数，增加了商品去重逻辑',
                '验收情况': '推荐商品无重复，展示多样化',
                source: '专家走查',
                tag: '避坑指南',


              },
              
              // 8. 其他模块问题
              {
                id: '17',
                productModule: '消息中心',
                page: '消息列表',
                issueSummary: '未读消息标记不消失',
                issueDetails: '用户阅读消息后，未读消息的红点标记仍然显示，无法清除，导致用户无法区分已读和未读消息。',
                issueType: '功能问题',
                impactRating: '中',
                reporter: '王五',
                reporterGroup: '测试组',
                acceptanceStatus: '已采纳',
                priority: 'P2',
                assignee: '钱七',
                assigneeGroup: '前端开发组',
                status: '待评审',
                reportTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=unread%20message%20indicator%20stuck&sign=2cf38ff1f2ca7c3917e2f3d0de308de8',
                optimizationSuggestion: '修复消息已读状态同步问题，确保阅读后标记正确清除',
                solution: '',
                '验收情况': '',
                source: '专家走查',
                tag: '避坑指南',


              },
              {
                id: '18',
                productModule: '设置',
                page: '隐私设置页',
                issueSummary: '开关按钮状态不一致',
                issueDetails: '在隐私设置页面，部分功能的开关按钮显示状态与实际设置不一致，用户需要多次点击才能同步。',
                issueType: '功能问题',
                impactRating: '低',
                reporter: '张三',
                reporterGroup: '用户体验组',
                acceptanceStatus: '已采纳',
                priority: 'P3',
                assignee: '吴十',
                assigneeGroup: '前端开发组',
                status: '验收中',
                reportTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                actualResolutionTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=toggle%20button%20status%20inconsistent&sign=770d98be4bf427855c384715d4a40202',
                optimizationSuggestion: '优化开关状态管理，确保UI显示与实际状态一致',
                solution: '修复了状态同步问题，实现了双向绑定',
                '验收情况': '开关状态显示正确，操作流畅',
                source: '专家走查',
                tag: '避坑指南',


              },
              {
                id: '19',
                productModule: '帮助中心',
                page: 'FAQ页面',
                issueSummary: '搜索框无法输入中文',
                issueDetails: '在帮助中心FAQ页面，搜索框无法输入中文字符，只能输入英文和数字，影响中文用户使用。',
                issueType: '功能问题',
                impactRating: '中',
                reporter: '孙八',
                reporterGroup: '运营组',
                acceptanceStatus: '已采纳',
                priority: 'P2',
                assignee: '钱七',
                assigneeGroup: '前端开发组',
                status: '已关闭',
                reportTime: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000),
                actualResolutionTime: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
                includedInLibrary: true,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=search%20cannot%20input%20chinese&sign=1b097cdc0340a068069c229a3fb66c68',
                optimizationSuggestion: '修复输入框中文输入问题，确保支持多种输入法',
                solution: '修复了输入框事件监听问题，支持中文输入',
                '验收情况': '中文输入功能正常，支持多种输入法',
                source: '其他',
                tag: '避坑指南',


              },
              {
                id: '20',
                productModule: '全局',
                page: '所有页面',
                issueSummary: '深色模式下部分文字不可见',
                issueDetails: '在深色模式下，部分页面的提示文字和链接颜色与背景对比度不足，导致文字难以辨认。',
                issueType: '界面设计',
                impactRating: '中',
                reporter: '周九',
                reporterGroup: '产品组',
                acceptanceStatus: '已采纳',
                priority: 'P2',
                assignee: '吴十',
                assigneeGroup: '前端开发组',
                status: '处理中',
                reportTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                plannedResolutionTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                includedInLibrary: false,
                screenshotUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=dark%20mode%20text%20visibility&sign=0f96ffa432bcb593c7a0d58235ad6bc8',
                optimizationSuggestion: '调整深色模式下的文字颜色，提高对比度，确保符合WCAG标准',
                solution: '',
                '验收情况': '',
                source: '满意度调研',
                tag: '避坑指南',


              }
        ],
    }),
    getters: {
        // 总览
        totalIssues: (state) => state.issues.length,
        newIssue: (state) => state.issues.filter(issue => issue.status === '待评审').length,
        solvedIssue: (state) => state.issues.filter(issue => issue.status === '已完成').length,
        overdueIssue: (state) => state.issues.filter(issue => new Date(issue.plannedResolutionTime) < new Date()).length, // 这个日期比较的到时候写

        // 采纳率
        adopt: (state) => {
          return state.issues.filter(issue => {
            return issue.status !== '已关闭';
          }).length / state.issues.length * 100;
        },
        
        // 状态分布
        status: (state) => [
            { '状态': '待评审', '数量': state.issues.filter(issue => issue.status === '待评审').length },
            { '状态': '待处理', '数量': state.issues.filter(issue => issue.status === '待处理').length },
            { '状态': '处理中', '数量': state.issues.filter(issue => issue.status === '处理中').length },
            { '状态': '已解决', '数量': state.issues.filter(issue => issue.status === '已解决').length },
            { '状态': '验收中', '数量': state.issues.filter(issue => issue.status === '验收中').length },
            { '状态': '已完成', '数量': state.issues.filter(issue => issue.status === '已完成').length },
            { '状态': '已关闭', '数量': state.issues.filter(issue => issue.status === '已关闭').length },
        ],

        // 类型分布
        issueType: (state) => [
            { '问题类型': '功能问题', '个数': state.issues.filter(issue => issue.issueType === '功能问题').length },
            { '问题类型': '界面设计', '个数': state.issues.filter(issue => issue.issueType === '界面设计').length },
            { '问题类型': '性能问题', '个数': state.issues.filter(issue => issue.issueType === '性能问题').length },
            { '问题类型': '交互体验', '个数': state.issues.filter(issue => issue.issueType === '交互体验').length },
            { '问题类型': '内容问题', '个数': state.issues.filter(issue => issue.issueType === '内容问题').length },
            { '问题类型': '兼容性问题', '个数': state.issues.filter(issue => issue.issueType === '兼容性问题').length },
        ],

        // 严重程度分布
        impactRating: (state) => [
          { '等级': '严重', '数量': state.issues.filter(issue => issue.impactRating === '严重').length },
          { '等级': '高', '数量': state.issues.filter(issue => issue.impactRating === '高').length },
          { '等级': '中', '数量': state.issues.filter(issue => issue.impactRating === '中').length },
          { '等级': '低', '数量': state.issues.filter(issue => issue.impactRating === '低').length },
        ],

        // 产品模块分布
        prodModule: (state) => [
          { '产品模块': '全局', '数量': state.issues.filter(issue => issue.productModule === '全局').length },
          { '产品模块': '首页', '数量': state.issues.filter(issue => issue.productModule === '首页').length },
          { '产品模块': '消息中心', '数量': state.issues.filter(issue => issue.productModule === '消息中心').length },
          { '产品模块': '帮助中心', '数量': state.issues.filter(issue => issue.productModule === '帮助中心').length },
          { '产品模块': '设置', '数量': state.issues.filter(issue => issue.productModule === '设置').length },
          { '产品模块': '支付', '数量': state.issues.filter(issue => issue.productModule === '支付').length },
          { '产品模块': '搜索功能', '数量': state.issues.filter(issue => issue.productModule === '搜索功能').length },
          { '产品模块': '用户中心', '数量': state.issues.filter(issue => issue.productModule === '用户中心').length },
          { '产品模块': '订单管理', '数量': state.issues.filter(issue => issue.productModule === '订单管理').length },
        ],

        // 日期
        reportTime: (state) => {
          const currentYear = new Date().getFullYear();
          const result = [];
          
          for (let month = 0; month < 12; month++) {
            const startDate = new Date(currentYear, month, 1);
            const nextMonth = month === 11 ? 0 : month + 1;
            const endYear = month === 11 ? currentYear + 1 : currentYear;
            const endDate = new Date(endYear, nextMonth, 1);
            
            result.push({
              '日期': `${startDate.getMonth() + 1}月`,
              '数量': state.issues.filter(issue => {
                const reportDate = new Date(issue.reportTime);
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
            '数量': state.issues.filter(issue => issue.source === type).length
          }));
        },

        // 逾期
        overdue: (state) => {
          const now = new Date();
          return state.issues.filter(issue => {
            // 使用可选链操作符确保安全访问属性
            return issue.status !== '已完成' && 
                   issue.status !== '已关闭' && 
                   issue.plannedResolutionTime instanceof Date && 
                   issue.plannedResolutionTime < now;
          });
        },

        // 即将逾期
        overdueWarn: (state) => {
          const now = new Date();
          const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
          return state.issues.filter(issue => {
            // 使用可选链操作符确保安全访问属性
            return issue.status !== '已完成' && 
                   issue.status !== '已关闭' && 
                   issue.plannedResolutionTime instanceof Date && 
                   issue.plannedResolutionTime >= now &&  // 还未逾期
                   issue.plannedResolutionTime <= threeDaysLater; // 但3天内将逾期
          });
        },


        // 最新问题 - 按报告时间排序的前10个问题
        latestIssues: (state) => {
          // 创建副本避免修改原始数组，然后按报告时间从新到旧排序，取前10个
          return [...state.issues]
            .sort((a, b) => new Date(b.reportTime).getTime() - new Date(a.reportTime).getTime())
            .slice(0, 10);
        },

        // 新增问题
        newlyAdded: (state) => {
          return state.issues
            // .filter(issue => issue.status === '待处理' || issue.status === '待评审')
            .sort((a, b) => {
              const dateA = new Date(a.reportTime).getTime();
              const dateB = new Date(b.reportTime).getTime();
              return dateB - dateA;
            })
            .slice(0, 8);
        },



        // 问题价值分布
        tag: (state) => [
          { '价值': '最佳实践', '数量': state.issues.filter(issue => issue.tag === '最佳实践').length },
          { '价值': '避坑指南', '数量': state.issues.filter(issue => issue.tag === '避坑指南').length },
        ],

        // 入库数

        // 高频参考方案Top10
        // top10: (state) => state.issues.splice(0, 10).filter(issue => issue.solution.length > 0).map(issue => issue.solution),
        top10: (state) => state.issues.filter(issue => issue.solution.length > 0).map(issue => issue.solution),

        // 按组统计问题数
        issuesByGroup: (state) => {
            const groupMap: Record<string, number> = {};
            state.issues.forEach(issue => {
                const group = issue.reporterGroup;
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

      getPageData() {
        const currentPage = ref(1);
        const pageSize = 10;
        // const dataList = ref<Array<any>>([]);
        const dataTotal = ref(0);
        getQuestions({pageNo: currentPage.value, pageSize: pageSize}).then((res) => {
          const {list, total} = res.data.data;
          dataTotal.value = total;
          this.questions = list;
          console.log(this.questions);
        });
      }
    }
})