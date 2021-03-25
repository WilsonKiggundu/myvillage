import eventModel from './EventModel'

const {
    formField: {
        title,
        companyId,
        type,
        date,
        location,
        details,
        startTime,
        endTime,
        conferenceUrl,
        frequency,
        createdBy
    }
} = eventModel

export default {
    [title.name]: '',
    [companyId.name]: '',
    [type.name]: '',
    [date.name]: '',
    [location.name]: '',
    [details.name]: '',
    [startTime.name]: '',
    [endTime.name]: '',
    [conferenceUrl.name]: '',
    [frequency.name]: '',
    [createdBy.name]: '',
}