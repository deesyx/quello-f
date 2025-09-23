import request from "@/utils/request";
import {QuestionCreateReq, QuestionSearchReq} from "@/type/question.ts";

export const getQuestions = (req: QuestionSearchReq) => {
    return request<any>({
        url: `/questions/search`,
        method: "post",
        data: req
    });
};

export const createQuestions = (req: QuestionCreateReq) => {
    return request<any>({
        url: `/questions/creation`,
        method: "post",
        data: req
    });
};