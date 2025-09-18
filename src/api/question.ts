import request from "@/utils/request";
import type {PageParam} from "@/types/page";

export const getQuestions = (req: PageParam) => {
    return request<any>({
        url: `/questions/search`,
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
