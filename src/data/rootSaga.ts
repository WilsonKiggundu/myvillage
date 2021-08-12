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
    addPersonContactWatcher,
    addPersonEducationWatcher,
    addPersonEmploymentWatcher,
    deletePersonCategoriesWatcher,
    deletePersonConnectionWatcher,
    deletePersonContactWatcher,
    deletePersonEducationWatcher,
    deletePersonInterestsWatcher,
    deletePersonSkillsWatcher,
    fetchPersonConnectionWatcher,
    peopleListWatcher,
    updatePersonCategoriesWatcher,
    updatePersonConnectionWatcher,
    updatePersonContactWatcher,
    updatePersonEducationWatcher,
    updatePersonEmploymentWatcher,
    updatePersonInterestsWatcher,
    updatePersonSkillsWatcher,
    updatePersonWatcher,
    deletePersonEmploymentWatcher,
    addPersonProjectWatcher,
    updatePersonProjectWatcher,
    deletePersonProjectWatcher,
    addPersonStackWatcher, updatePersonStackWatcher, deletePersonStackWatcher
} from "../modules/profiles/people/redux/peopleWatchers";
import {eventsListWatcher, addEventWatcher} from "../modules/events/redux/eventsWatchers";
import {addJobWatcher, jobCategoriesListWatcher, jobsListWatcher} from "../modules/jobs/redux/jobsSelectors";
import {editPersonEducation} from "../modules/profiles/people/redux/peopleActions";
import {
    createFreelanceProjectsWatcher, deleteFreelanceProjectsWatcher,
    fetchFreelanceProjectsWatcher,
    updateFreelanceProjectsWatcher
} from "../modules/freelancers/redux/freelanceProjectWatchers";
import {
    articlesListWatcher,
    createArticleWatcher,
    likeArticleWatcher
} from "../modules/articles/redux/articlesSelectors";

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

        addPersonContactWatcher(),
        updatePersonContactWatcher(),
        deletePersonContactWatcher(),

        addPersonEducationWatcher(),
        updatePersonEducationWatcher(),
        deletePersonEducationWatcher(),

        addPersonEmploymentWatcher(),
        updatePersonEmploymentWatcher(),
        deletePersonEmploymentWatcher(),

        addPersonProjectWatcher(),
        updatePersonProjectWatcher(),
        deletePersonProjectWatcher(),

        addPersonStackWatcher(),
        updatePersonStackWatcher(),
        deletePersonStackWatcher(),

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

        // articles
        articlesListWatcher(),
        createArticleWatcher(),
        likeArticleWatcher(),

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
        deleteStartupRolesWatcher(),

        // freelance projects
        fetchFreelanceProjectsWatcher(),
        updateFreelanceProjectsWatcher(),
        createFreelanceProjectsWatcher(),
        deleteFreelanceProjectsWatcher()
    ])
}