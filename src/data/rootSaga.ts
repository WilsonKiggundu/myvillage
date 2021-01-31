import {all} from "redux-saga/effects"
import {
    addCommentWatcher,
    commentsListWatcher, createPostWatcher,
    likePostWatcher,
    postsListWatcher
} from "../modules/posts/redux/postsSelectors";
import {
    addStartupAddressWatcher, addStartupContactWatcher,
    addStartupProductWatcher,
    addStartupWatcher,
    deleteStartupAddressWatcher, deleteStartupContactWatcher,
    deleteStartupInterestsWatcher,
    deleteStartupProductWatcher,
    deleteStartupRolesWatcher,
    startupsListWatcher,
    updateStartupAddressWatcher,
    updateStartupContactWatcher,
    updateStartupInterestsWatcher,
    updateStartupProductWatcher,
    updateStartupRolesWatcher,
    updateStartupWatcher
} from "../modules/profiles/startups/redux/startupsWatchers";
import {
    addPersonEducationWatcher,
    deletePersonCategoriesWatcher, deletePersonConnectionWatcher, deletePersonEducationWatcher,
    deletePersonInterestsWatcher,
    deletePersonSkillsWatcher, fetchPersonConnectionWatcher,
    peopleListWatcher,
    updatePersonCategoriesWatcher, updatePersonConnectionWatcher,
    updatePersonEducationWatcher,
    updatePersonInterestsWatcher,
    updatePersonSkillsWatcher,
    updatePersonWatcher
} from "../modules/profiles/people/redux/peopleWatchers";
import {eventsListWatcher, addEventWatcher} from "../modules/events/redux/eventsWatchers";
import {addJobWatcher, jobCategoriesListWatcher, jobsListWatcher} from "../modules/jobs/redux/jobsSelectors";

export default function* rootSaga(){
    yield all([

        // people
        peopleListWatcher(),
        updatePersonWatcher(),

        updatePersonCategoriesWatcher(),
        deletePersonCategoriesWatcher(),

        updatePersonInterestsWatcher(),
        deletePersonInterestsWatcher(),

        updatePersonSkillsWatcher(),
        deletePersonSkillsWatcher(),

        addPersonEducationWatcher(),
        updatePersonEducationWatcher(),
        deletePersonEducationWatcher(),

        fetchPersonConnectionWatcher(),
        updatePersonConnectionWatcher(),
        deletePersonConnectionWatcher(),

        // jobs
        jobsListWatcher(),
        jobCategoriesListWatcher(),
        addJobWatcher(),

        // posts, comments, likes
        postsListWatcher(),
        createPostWatcher(),
        likePostWatcher(),
        addCommentWatcher(),
        commentsListWatcher(),

        // events
        addEventWatcher(),
        eventsListWatcher(),

        // startups
        startupsListWatcher(),
        addStartupWatcher(),
        updateStartupWatcher(),

        addStartupAddressWatcher(),
        updateStartupAddressWatcher(),
        deleteStartupAddressWatcher(),

        addStartupContactWatcher(),
        updateStartupContactWatcher(),
        deleteStartupContactWatcher(),

        addStartupProductWatcher(),
        updateStartupProductWatcher(),
        deleteStartupProductWatcher(),

        updateStartupInterestsWatcher(),
        deleteStartupInterestsWatcher(),

        updateStartupRolesWatcher(),
        deleteStartupRolesWatcher()
    ])
}