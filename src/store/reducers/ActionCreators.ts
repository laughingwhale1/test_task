import { IUser } from "./../../models/IUser";
import { AppDispatch } from "./../store";
import axios from "axios";
import { userSlice } from "./UserSlice";

async function fetchFunc() {
    return await axios
        .get<IUser[]>("/api/test-data")
        .then((response) => response.data);
}

import { call, put, takeEvery } from "redux-saga/effects";

function* workerFetchUsers(dispatch: AppDispatch) {
    try {
        const response: IUser[] = yield call(() => fetchFunc());
        yield put(userSlice.actions.usersFetchingSuccess(response));
    } catch (e: any) {
        yield userSlice.actions.usersFetchingError(e.message);
    }
}

export function* watcherFetchUsers() {
    yield takeEvery("user/usersFetching", workerFetchUsers);
}

// =============================================== BELOW IS THE SAME ACTION BUT USING ASYNCTHUNK ==================================

// export const fetchUsers = createAsyncThunk(
//     "testUserFetch",
//     async (_, thunkApi) => {
//         try {
//             const response = await axios.get<IUser[]>("/api/test-data");
//             return response.data;
//         } catch (error) {
//             return thunkApi.rejectWithValue("rejected");
//         }
//     }
// );
