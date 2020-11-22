import React from "react";
import {Route, Switch} from "react-router-dom";
import {Urls} from "./Urls";
import MainLayout from "../components/layout/MainLayout";
import Home from "../modules/home/Home";
import Startups from "../modules/profiles/startups/Startups";
import Startup from "../modules/profiles/startups/Startup";
import People from "../modules/profiles/people/People";
import Person from "../modules/profiles/people/Person";
import Jobs from "../modules/jobs/Jobs";
import {Callback} from "../modules/auth/Callback";
import {Logout} from "../modules/auth/Logout";
import {LogoutCallback} from "../modules/auth/LogoutCallback";
import {SilentRenew} from "../modules/auth/SilientRenew";
import Feed from "../modules/feed/Feed";
import {PrivateRoute} from "./PrivateRoute";
import {CreateProfile} from "../modules/profiles/CreateProfile";
import NewArticle from "../modules/articles/NewArticle";
import Calendar from "../modules/events/Calendar";
import AddJob from "../modules/jobs/AddJob";

export const Routes = (
    <Switch>
        <Route exact path={Urls.callback} component={Callback}/>
        <Route exact path={Urls.logout} component={Logout}/>
        <Route exact path={Urls.logoutCallback} component={LogoutCallback}/>
        <Route exact path={Urls.silentRenew} component={SilentRenew}/>
        <Route exact path={Urls.home} component={Home}/>
        <Switch>
            <MainLayout>
                <Switch>
                    <PrivateRoute exact path={Urls.feed} component={Feed}/>

                    <PrivateRoute exact path={Urls.profiles.startups} component={Startups}/>
                    <PrivateRoute exact path={Urls.profiles.singleStartup} component={Startup}/>
                    <PrivateRoute exact path={Urls.profiles.people} component={People}/>
                    <PrivateRoute exact path={Urls.profiles.person} component={Person}/>
                    <PrivateRoute exact path={Urls.profiles.create} component={CreateProfile}/>

                    <PrivateRoute exact path={Urls.jobs.list} component={Jobs}/>
                    <PrivateRoute exact path={Urls.job} component={Jobs}/>
                    <PrivateRoute
                        exact
                        path={Urls.jobs.create}
                        component={
                            () => <AddJob placeholder={"Details of the job"}/>
                        }
                    />

                    <PrivateRoute
                        exact
                        path={Urls.articles.create}
                        component={
                            () => <NewArticle placeholder={"Start typing your article here..."}/>
                        }
                    />
                    <PrivateRoute exact path={Urls.events} component={() => <Calendar/>}/>
                </Switch>
            </MainLayout>
        </Switch>
    </Switch>
)

export default Routes