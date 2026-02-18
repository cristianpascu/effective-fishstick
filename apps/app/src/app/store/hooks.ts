import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './types';

/** Pre-typed `useDispatch` hook. */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/** Pre-typed `useSelector` hook. */
export const useAppSelector = useSelector.withTypes<RootState>();
