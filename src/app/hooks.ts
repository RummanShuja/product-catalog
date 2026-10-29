import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Components use these instead of the untyped Redux hooks.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
