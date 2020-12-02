import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {get, makeUrl, post} from "../../../../utils/ajax";
import Toast from "../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import XSelectInput from "../../../../components/inputs/XSelectInput";
import {IOption} from "../../../../components/inputs/inputHelpers";
import {Endpoints} from "../../../../services/Endpoints";
import Chip from "@material-ui/core/Chip";
import XTextInput from "../../../../components/inputs/XTextInput";
import {IStartup} from "../../../../interfaces/IStartup";

interface IProps {
    interests: IOption[]
    profile: IStartup
    done?: () => any
}

const schema = yup.object().shape(
    {}
)

const UpdateStartupInterestsForm = ({done, profile, interests}: IProps) => {
    const dispatch = useDispatch()

    const [interestsLookup, setInterestsLookup] = useState<IOption[]>([])
    const [startupInterests, setStartupInterests] = useState<IOption[]>([])

    useEffect(() => {

        // startup interests
        const startupInterestUrl = makeUrl("Profiles", Endpoints.business.interest)
        get(startupInterestUrl, {businessId: profile.id}, (interests: any) => {
            if (interests.length) {
                setStartupInterests(interests.map((m: any) => ({id: m.interest.id, name: m.interest.category})))
            }
        })

        // lookup interests
        const lookupInterestUrl = makeUrl("Profiles", Endpoints.lookup.interest)
        get(lookupInterestUrl, {}, (interests: any) => {
            if (interests.length) {
                setInterestsLookup(interests.map((m: any) => ({id: m.id, name: m.category})))
            }
        })

    }, [])

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const toSave = {}

        if (values.custom) {
            const lookupUrl = makeUrl("Profiles", Endpoints.lookup.interest)
            values.custom.split(',').forEach((v: string) => {
                post(lookupUrl, {category: v.trimStart().trimEnd()},
                    (data: any) => {
                        actions.resetForm()
                        dispatch({
                            type: '',
                            payload: {...data}
                        })
                        if (done) {
                            done()
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
            const url = makeUrl("Profiles", Endpoints.business.interest)

            values.interests.forEach((interest: any) => {
                post(url, {businessId: profile.id, interestId: interest},
                    (data: any) => {
                        actions.resetForm()
                        dispatch({
                            type: '',
                            payload: {...data}
                        })
                        if (done) {
                            done()
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
                {startupInterests ?
                    <Grid item xs={12}>
                        {
                            startupInterests.map(i => (
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
                        options={interestsLookup.filter(s => !startupInterests.includes(s))}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        variant={"outlined"}
                        label={"Is your startup interested in something else?"}
                        helperText={"Use (,) to add multiple interests"}
                        name={"custom"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateStartupInterestsForm