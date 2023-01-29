import { RootState } from './../store/store';
import { useSelector } from 'react-redux';
import { useDispatch, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch } from '../store/store';


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;