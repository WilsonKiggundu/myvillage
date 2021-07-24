let profileBaseUrl, eventsBaseUrl, jobsBaseUrl, cdnBaseUrl, notificationsBaseUrl

switch (process.env.REACT_APP_ENV) {
    case "test":
        profileBaseUrl = "https://profiles-test.innovationvillage.co.ug"
        eventsBaseUrl = "https://events-api-test.innovationvillage.co.ug"
        notificationsBaseUrl = "https://commservice-test.innovationvillage.co.ug"
        jobsBaseUrl = "https://jobs-api-test.innovationvillage.co.ug"
        cdnBaseUrl = "https://static.innovationvillage.co.ug"
        break
    case "production":
        profileBaseUrl = "https://profiles.innovationvillage.co.ug"
        eventsBaseUrl = "https://events-api.innovationvillage.co.ug"
        notificationsBaseUrl = "https://commservice.innovationvillage.co.ug"
        jobsBaseUrl = "https://jobs-api.innovationvillage.co.ug"
        cdnBaseUrl = "https://static.innovationvillage.co.ug"
        break
    default:
        profileBaseUrl = "https://localhost:7001"
        eventsBaseUrl = "https://events-api-test.innovationvillage.co.ug"
        notificationsBaseUrl = "https://commservice-test.innovationvillage.co.ug"
        jobsBaseUrl = "https://jobs-api-test.innovationvillage.co.ug"
        cdnBaseUrl = "https://static.innovationvillage.co.ug"
}

export const Endpoints = {
    base: profileBaseUrl,

    cdn: {
        base: cdnBaseUrl,
        api: '/api/uploads'
    },

    freelanceProjects: {
        api: '/api/freelance/project',
        people: '/api/freelance/project/people'
    },

    templates: {
        email: '/api/email/template'
    },

    jobs: {
        base: jobsBaseUrl,
        api: '/api/jobs',
        apply: '/api/jobs/apply',
        application: {
            update: '/api/jobs/application/update'
        }
    },

    notification: {
        base: notificationsBaseUrl,
        api: {
            email: '/api/emails'
        }
    },

    events: {
        base: eventsBaseUrl,
        api: "/api/events",
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
        blacklist: '/api/blog/posts/blacklist',
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

    devices: {
        publicKey: '/api/devices/key',
        create: '/api/devices/create'
    },

    person: {
        base: "/api/person",
        award: "/api/person/awards",
        employment: "/api/person/employment",
        project: "/api/person/project",
        stack: "/api/person/stack",
        category: "/api/person/categories",
        interest: "/api/person/interests",
        skill: "/api/person/skills",
        contact: "/api/person/contacts",
        connection: "/api/person/connections",
        freelance: "/api/person/freelance",
        blacklist: "/api/person/blacklist",
    },

    contact: "/api/contact",

    lookup: {
        category: "/api/lookup/categories",
        school: "/api/lookup/schools",
        interest: "/api/lookup/interests",
        skill: "/api/lookup/skills",
        need: "/api/lookup/needs",
        upload: "/api/lookup/uploads",
        stack: "/api/lookup/stack",
    },
}