import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {getAsync, makeUrl} from "../../../../../utils/ajax";
import {Grid} from "@material-ui/core";
import {IPerson} from "../../IPerson";
import {Endpoints} from "../../../../../services/Endpoints";
import {reqString} from "../../../../../data/validations";
import XSelectInputCreatable from "../../../../../components/inputs/XSelectInputCreatable";
import {editPersonSkills} from "../../redux/peopleActions";

interface IProps {
    person: IPerson
    done?: () => any
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        skills: reqString
    }
)


const UpdateSkillsForm = ({done, person, onClose}: IProps) => {
    const dispatch = useDispatch()

    const {skills} = person

    const [skillsLookup, setSkillsLookup] = useState<any>([])

    useEffect(() => {

        (async () => {
            const lookupUrl = makeUrl("Profiles", Endpoints.lookup.skill)
            const response: any = await getAsync(lookupUrl, {});

            if (response.status === 200){
                let lookupSkills = response.body.map((m: any) => ({id: m.id, name: m.name}))

                const lookupSkillsFiltered: any = []
                lookupSkills.forEach((el: any) => {
                    const exists = skills?.some((i: any) => i.skillId === el.id)
                    if (!exists) {
                        lookupSkillsFiltered.push(el)
                    }
                })

                setSkillsLookup(lookupSkillsFiltered)
            }

        })();

    }, [])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        dispatch(editPersonSkills({skills: values.skills, personId: person.id}))
        actions.resetForm()
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
                        name={"skills"}
                        allowAddNew={true}
                        multiple={true}
                        label={"Select or add a skill"}
                        options={skillsLookup}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateSkillsForm