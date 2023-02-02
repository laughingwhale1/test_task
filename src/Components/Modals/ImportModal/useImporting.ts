import { IUser } from './../../../models/IUser';
import { userSlice } from './../../../store/reducers/UserSlice';
import { useAppDispatch } from './../../../hooks/redux';

let uploadedData: IUser[];

const useImporting = () => {
    const dispatch = useAppDispatch();
    const handleFileSaving = (data: any) => {
        uploadedData = data.data;
    };
    const handleFileDataUpload = () => {
        dispatch(userSlice.actions.usersFromCSVFile(uploadedData));
    }

    return {
        handleFileDataUpload,
        handleFileSaving
    }
}

export default useImporting;