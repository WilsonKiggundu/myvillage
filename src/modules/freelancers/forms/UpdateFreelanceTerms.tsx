import XForm from "../../../components/forms/XForm";
import React from "react";
import * as yup from "yup";
import {reqObject, reqPositiveInteger, reqString} from "../../../data/validations";
import {FormikHelpers} from "formik";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../components/inputs/XTextInput";
import XRichTextArea from "../../../components/inputs/XRichTextArea";
import XSelectInput from "../../../components/inputs/XSelectInput";
import XSelectInputCreatable from "../../../components/inputs/XSelectInputCreatable";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import {addFreelanceProject, createFreelanceProjectAction} from "../redux/freelanceProjectActions";
import {makeUrl, postAsync, postWithoutLoginAsync, putAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Toast from "../../../utils/Toast";

interface IProps {
    onClose?: () => void
    freelanceTerms?: any
}

const schema = yup.object().shape(
    {
        rate: reqString,
        currency: reqObject,
        rateType: reqObject
    }
)

const rateTypes = [
    {
        id: 1,
        name: 'Hourly'
    },
    {
        id: 2,
        name: 'Daily'
    },
    {
        id: 3,
        name: 'Weekly'
    },
    {
        id: 4,
        name: 'Monthly'
    },
    {
        id: 5,
        name: 'Quarterly'
    },
    {
        id: 6,
        name: 'Annually'
    },
    {
        id: 7,
        name: 'Other'
    }
]

const currencies = [
    {
        id: 'UGX',
        name: 'UGX'
    },
    {
        id: 'USD',
        name: 'USD'
    }
]

const UpdateFreelanceTermsForm = ({onClose, freelanceTerms}: IProps) => {
    const user = useSelector(userSelector)

    const initialRateType = rateTypes.find(f => f.id === freelanceTerms?.rateType) ?? rateTypes[0]
    const initialCurrency = currencies.find(f => f.id === freelanceTerms?.currency) ?? currencies[0]

    const initialValues = {
        personId: freelanceTerms?.personId ?? user.profile.sub,
        rate: freelanceTerms?.rate,
        details: freelanceTerms?.details,
        rateType: initialRateType ?? rateTypes[0],
        currency: initialCurrency ?? currencies[0]
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
        const {currency, rateType} = values

        if (freelanceTerms?.id) {
            values.id = freelanceTerms.id
        }

        values.currency = currency.id
        values.rateType = rateType.id

        try {
            const url = makeUrl("Profiles", Endpoints.person.freelance)
            if (values.id){
                await putAsync(url, values)
            }else{
                await postAsync(url, values)
            }

            if(onClose) onClose()
        } catch (e) {
            Toast.error("Unable to update your profile. Please try again later")
        }
    }

    return (
        <XForm
            debug={false}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>

                <Grid item xs={12}>
                    <XTextInput
                        variant={"outlined"}
                        label={"What is your rate?"}
                        name={"rate"}
                        placeholder={"Enter amount"}
                        helperText={"Ex. 100,000"}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XSelectInputCreatable
                        variant={"outlined"}
                        name={"rateType"}
                        allowAddNew={true}
                        defaultValue={initialRateType}
                        multiple={false}
                        label={"How do you charge?"}
                        placeholder={"Select Type"}
                        helperText={"Ex. Hourly, Monthly"}
                        options={rateTypes}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <XSelectInputCreatable
                        variant={"outlined"}
                        name={"currency"}
                        defaultValue={initialCurrency}
                        allowAddNew={true}
                        multiple={false}
                        placeholder={"Select Currency"}
                        label={"Preferred currency"}
                        helperText={"Ex. USD"}
                        options={currencies}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XRichTextArea
                        variant={"filled"}
                        name={"details"}
                        helperText={"Is there anything else you want to say?"}
                    />
                </Grid>
            </Grid>
        </XForm>
    )
}

export default UpdateFreelanceTermsForm