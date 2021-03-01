export const Urls = ({
    articles: {
        create: '/articles/create'
    },
    callback: "/callback",
    logout: "/logout",
    logoutCallback: "/logout-callback",
    silentRenew: "/silent-renew",
    home: "/",
    feed: "/feed",
    profiles: {
        create: "/profile/create",
        person: `/profile/people/:id`,
        onePerson: (id: string) => `/person/${id}`,
        people: "/profile/community",
        startups: "/profile/startups",
        startup: "/profile/startups/:id",
        singleStartup: (id: string) => `/profile/startup/${id}`,
        investors: "/profile/investors",
        entrepreneurs: "/profile/entrepreneurs",
    },
    jobs: {
        singleJob: (id: string) => `/jobs/${id}/details`,
        create: "/jobs/create",
        list: "/jobs"
    },
    job: '/jobs/:id/details',
    events: "/events",
    event: '/events/:id'
})