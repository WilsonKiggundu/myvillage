import jobFormModel from './JobFormModel'

const {
    formField: {

        // overview
        title,
        company,
        category,
        jobType,
        location,
        deadline,
        experience,

        // description
        details,

        // qualifications
        qualifications,

        // skills
        skills,

        // benefits
        benefits,

        maxSalary,
        minSalary
    }
} = jobFormModel;

export default {
    [location.name]: '',
    [title.name]: '',
    [category.name]: '',
    [skills.name]: '',
    [benefits.name]: '',
    [deadline.name]: '',
    [qualifications.name]: '',
    [details.name]: '',
    [company.name]: '',
    [experience.name]: '',
    [jobType.name]: '',
    [maxSalary.name]: '',
    [minSalary.name]: ''
};