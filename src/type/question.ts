import {PageParam} from "@/type/page.ts";

export interface QuestionSearchReq extends PageParam {
    title?: string;
    status?: string;
    questionType?: string;
}