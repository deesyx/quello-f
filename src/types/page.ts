export interface PageParam {
    pageNo: number;
    pageSize: number;
}

export interface QuestionDetail {
    id?: number;
    questionId?: string;
    title: string;
    content: string;
    productModule?: string;
    questionType?: string;
    severity?: string;
    status?: string;
    priority?: string;
    plannedResolutionDate?: Date;
    actualResolutionDate?: Date;
    reportedBy?: string;
    responsiblePerson?: string;
    version?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// export interface dashboardSearchReq {
//     productModule?: string;
//     startDate?: string;
//     endDate?: string;
//     period: string;
// }

// Parameter interface
export interface dashboardSearchReq {
    /*产品模块 */
    productModule?: string;
  
    /*开始日期 */
    startDate?: string;
  
    /*结束日期 */
    endDate?: string;
  
    /*周期,可用值:YEAR,QUARTER,MONTH,WEEK */
    period: string;
  }