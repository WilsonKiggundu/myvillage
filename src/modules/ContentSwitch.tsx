import React from "react";
import { Route, Switch } from "react-router-dom";
import {Routes} from "../routes/routes";
import MainLayout from "../components/layout/MainLayout";
import Home from "./home/Home";
import Startups from "./profiles/startups/Startups";
import Startup from "./profiles/startups/Startup";
import People from "./profiles/people/People";
import Person from "./profiles/people/Person";
import Jobs from "./jobs/Jobs";
import Feed from "./feed/Feed";

const ContentSwitch = () => {
    return (
        <Switch>
            <MainLayout>
                <Switch>
                    <Route exact path={Routes.home} component={Home} />

                    {/*Startups*/}
                    <Route exact path={Routes.profiles.startups} component={Startups} />
                    <Route exact path={Routes.profiles.singleStartup} component={Startup} />

                    {/* People */}
                    <Route exact path={Routes.profiles.people} component={People} />
                    <Route exact path={Routes.profiles.person} component={Person} />

                    {/* Jobs */}
                    <Route exact path={Routes.jobs} component={Jobs} />
                    <Route exact path={Routes.job} component={Jobs} />

                    {/* Feed */}
                    <Route exact path={Routes.feed} component={Feed} />
                </Switch>
            </MainLayout>
        </Switch>
    )
}

export default ContentSwitch