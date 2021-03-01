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
        create: "/create-profile",
        person: `/profiles/people/:id`,
        onePerson: (id: string) => `/person/${id}`,
        people: "/community",
        startups: "/startups",
        startup: "/startups/:id",
        singleStartup: (id: string) => `/startup/${id}`,
        investors: "/investors",
        entrepreneurs: "/entrepreneurs",
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