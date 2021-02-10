import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {get, makeUrl} from "../../../../utils/ajax";
import {Grid} from "@material-ui/core";
import {IOption} from "../../../../components/inputs/inputHelpers";
import {Endpoints} from "../../../../services/Endpoints";
import {IStartup} from "../../../../interfaces/IStartup";
import XSelectInputCreatable from "../../../../components/inputs/XSelectInputCreatable";
import {editStartupInterests} from "../redux/startupsActions";
import {startupSelector} from "../redux/startupsSelectors";

interface IProps {
    interests: any | undefined
    profile: IStartup
    onClose?: () => any
}

const schema = yup.object().shape(
    {}
)

const UpdateStartupInterestsForm = ({onClose, profile, interests}: IProps) => {

    const dispatch = useDispatch()

    const [interestsLookup, setInterestsLookup] = useState<IOption[]>([])
    const startupInterests = useSelector((state) => startupSelector(state, profile.id)).interests

    useEffect(() => {

        const lookupInterestUrl = makeUrl("Profiles", Endpoints.lookup.interest)
        get(lookupInterestUrl, {}, (response) => {
            if (response) {
                let lookupInterests = response.map((m: any) => ({interestId: m.id, name: m.category}))

                const lookupInterestsFiltered: any = []
                lookupInterests.forEach((el: any) => {
                    const exists = interests.some((i: any) => i.interestId === el.interestId)
                    if (!exists) {
                        lookupInterestsFiltered.push(el)
                    }
                })

                lookupInterests = lookupInterestsFiltered
                setInterestsLookup(lookupInterests)
            }
        })

    }, [])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        const {interests} = values

        if (interests) {
            dispatch(editStartupInterests({interests: JSON.stringify(interests), businessId: profile.id}))
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
                <Grid item xs={12}>
                    <XSelectInputCreatable
                        variant={"outlined"}
                        allowAddNew={true}
                        multiline={true}
                        label={"Select one or more interests"}
                        helperText={"You can also add a new interest if the suggested list is not exhaustive"}
                        multiple={true}
                        name={"interests"}
                        options={interestsLookup.filter(s => !startupInterests.includes(s))}
                    />
                </Grid>

            </Grid>

        </XForm>
    )
}

export default UpdateStartupInterestsForm