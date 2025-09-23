// 问题详情数据类型
export interface QuestionDetail {
    id: number;
    questionId: string;
    title: string;
    content: string;
    productModule: string;
    questionType: string;
    severity: string;
    status: string;
    priority: string;
    plannedResolutionDate: string;
    actualResolutionDate: string;
    reportedBy: string;
    responsiblePerson: string;
    version: number;
    createdAt: string;
    updatedAt: string;
  }
  
  // 后端统一响应格式
  export interface ApiResponse<T> {
    code: number;
    data: T;
    msg: string;
  }


  // 搜索请求参数
export interface QuestionSearchReq {
    page?: number;
    size?: number;
    // 可根据后端 QuestionSearchReq 补充其他可选查询条件
    questionId?: string;
    status?: string;
    productModule?: string;
  }
  
  // 分页结果类型
export interface PageResult<T> {
    list: T[];
    total: number;
    page: number;
    size: number;
  }


// Define a type for the response data
export interface Question {
  // Add actual properties based on your API response
  id?: number;
  questionId?: string;
  title: string;
  content: string;
  productModule?: string;
  page?: string;
  questionType?: string;
  severity?: string;
  status?: string;
  priority?: string;
  plannedResolutionDate?: Date;
  actualResolutionDate?: Date;
  reportedBy?: string;
  reportedByGroup?: string;
  responsiblePerson?: string;
  responsiblePersonGroup?: string;
  version?: string;
  includedInLibrary?: boolean;
  screenshotUrl?: string[];
  optimizationSuggestion?: string;
  solution?: string;
  source?: string;
  tag?: string;
  createdAt?: Date | string;
  updatedAt?: Date;
  '验收情况'?: string;
}

export interface GetQuestionsResponse {
  list: Question[];
  total: number;
  type: string;
}