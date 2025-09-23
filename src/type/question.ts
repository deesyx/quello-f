import {PageParam} from "@/type/page.ts";

export interface QuestionSearchReq extends PageParam {
    title?: string;
    status?: string;
    questionType?: string;
}

export interface QuestionCreateReq {
    title: string;
    content: string;
    productModule: string;
    questionType: string;
    severity: string;
    priority: string;
    plannedResolutionDate?: string | null;
    reportedBy: string;
    responsiblePerson: string;
}