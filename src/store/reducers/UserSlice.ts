
import { createSlice, current, original, PayloadAction } from '@reduxjs/toolkit';
import { uploadedData } from '../../Components/ImportButton';
import { filterOptionsTypes, IUser, filterTemplate, filteredBy, EditTemplate, downloadData, DeleteTemplate } from './../../models/IUser';

interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
    filterOptions: filterOptionsTypes;
    filteredBy: filteredBy;
    downloadData: downloadData[];
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
    filterOptions: {
        status: [],
        type: []
    },
    filteredBy: {
        Status: 'Status',
        Type: 'Type'
    },
    downloadData: []
}

export let fetchedTestData: IUser[]; 


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        usersFetching: (state) => {
            state.isLoading = true;
        },
        usersFetchingSuccess: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
            fetchedTestData = action.payload;
//=========================== yes i do not stick to DRY principle in this reducer and usersFromCSVFile reducer but i do in intentionally ==========================================
            const uniqueStatus: string[] = [...new Set(action.payload.slice(0, 10).map(item => item.Status))];
            state.filterOptions.status = ['Status', ...uniqueStatus]
            const uniqueType: string[] = [...new Set(action.payload.slice(0, 10).map(item => item.Type))];
            state.filterOptions.type = ['Type', ...uniqueType]
        },
        usersFetchingError: (state, action: PayloadAction<string>) =>  {
            state.isLoading = false;
            state.error = action.payload;
        },
        usersFromCSVFile: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
            fetchedTestData = action.payload;
            const uniqueStatus: string[] | undefined = [...new Set(action.payload.slice(0, 10).map(item => item.Status))];
            state.filterOptions.status = ['Status', ...uniqueStatus]
            const uniqueType: string[] = [...new Set(action.payload.slice(0, 10).map(item => item.Type))];
            state.filterOptions.type = ['Type', ...uniqueType]
        },
        filterData: (state, action: PayloadAction<filterTemplate>) => {
            state.filteredBy[action.payload.name as keyof filteredBy] = action.payload.filterBy
            if (state.filteredBy['Status'] === 'Status' || state.filteredBy['Type'] === 'Type') {
                if (state.filteredBy['Status'] === 'Status' && state.filteredBy['Type'] === 'Type') {
                    state.users = fetchedTestData;
                    return;
                }
                state.users = state.filteredBy['Status'] === 'Status' ? fetchedTestData.filter((item) => item['Status']  && item['Type'] === state.filteredBy['Type']) : fetchedTestData.filter((item) => item['Status'] === state.filteredBy['Status'] && item['Type'])
                return;
            }
            state.users = fetchedTestData.filter((item) => item['Status'] === state.filteredBy['Status'] && item['Type'] === state.filteredBy['Type'])
        },
        setDownloadData: (state, action: PayloadAction<downloadData[]>) => {
            state.downloadData = action.payload;
        },
        editStatus: (state, action: PayloadAction<EditTemplate>) => {
            state.users[action.payload.rowIndex].Status = action.payload.text
        }, 
        deleteTransaction: (state, action: PayloadAction<DeleteTemplate>) => {
            state.users.splice(action.payload.rowIndex, 1)
            fetchedTestData = [...current(state.users)]
        } 
    },
})

export default userSlice.reducer;