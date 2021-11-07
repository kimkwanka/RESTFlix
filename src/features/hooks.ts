import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { TAppDispatch, TRootState } from './store';

export const useAppDispatch = () => useDispatch<TAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
