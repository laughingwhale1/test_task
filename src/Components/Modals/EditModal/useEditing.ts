import { TableActionEditInput } from './../../../models/IUser';
import { userSlice } from './../../../store/reducers/UserSlice';
import { useState } from 'react';
import { useAppDispatch } from './../../../hooks/redux';
import { SubmitHandler, useForm } from "react-hook-form";

const useEditing = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit} = useForm<TableActionEditInput>();
    const [rowIndex, setRowIndex] = useState<number>(0);

    const onSubmit: SubmitHandler<TableActionEditInput> = (data) => {
        dispatch(
            userSlice.actions.editStatus({
                rowIndex: rowIndex,
                text: data.userText,
            })
        )
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        setRowIndex
    }
}


export default useEditing;