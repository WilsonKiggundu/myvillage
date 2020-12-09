import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import core from "./coreReducer";
import eventsReducer from "../modules/events/eventSlice";
import postsReducer from "../modules/posts/postsSlice"
import jobsReducer from "../modules/jobs/jobsSlice";

const myWindow = window as any;
const toolsName = '__REDUX_DEVTOOLS_EXTENSION__';
const devTools: any = myWindow[toolsName] ? myWindow[toolsName]() : (f: any) => f;
const reducers: any = {core, events: eventsReducer, posts:  postsReducer, jobs: jobsReducer};
const middleware = applyMiddleware(createLogger(), thunk);
const store: any = middleware(devTools(createStore))(combineReducers(reducers));

export default store

