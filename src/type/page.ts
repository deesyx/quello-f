export interface PageParam {
    pageNo: number;
    pageSize: number;
}

export interface PageEvent {
    page: number;
    pageCount: number;
    rows: number;
    first: number;
}