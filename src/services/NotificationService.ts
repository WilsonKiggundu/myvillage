import {makeUrl, postAsync} from "../utils/ajax";
import {Endpoints} from "./Endpoints";
import {IEmailObject} from "../interfaces/IEmailObject";

const APIKEY = '9c63b831-c939-41c9-8ad8-10114172e5d3'

export const sendEmail = async (params: IEmailObject) => {
    const url = makeUrl("Notification", Endpoints.notification.api.email)
    return await postAsync(url, params, APIKEY)
}

// react_devtools_backend.js:2430 Warning: <Field render> has been deprecated and will be removed in future versions of Formik. Please use a child callback function instead. To get rid of this warning, replace <Field name="acceptMessage" render={({field, form}) => ...} /> with <Field name="acceptMessage">{({field, form, meta}) => ...}</Field>