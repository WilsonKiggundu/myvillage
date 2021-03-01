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
        create: "/profiles/create",
        person: `/profiles/people/:id`,
        onePerson: (id: string) => `/profiles/people/${id}`,
        people: "/profiles/community",
        startups: "/profiles/startups",
        startup: "/profiles/startups/:id",
        singleStartup: (id: string) => `/profiles/startups/${id}`,
        investors: "/profiles/investors",
        entrepreneurs: "/profiles/entrepreneurs",
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