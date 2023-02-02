import { userSlice } from './../../store/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from './../../hooks/redux';


const useFilter = () => {
    const {filterOptions} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch()
    const val = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(userSlice.actions.filterData({name: e.target.name, filterBy: e.target.value}))
    };

    return {
        val,
        filterOptions
    }
}

export default useFilter;