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
import {getProfile} from "../../../../../services/User";
import {addInterest} from "../../personSlice";
import {unwrapResult} from "@reduxjs/toolkit";

interface IProps {
    interests: any | undefined
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

        // lookup interests
        const lookupInterestUrl = makeUrl("Profiles", Endpoints.lookup.interest)
        get(lookupInterestUrl, {}, (response) => {
            if (response) {
                let lookupInterests = response.map((m: any) => ({id: m.id, name: m.category}))

                const lookupInterestsFiltered: any = []
                lookupInterests.forEach((el: any) => {
                    const exists = interests.some((i: any) => i.interestId === el.id)
                    if(!exists){
                        lookupInterestsFiltered.push(el)
                    }
                })

                lookupInterests = lookupInterestsFiltered
                setInterestsLookup(lookupInterests)
            }
        })

    }, [interests])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        const {interests, custom} = values
        const user: IPerson = getProfile()

        if (custom) {
            await Promise.all(custom.split(',').map(async (interest: string) => {
                const resultAction: any = await dispatch(addInterest({
                    personId: user.id,
                    name: interest.trimStart().trimEnd()
                }))
                unwrapResult(resultAction)
            }))
        }

        if (interests) {
            await Promise.all(interests.map(async (interest: string) => {
                const resultAction: any = await dispatch(addInterest({
                    personId: user.id, interestId: interest,
                    interest: interestsLookup.filter(f => f.id === interest)[0]
                }))
                unwrapResult(resultAction)
            }))
        }

        if (onClose) {
            onClose()
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
                            interests.map((i: any) => (
                                <Chip style={{margin: 3}}
                                      color={"secondary"}
                                      key={i.interest.id}
                                      label={i.interest.category}/>
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