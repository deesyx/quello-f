import request from "@/utils/request";
import {QuestionSearchReq} from "@/type/question.ts";

export const getQuestions = (req: QuestionSearchReq) => {
    return request<any>({
        url: `/questions/search`,
        method: "post",
        data: req
    });
};