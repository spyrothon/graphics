import { useDispatch } from "react-redux";
import { ThunkAction,ThunkDispatch } from "redux-thunk";

import { Action } from "../Actions";
import { StoreState } from "../Store";

const useSafeDispatch = () => useDispatch<ThunkDispatch<StoreState, never, Action>>();

export type SafeThunk<T = void> = ThunkAction<T, StoreState, unknown, Action>;
export type SafeDispatch = ReturnType<typeof useSafeDispatch>;

export default useSafeDispatch;
