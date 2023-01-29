export interface IUser {
    TransactionId: number;
    Status: string;
    Type: string;
    ClientName: string;
    Amount: number
}

export interface filterOptionsTypes {
    status: string[];
    type: string[];
}

export interface filterTemplate {
    name: string;
    filterBy: string;
}

export interface filteredBy {
    Status: string;
    Type: string;
}

export interface downloadData {
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