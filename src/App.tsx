import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import Routes from "./routes/Routes";
import {useSelector} from 'react-redux'
import CacheBuster from "./CacheBuster";
import {getToken, onMessageListener} from "./firebase";
import {Alert} from "@material-ui/lab";
import {Avatar, Grid, Snackbar} from "@material-ui/core";
import {Urls} from "./routes/Urls";
import {useTracking} from "./hooks/useTracking";
import Callback from "./modules/auth/Callback";
import {Logout} from "./modules/auth/Logout";
import {SilentRenew} from "./modules/auth/SilientRenew";
import Home from "./modules/home/Home";
import {CreateProfile} from "./modules/profiles/CreateProfile";
import MainLayout from "./components/layout/MainLayout";
import Feed from "./modules/feed/Feed";
import Startups from "./modules/profiles/startups/Startups";
import Startup from "./modules/profiles/startups/Startup";
import Community from "./modules/profiles/people/Community";
import Person from "./modules/profiles/people/Person";
import Jobs from "./modules/jobs/Jobs";
import Job from "./modules/jobs/Job";
import CreateJob from "./modules/jobs/CreateJob";
import JobsHome from "./modules/jobs/JobsHome";
import NewArticle from "./modules/articles/NewArticle";
import EventsList from "./modules/events/EventsList";
import CreateEvent from "./modules/events/CreateEvent";
import Event from "./modules/events/Event";
import Calendar from "./modules/events/Calendar";
import FreelancerHome from "./modules/freelancers/Home";
import DeveloperHome from "./modules/developers/Home";
import Freelancers from "./modules/freelancers/Freelancers";
import Developers from "./modules/developers/Developers";
import FreelanceProjects from "./modules/freelancers/FreelanceProjects";
import Articles from "./modules/articles/Articles";
import Article from "./modules/articles/Article";
import UpdateArticle from "./modules/articles/UpdateArticle";

export const App = () => {
    useTracking('G-WCYNV9YTKE')

    return (
            <Switch>
                <Route exact path={Urls.callback} component={Callback}/>
                <Route exact path={Urls.logout} component={Logout}/>
                <Route exact path={Urls.silentRenew} component={SilentRenew}/>
                <Route exact path={Urls.home} component={Home}/>
                <Route exact path={Urls.profiles.create} component={CreateProfile}/>

                <MainLayout>
                    <Route exact path={Urls.feed} component={Feed}/>
                    <Route exact path={Urls.blog} component={Articles}/>
                    <Route exact path={Urls.articles.article} render={(props) => <Article {...props} />}/>
                    <Route exact path={Urls.profiles.startups} component={Startups}/>
                    <Route exact path={Urls.profiles.startup} component={Startup}/>
                    <Route exact path={Urls.profiles.people} component={Community}/>
                    <Route exact path={Urls.profiles.person} render={(props) => <Person {...props} />}/>

                    <Route exact path={Urls.jobs.list} component={Jobs}/>
                    <Route exact path={Urls.job} component={Job}/>
                    <Route exact path={Urls.jobs.create} component={CreateJob}/>
                    <Route exact path={Urls.jobs.home} component={JobsHome}/>

                    <Route exact path={Urls.articles.create} component={NewArticle} />
                    <Route exact path={Urls.articles.update} render={(props) => <UpdateArticle {...props} />} />

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

}

export default () => {

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState<any>({});
    const [isTokenFound, setTokenFound] = useState(false);

    onMessageListener().then(payload => {
        setShow(true);
        setNotification({...payload})
    }).catch(err => console.log('failed: ', err));

    const oidcState: any = useSelector((state: any) => state.oidc)

    const {user, isLoadingUser} = oidcState

    useEffect(() => {
        if (user) {
            getToken(setTokenFound, user.profile.sub)
        }
    }, [user])

    const handleNotification = (notification: any) => {
        if (notification.data.postId) {
            window.location.replace(`${Urls.feed}?postId=${notification.data.postId}`)
        }
        if (notification.data.profileId) {
            window.location.replace(`${Urls.profiles.onePerson(notification.data.profileId)}`)
        }
    }

    return (
        <CacheBuster>
            {({loading, isLatestVersion, refreshCacheAndReload}: any) => {
                if (loading) return null;
                if (!loading && !isLatestVersion) {
                    refreshCacheAndReload();
                }

                return (
                    <>
                        <ToastContainer enableMultiContainer={false} hideProgressBar/>
                        <Snackbar
                            style={{cursor: 'pointer'}}
                            onClick={() => handleNotification(notification)}
                            anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                            open={show} autoHideDuration={10000}
                            onClose={() => setShow(false)}>
                            <Alert onClose={() => setShow(false)} icon={false} severity="success">
                                <Grid container spacing={2}>
                                    {
                                        notification.icon &&
                                        <Grid item>
                                            <Avatar src={notification.icon}/>
                                        </Grid>
                                    }
                                    <Grid item>
                                        <h6>{notification.title}</h6>
                                        {notification.body && <p>{notification.body}</p>}
                                    </Grid>
                                </Grid>
                            </Alert>
                        </Snackbar>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </>
                )
            }}
        </CacheBuster>
    )
}
