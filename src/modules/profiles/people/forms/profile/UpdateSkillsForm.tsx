import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {get, makeUrl, post} from "../../../../../utils/ajax";
import Toast from "../../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import {IPerson} from "../../IPerson";
import {IOption} from "../../../../../components/inputs/inputHelpers";
import {Endpoints} from "../../../../../services/Endpoints";
import Chip from "@material-ui/core/Chip";
import XTextInput from "../../../../../components/inputs/XTextInput";
import {reqString} from "../../../../../data/validations";

interface IProps {
    skills: IOption[]
    person: IPerson
    done?: () => any
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        skills: reqString
    }
)


const UpdateSkillsForm = ({done, person, skills, onClose}: IProps) => {
    const dispatch = useDispatch()

    const [personSkills, setPersonSkills] = useState<IOption[]>([])

    useEffect(() => {

        // person skills
        const url = makeUrl("Profiles", Endpoints.person.skill)
        get(url, {personId: person.id}, (response) => {

            if (response) {
                const skills = response.map((m: any) => ({id: m.id, name: m.details}))
                setPersonSkills([...skills])
            }
        })

    }, [])

    function handleSubmit(values: any, actions: FormikHelpers<any>) {

        if (values.skills) {
            const url = makeUrl("Profiles", Endpoints.person.skill)

            values.skills.split(',').forEach((skill: any) => {
                post(url, {personId: person.id, details: skill},
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
                    () => Toast.error("Unable to add skills to your profile. Please try again later"),
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
                {personSkills ?
                    <Grid item xs={12}>
                        {
                            personSkills.map(i => (
                                <Chip key={i.id} label={i.name}/>
                            ))
                        }
                    </Grid> : ""}

                <Grid item xs={12}>
                    <XTextInput
                        variant={"outlined"}
                        label={"Are you skilled in something else?"}
                        helperText={"Use (,) to add multiple skills"}
                        name={"skills"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateSkillsForm