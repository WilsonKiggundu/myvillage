import model from './EmailTemplateFormModel'

const {
    formField: {
        subject,
        type,
        body,
    }
} = model;

export default {
    [subject.name]: '',
    [body.name]: '',
    [type.name]: ''
};