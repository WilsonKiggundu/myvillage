import {Urls} from "../../routes/Urls";
import LayersIcon from '@material-ui/icons/Layers';

export const MainMenuItems = [
    {
        label: "Feed",
        url: Urls.feed
    },
    {
        label: "Startups",
        url: Urls.profiles.startups
    },
    {
        label: "Community",
        icon: "",
        url: Urls.profiles.people
    },
    {
        label: "Events",
        icon: "",
        url: Urls.events
    },
    {
        label: "Work in tech",
        icon: "",
        url: Urls.jobs.home
    },
    {
        label: "Freelancers",
        icon: "",
        url: Urls.profiles.freelancers
    },
    {
        label: "Developers",
        icon: "",
        url: Urls.profiles.developers
    }
]