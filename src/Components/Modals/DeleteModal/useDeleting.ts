import { userSlice } from './../../../store/reducers/UserSlice';
import { useState } from 'react';
import { useAppDispatch } from './../../../hooks/redux';

const useDeleting = () => {
    const dispatch = useAppDispatch();
    const [rowIndex, setRowIndex] = useState<number>(0);

    const handleDeletion = () => {
        dispatch(
            userSlice.actions.deleteTransaction({
                rowIndex: rowIndex,
            })
        );
    };

    return {
        handleDeletion,
        setRowIndex
    }
};

export default useDeleting;
