import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {get, makeUrl, post} from "../../../../../utils/ajax";
import Toast from "../../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import XSelectInput from "../../../../../components/inputs/XSelectInput";
import {IPerson} from "../../IPerson";
import {IOption} from "../../../../../components/inputs/inputHelpers";
import {Endpoints} from "../../../../../services/Endpoints";
import Chip from "@material-ui/core/Chip";
import XTextInput from "../../../../../components/inputs/XTextInput";

interface IProps {
    interests: IOption[]
    person: IPerson
    onClose?: () => any
}

const schema = yup.object().shape(
    {}
)


const UpdateInterestsForm = ({onClose, person, interests}: IProps) => {
    const dispatch = useDispatch()

    const [interestsLookup, setInterestsLookup] = useState<IOption[]>([])
    const [personInterests, setPersonInterests] = useState<IOption[]>([])

    useEffect(() => {

        // person interests
        const personInterestUrl = makeUrl("Profiles", Endpoints.person.interest)
        get(personInterestUrl, {personId: person.id}, (response) => {
            if (response) {
                const interests = response.map((m: any) => ({id: m.interest.id, name: m.interest.category}))
                setPersonInterests([...interests])
            }
        })

        // lookup interests
        const lookupInterestUrl = makeUrl("Profiles", Endpoints.lookup.interest)
        get(lookupInterestUrl, {}, (response) => {
            if (response) {
                const interests = response.map((m: any) => ({id: m.id, name: m.category}))
                setInterestsLookup(interests)
            }
        })

    }, [])

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const toSave = {}

        if (values.custom) {
            const lookupUrl = makeUrl("Profiles", Endpoints.lookup.interest)
            values.custom.split(',').forEach((v: string) => {
                post(lookupUrl, {category: v.trimStart().trimEnd()},
                    (data) => {
                        actions.resetForm()
                        dispatch({
                            type: '',
                            payload: {...data}
                        })
                        if (onClose) {
                            onClose()
                        }
                    },
                    () => Toast.error("Unable to update your profile. Please try again later"),
                    () => {
                        actions.setSubmitting(false)
                    }
                )
            })

        }

        if (values.interests) {
            const url = makeUrl("Profiles", Endpoints.person.interest)

            values.interests.forEach((interest: any) => {
                post(url, {personId: person.id, interestId: interest},
                    (data) => {
                        actions.resetForm()
                        dispatch({
                            type: '',
                            payload: {...data}
                        })
                        if (onClose) {
                            onClose()
                        }
                    },
                    () => Toast.error("Unable to update your profile. Please try again later"),
                    () => {
                        actions.setSubmitting(false)
                    }
                )
            })


        }


    }

    return (
        <XForm
            debug={false}
            schema={schema}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                {personInterests ?
                    <Grid item xs={12}>
                        {
                            personInterests.map(i => (
                                <Chip key={i.id} label={i.name}/>
                            ))
                        }
                    </Grid> : ""}
                <Grid item xs={12}>
                    <XSelectInput
                        multiline={true}
                        label={"Select one or more interest"}
                        multiple={true}
                        name={"interests"}
                        options={interestsLookup.filter(s => !personInterests.includes(s))}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        variant={"outlined"}
                        label={"Are you interested in something else?"}
                        helperText={"Use (,) to add multiple interests"}
                        name={"custom"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateInterestsForm