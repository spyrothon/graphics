import { TypedUseSelectorHook, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import interviewsReducer from "./modules/interviews/InterviewsReducer";
import remoteReducer from "./modules/remote/RemoteReducer";
import runsReducer from "./modules/runs/RunsReducer";
import schedulesReducer from "./modules/schedules/SchedulesReducer";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const combinedReducer = combineReducers({
  interviews: interviewsReducer,
  remote: remoteReducer,
  runs: runsReducer,
  schedules: schedulesReducer,
});
export const store = createStore(combinedReducer, composeEnhancers(applyMiddleware(thunk)));

export type StoreState = ReturnType<typeof combinedReducer>;
export type Store = typeof store;

export const getProp =
  <T extends any>(key: string) =>
  (_: StoreState, props: Record<string, any>): T => {
    return props[key];
  };

export const useSafeSelector: TypedUseSelectorHook<StoreState> = useSelector;
