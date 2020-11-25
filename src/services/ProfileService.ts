export const ApiEndpoints = {
    base: process.env.PROFILE_SERVICE,

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
        category: "/api/business/categories",
        interest: "/api/business/interests",
        need: "/api/business/needs",
        upload: "/api/business/uploads",
    },
}