let baseUrl

switch (process.env.NODE_ENV){
    case "test":
        baseUrl = "https://profiles-test.innovationvillage.co.ug"
        break
    case "production":
        baseUrl = "https://profiles-test.innovationvillage.co.ug"
        break
    default:
        baseUrl = "https://localhost:5001"
}

export const Endpoints = {
    base: baseUrl,

    business: {
        base: "/api/business",
        address: "/api/business/addresses",
        contact: "/api/business/contacts",
        interest: "/api/business/interests",
        need: "/api/business/needs",
        product: "/api/business/products",
        role: "/api/business/roles",
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
        skill: "/api/person/skills"
    },

    contact: "/api/contact",

    lookup: {
        category: "/api/lookup/categories",
        interest: "/api/lookup/interests",
        need: "/api/lookup/needs",
        upload: "/api/lookup/uploads",
    },
}