import postsReducer from "../modules/posts/redux/postsReducer";
import startupsReducer from "../modules/profiles/startups/redux/startupsReducer";
import peopleReducer from "../modules/profiles/people/redux/peopleReducer";
import {combineReducers} from "redux";
import coreReducer from "./coreReducer";
import {reducer as oidcReducer} from "redux-oidc";
import eventsReducer from "../modules/events/redux/eventsReducer";
import jobsReducer from "../modules/jobs/redux/jobsReducer";
import freelanceProjectReducer from "../modules/freelancers/redux/freelanceProjectReducer";

const reducers: any = {
    core: coreReducer,
    oidc: oidcReducer,
    events: eventsReducer,
    posts: postsReducer,
    jobs: jobsReducer,
    people: peopleReducer,
    startups: startupsReducer,
    freelanceProjects: freelanceProjectReducer
};

export const rootReducer = combineReducers(reducers)