import { ExportFormInput } from './../../../models/IUser';
import { SubmitHandler } from 'react-hook-form';
import { userSlice, fetchedTestData } from '../../../store/reducers/UserSlice';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const useExporting = () => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        watch
    } = useForm<ExportFormInput>();
    const {downloadData, users} = useAppSelector(state => state.userReducer)

    const onSubmit: SubmitHandler<ExportFormInput> = (data: ExportFormInput) => {
        
        if (!data.Amount || !data.ClientName) {
            if (!data.Amount && !data.ClientName) {
                dispatch(userSlice.actions.setDownloadData(users.map(item => (({Type, TransactionId, Status}) => ({Type, TransactionId, Status}))(item))))
                return;
            }

            if (!data.Amount) {
                dispatch(userSlice.actions.setDownloadData(users.map(item => (({Type, TransactionId, Status, ClientName}) => ({Type, ClientName, TransactionId, Status}))(item))))
                return;
            } 
            
            if (!data.ClientName) {
                dispatch(userSlice.actions.setDownloadData(users.map(item => (({Type, TransactionId, Status, Amount}) => ({Type, Amount, TransactionId, Status}))(item))))
                return;
            }

            
        } 
        if (data.Amount && data.ClientName) {
            dispatch(userSlice.actions.setDownloadData(users.map(item => (({Type, TransactionId, Status, Amount, ClientName}) => ({Type, TransactionId, Status, Amount, ClientName}))(item))))
        }
    };

    const dataArrangement = () => {
        // here we make users to loook like they weren't filtered yet
        dispatch(userSlice.actions.usersFromCSVFile(fetchedTestData))
        // here we reset filtered by field in store so that data to download is displayed correctly
        dispatch(userSlice.actions.filterData({name: 'status', filterBy: 'Status'}))
        dispatch(userSlice.actions.filterData({name: 'type', filterBy: 'Type'}))
    }


    return {
        register, 
        onSubmit,
        handleSubmit,
        watch,
        downloadData,
        dataArrangement
    }
}

export default useExporting;