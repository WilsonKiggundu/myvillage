import * as Yup from 'yup';
import jobFormModel from './JobFormModel';
import {isValid, parseISO} from "date-fns";
const {
    formField: {
        location,
        title,
        category,
        deadline,
        qualifications,
        details,
        companyId,
        experience,
        jobType
    }
} = jobFormModel;

export default [
    Yup.object().shape({
        [deadline.name]: Yup.string().nullable().required(`${deadline.requiredErrorMsg}`),
        [location.name]: Yup.string().required(`${location.requiredErrorMsg}`),
        [title.name]: Yup.string().required(`${title.requiredErrorMsg}`),
        [category.name]: Yup.string().required(`${category.requiredErrorMsg}`),
        [qualifications.name]: Yup.string().required(`${qualifications.requiredErrorMsg}`),
        [details.name]: Yup.string().required(`${details.requiredErrorMsg}`),
        [companyId.name]: Yup.string().required(`${companyId.requiredErrorMsg}`),
        // [experience.name]: Yup.string().required(`${experience.requiredErrorMsg}`),
        [jobType.name]: Yup.string().required(`${jobType.requiredErrorMsg}`)
    }),
];