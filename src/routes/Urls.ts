export const Urls = ({
    base: process.env.REACT_APP_PUBLIC_URL,
    devices: {
      publicKey: '/api/devices/key'
    },
    settings: {
        emailNotifications: '/settings/email/notifications'
    },
    survey: '/devscape',
    articles: {
        create: '/articles/create',
        update: '/articles/update/:id',
        article: '/blog/read/article/:year/:month/:day/:id',
        singleArticle:
            (id: string, year: any, month: any, day: any) => `/blog/read/article/${year}/${month}/${day}/${id}`
    },
    callback: "/callback",
    logout: "/logout",
    logoutCallback: "/logout-callback",
    silentRenew: "/silent-renew",
    home: "/",
    feed: "/feed",
    blog: "/blog/articles",
    freelancers: {
      projects: '/freelancers/projects'
    },
    profiles: {
        freelancers: '/freelancers',
        developers: '/developers',
        searchFreelancers: '/freelancers/search',
        searchDevelopers: '/developers/search',
        create: "/profiles/create",
        person: `/profiles/people/:id`,
        onePerson: (id: string) => `/profiles/people/${id}`,
        people: "/profiles/people",
        startups: "/profiles/startups",
        startup: "/profiles/startups/:id",
        singleStartup: (id: string) => `/profiles/startups/${id}`,
        investors: "/profiles/investors",
        entrepreneurs: "/profiles/entrepreneurs",
    },
    jobs: {
        singleJob: (id: string | null) => `/jobs/${id}/details`,
        create: "/jobs/create",
        home: "/jobs",
        list: "/jobs/search"
    },
    job: '/jobs/:id/details',
    events: "/events",
    createEvent: "/events/create",
    singleEvent: (id: any) => `/events/${id}/details`,
    event: '/events/:id/details',
    calendar: '/calendar',
    templates: {
        create: '/email/templates/create'
    }
})