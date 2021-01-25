import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import history from "../utils/history"
import {Urls} from "./Urls";
import MainLayout from "../components/layout/MainLayout";
import Home from "../modules/home/Home";
import Startups from "../modules/profiles/startups/Startups";
import Startup from "../modules/profiles/startups/Startup";
import People from "../modules/profiles/people/People";
import Person from "../modules/profiles/people/Person";
import Jobs from "../modules/jobs/Jobs";
import Callback from "../modules/auth/Callback";
import {Logout} from "../modules/auth/Logout";
import {LogoutCallback} from "../modules/auth/LogoutCallback";
import {SilentRenew} from "../modules/auth/SilientRenew";
import Feed from "../modules/feed/Feed";
import {CreateProfile} from "../modules/profiles/CreateProfile";
import NewArticle from "../modules/articles/NewArticle";
import Calendar from "../modules/events/Events";
import {PrivateRoute} from "./PrivateRoute";
import store from "../data/store";
import userManager from "../utils/userManager";
import Job from "../modules/jobs/Job";

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
            <Route exact path={Urls.profiles.people} component={People}/>
            <Route exact path={Urls.profiles.person} component={Person}/>

            <Route exact path={Urls.jobs.list} component={Jobs}/>
            <Route exact path={Urls.job} component={Job}/>

            <Route
                exact
                path={Urls.articles.create}
                component={
                    () => <NewArticle placeholder={"Start typing your article here..."}/>
                }
            />
            <Route exact path={Urls.events} component={() => <Calendar/>}/>
        </MainLayout>

        {/*<Route path={'/404'} component={NotFound} />*/}
        {/*<Redirect to={'/404'} />*/}
        {/*<Switch>*/}
        {/*    <MainLayout>*/}
        {/*        <Switch>*/}

        {/*        </Switch>*/}
        {/*    </MainLayout>*/}
        {/*</Switch>*/}
    </Switch>
)

export default Routes