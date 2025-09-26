import http from "@/utils/request";
import type {PageParam, QuestionDetail, dashboardSearchReq} from "@/types/page";

export const getQuestions = async (req: PageParam) => {
    return http<any>({
        url: `/questions/search`,
        method: "post",
        data: req
    });
};

export const createQuestion = (req: QuestionDetail) => {
    return http<any>({
        url: `/questions/creation`,
        method: "post",
        data: req
    });
};

export const dashboardSearch = (req: dashboardSearchReq) => {
    return http<any>({
        url: `/dashboard/detail`,
        method: "post",
        data: req
    });
};

/** 
 * 新增问题趋势
 * @param {object} params DashboardSearchReq
 * @param {string} params.productModule 产品模块
 * @param {object} params.startDate 开始日期
 * @param {object} params.endDate 结束日期
 * @param {string} params.period 周期,可用值:YEAR,QUARTER,MONTH,WEEK
 * @returns
 */
export const getQuestionTrends = (req: dashboardSearchReq) => {
    return http<any>({
        url: `/dashboard/question-trends`,
        method: "post",
        data: req
    });
};

// /**
//  * 获取问题详情
//  * @param questionId 问题ID (如 Q20250315001)
//  */
// export const getQuestionDetail = (questionId: string) => {
//   return http.get<ApiResponse<QuestionDetail>>(`/questions/${questionId}/detail`);
// };

// // 其他接口方法...

// /**
//  * 搜索问题列表
//  * @param params 搜索参数
//  */
// export const searchQuestions = (params: QuestionSearchReq = {}) => {
//   // 默认分页参数
//   const defaultParams = {
//     page: 1,
//     size: 10,
//     ...params
//   };
  
//   return http.post<ApiResponse<PageResult<QuestionDetail>>>('/questions/search', defaultParams);
// };
