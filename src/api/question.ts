import request from "@/utils/request";
import {PageParam} from "@/type/page.ts";

export const getQuestions = (req: PageParam) => {
    return request<any>({
        url: `/questions/search`,
        method: "post",
        data: req
    });
};