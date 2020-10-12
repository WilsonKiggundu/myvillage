import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Routes} from "../data/routes";
import MainLayout from "../components/layout/MainLayout";
import FrontLayout from "../components/layout/FrontLayout";
import Home from "./home/Home";
import PersonProfile from "./profiles/people/PersonProfile";

const ContentSwitch = () => {
    return (
        <Switch>
            <FrontLayout>
                <Switch>
                    <Route default exact path={Routes.home} component={Home} />
                </Switch>
            </FrontLayout>
            <MainLayout>
                <Switch>
                    <Route exact path={Routes.profiles.entrepreneurs} component={PersonProfile} />
                    <Route exact path={Routes.profiles.startups} component={PersonProfile} />
                    <Route exact path={Routes.profiles.investors} component={PersonProfile} />
                    <Route exact path={Routes.profiles.single} component={PersonProfile} />
                </Switch>
            </MainLayout>
        </Switch>
    )
}

export default ContentSwitch