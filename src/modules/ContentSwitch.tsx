import React from "react";
import { Route, Switch } from "react-router-dom";
import {Routes} from "../routes/routes";
import MainLayout from "../components/layout/MainLayout";
import Home from "./home/Home";
import StartupsList from "./profiles/startups/StartupsList";
import StartupProfile from "./profiles/startups/StartupProfile";

const ContentSwitch = () => {
    return (
        <Switch>
            <MainLayout>
                <Switch>
                    <Route exact path={Routes.home} component={Home} />
                    <Route exact path={Routes.profiles.startups} component={StartupsList} />
                    <Route exact path={Routes.profiles.singleStartup} component={StartupProfile} />
                </Switch>
            </MainLayout>
        </Switch>
    )
}

export default ContentSwitch