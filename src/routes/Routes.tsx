import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {Urls} from "./Urls";
import MainLayout from "../components/layout/MainLayout";
import Home from "../modules/home/Home";
import Startups from "../modules/profiles/startups/Startups";
import Startup from "../modules/profiles/startups/Startup";
import Person from "../modules/profiles/people/Person";
import Jobs from "../modules/jobs/Jobs";
import Callback from "../modules/auth/Callback";
import {Logout} from "../modules/auth/Logout";
import {SilentRenew} from "../modules/auth/SilientRenew";
import Feed from "../modules/feed/Feed";
import {CreateProfile} from "../modules/profiles/CreateProfile";
import NewArticle from "../modules/articles/NewArticle";
import Calendar from "../modules/events/Calendar";
import EventsList from "../modules/events/EventsList";
import Job from "../modules/jobs/Job";
import Community from "../modules/profiles/people/Community";
import CreateJob from "../modules/jobs/CreateJob";
import CreateEvent from "../modules/events/CreateEvent";
import Event from "../modules/events/Event";
import JobsHome from "../modules/jobs/JobsHome";
import FreelancerHome from "../modules/freelancers/Home";
import DeveloperHome from "../modules/developers/Home";
import Developers from "../modules/developers/Developers";
import FreelanceProjects from "../modules/freelancers/FreelanceProjects";
import Freelancers from "../modules/freelancers/Freelancers";

export const Routes = (
    <Switch>
        <Route exact path={Urls.callback} component={Callback}/>
        <Route exact path={Urls.logout} component={Logout}/>
        <Route exact path={Urls.silentRenew} component={SilentRenew}/>
        <Route exact path={Urls.home} component={Home}/>
        <Route exact path={Urls.profiles.create} component={CreateProfile}/>

        <MainLayout>
            <Route exact path={Urls.feed} component={Feed}/>
            <Route exact path={Urls.profiles.startups} component={Startups}/>
            <Route exact path={Urls.profiles.startup} component={Startup}/>
            <Route exact path={Urls.profiles.people} component={Community}/>
            <Route exact path={Urls.profiles.person} render={(props) => <Person {...props} />}/>

            <Route exact path={Urls.jobs.list} component={Jobs}/>
            <Route exact path={Urls.job} component={Job}/>
            <Route exact path={Urls.jobs.create} component={CreateJob}/>
            <Route exact path={Urls.jobs.home} component={JobsHome}/>

            <Route
                exact
                path={Urls.articles.create}
                component={
                    () => <NewArticle placeholder={"Start typing your article here..."}/>
                }
            />
            <Route exact path={Urls.events} component={() => <EventsList/>}/>
            <Route exact path={Urls.createEvent} component={() => <CreateEvent />}/>
            <Route exact path={Urls.event} component={Event}/>
            <Route exact path={Urls.calendar} component={Calendar}/>
            <Route exact path={Urls.profiles.freelancers} component={FreelancerHome}/>
            <Route exact path={Urls.profiles.developers} component={DeveloperHome}/>
            <Route exact path={Urls.profiles.searchFreelancers} component={Freelancers}/>
            <Route exact path={Urls.profiles.searchDevelopers} component={Developers}/>
            <Route exact path={Urls.freelancers.projects} component={FreelanceProjects}/>
        </MainLayout>
    </Switch>
)

export default Routes