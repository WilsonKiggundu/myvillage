import * as Yup from 'yup';
import model from './EmailTemplateFormModel';
import {isValid, parseISO} from "date-fns";
const {
    formField: {
        subject,
        body,
        type
    }
} = model;

export default [
    Yup.object().shape({
        [subject.name]: Yup.string().nullable().required("Subject is required"),
        [type.name]: Yup.string().required(`Type is required`),
        [body.name]: Yup.string().required(`Body is required`)
    }),
];