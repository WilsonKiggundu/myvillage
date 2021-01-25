let profileBaseUrl, eventsBaseUrl, jobsBaseUrl, cdnBaseUrl

switch (process.env.REACT_APP_ENV) {
    case "test":
        profileBaseUrl = "https://profiles-test.innovationvillage.co.ug"
        eventsBaseUrl = "https://events-api-test.innovationvillage.co.ug"
        jobsBaseUrl = "https://jobs-api-test.innovationvillage.co.ug"
        cdnBaseUrl = "https://static.innovationvillage.co.ug"
        break
    case "production":
        profileBaseUrl = "https://profiles.innovationvillage.co.ug"
        eventsBaseUrl = "https://events-api.innovationvillage.co.ug"
        jobsBaseUrl = "https://jobs-api.innovationvillage.co.ug"
        cdnBaseUrl = "https://static.innovationvillage.co.ug"
        break
    default:
        profileBaseUrl = "https://localhost:5001"
        eventsBaseUrl = "https://events-api-test.innovationvillage.co.ug"
        jobsBaseUrl = "https://jobs-api-test.innovationvillage.co.ug"
        cdnBaseUrl = "https://static.innovationvillage.co.ug"
}

export const Endpoints = {
    base: profileBaseUrl,

    cdn: {
        base: cdnBaseUrl,
        api: '/api/uploads'
    },

    jobs: {
        base: jobsBaseUrl,
        api: '/api/jobs'
    },

    events: {
        base: eventsBaseUrl,
        api: "/api/events"
    },
    business: {
        base: "/api/business",
        address: "/api/business/addresses",
        awards: "/api/business/awards",
        contact: "/api/business/contacts",
        interest: "/api/business/interests",
        need: "/api/business/needs",
        product: "/api/business/products",
        role: "/api/business/roles",
    },

    blog: {
        article: '/api/blog/articles',
        post: '/api/blog/posts',
        comment: '/api/blog/comments',
        likes: '/api/blog/posts/likes',
    },

    investor: {
        base: "/api/investor",
        address: "/api/business/addresses",
        contact: "/api/business/contacts",
        interest: "/api/business/interests",
        portfolio: "/api/business/portfolios"
    },

    person: {
        base: "/api/person",
        award: "/api/person/awards",
        category: "/api/person/categories",
        interest: "/api/person/interests",
        skill: "/api/person/skills",
        connection: "/api/person/connections",
    },

    contact: "/api/contact",

    lookup: {
        category: "/api/lookup/categories",
        school: "/api/lookup/schools",
        interest: "/api/lookup/interests",
        skill: "/api/lookup/skills",
        need: "/api/lookup/needs",
        upload: "/api/lookup/uploads",
    },
}