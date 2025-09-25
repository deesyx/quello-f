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

export interface dashboardSearchReq {
    productModule?: string;
    startDate?: string;
    endDate?: string;
    period: string;
}