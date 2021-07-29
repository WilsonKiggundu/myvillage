import * as Yup from 'yup'
import eventModel from './EventModel'

const {
    formField: {
        title,
        companyId,
        type,
        date,
        startTime,
        endTime,
        location,
        details,
        conferenceUrl,
        frequency,
        createdBy,
        sector,
        region,
        objective,
        category,
        partner,
        tiv_affiliation
    }
} = eventModel

export default [
    Yup.object().shape({
        [title.name]: Yup.string().nullable().required('Event title is required'),
        [type.name]: Yup.string().required('Event type is required'),
        [date.name]: Yup.string().required('Event date is required'),
        [startTime.name]: Yup.string().required('Event start time is required'),
        [endTime.name]: Yup.string().required('Event end time is required'),
        [details.name]: Yup.string().required('Event details are required'),
        [location.name]: Yup.string().required('Event location is required'),
        [sector.name]: Yup.string().required('Event sector is required'),
        [region.name]: Yup.string().required('Event region is required'),
        [objective.name]: Yup.string().required('Event objective is required'),
        [location.name]: Yup.string().required('Event location is required'),
        [tiv_affiliation.name]: Yup.string().required('Required'),
    }),
];