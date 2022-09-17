import { useDispatch } from "react-redux";
import { ThunkAction,ThunkDispatch } from "redux-thunk";

import { Action } from "@graphics/Actions";
import { StoreState } from "@graphics/Store";

const useSafeDispatch = () => useDispatch<ThunkDispatch<StoreState, never, Action>>();

export type SafeThunk<T = void> = ThunkAction<T, StoreState, unknown, Action>;
export type SafeDispatch = ReturnType<typeof useSafeDispatch>;

export default useSafeDispatch;
