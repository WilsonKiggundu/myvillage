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
        people: "/profiles/people",
        startups: "/profiles/startups",
        singleStartup: "/profiles/startups/:id",
        investors: "/profiles/investors",
        entrepreneurs: "/profiles/entrepreneurs",
    },
    jobs: {
        create: "/jobs/create",
        list: "/jobs"
    },
    job: '/jobs/:id',
    events: "/events",
    event: '/events/:id'
})