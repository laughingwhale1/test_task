export interface IUser {
    TransactionId: number;
    Status: string;
    Type: string;
    ClientName: string;
    Amount: number
}

export interface FilterOptionsTypes {
    status: string[];
    type: string[];
}

export interface FilterTemplate {
    name: string;
    filterBy: string;
}

export interface FilteredBy {
    status: string;
    type: string;
}

export interface DownloadData {
    TransactionId?: number;
    Status?: string;
    Type?: string;
    ClientName?: string;
    Amount?: number
}

export interface EditTemplate {
    rowIndex: number;
    text: string
}

export interface DeleteTemplate {
    rowIndex: number;
}

export interface PaginationObj {
    totalCount: number;
    pageSize: number;
    siblingCount?: number;
    currentPage: number;
}

export type TableContentsProps = {
    data: IUser[];
    error?: string
}

export type TableActionProps = {
    index: number
}

export type TableActionEditInput = {
    userText: string;
}

export type ExportFormInput = {
    ClientName: boolean;
    Amount: boolean;
}

