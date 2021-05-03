import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {reqObject, reqString} from "../../../../../data/validations";
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../../components/inputs/XTextAreaInput";
import {IPerson} from "../../IPerson";
import XSelectInputCreatable from "../../../../../components/inputs/XSelectInputCreatable";
import {getAsync, makeUrl} from "../../../../../utils/ajax";
import {Endpoints} from "../../../../../services/Endpoints";
import {addPersonProject, editPersonProject} from "../../redux/peopleActions";

interface IProps {
    onClose?: () => any
    id?: string
    person: IPerson
    education?: any
}

const schema = yup.object().shape(
    {
        institute: reqObject,
        title: reqString,
        startYear: reqString,
        endYear: reqString,
        description: reqString
    }
)

const UpdateProjectForm = ({onClose, id, education, person}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {...education}

    const [schools, setSchools] = useState<any>([])

    useEffect(() => {
        (async () => {
            const lookupUrl = makeUrl("Profiles", Endpoints.lookup.school)
            const response: any = await getAsync(lookupUrl, {});

            if (response.status === 200) {
                setSchools(response.body.map((m: any) => ({id: m.id, name: m.name})))
            }

        })();
    }, [setSchools])

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
        values.personId = person.id

        dispatch(values.id ? editPersonProject(values) : addPersonProject(values))

        if (onClose) onClose()

        //actions.resetForm()
    }

    return (
        <XForm
            debug={false}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    {education?.institute ? (
                        <XSelectInputCreatable
                            variant={"standard"}
                            name={"institute"}
                            defaultValue={education?.institute}
                            allowAddNew={true}
                            multiple={false}
                            label={"Select or add a school"}
                            options={schools}/>
                    ) : (
                        <XSelectInputCreatable
                            variant={"standard"}
                            name={"institute"}
                            allowAddNew={true}
                            multiple={false}
                            label={"Select or add a school"}
                            options={schools}/>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        label={"Degree / Diploma / Certificate"}
                        name={"title"}
                        helperText={"Ex. BSc. Electrical Engineering"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        label={"Field of study"}
                        name={"fieldOfStudy"}
                        helperText={"Ex. Electronics"}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <XTextInput
                        label={"Grade"}
                        name={"grade"}
                        helperText={"Ex. First class honors. Optional"}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <XTextInput
                        label={"Start year"}
                        name={"startYear"}
                        helperText={"Ex. 2007"}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <XTextInput
                        label={"End year (or expected)"}
                        name={"endYear"}
                        helperText={"Ex. 2011"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={3}
                        rowsMax={12}
                        label={"Description"}
                        name={"description"}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <XTextAreaInput
                        rows={1}
                        multiline={true}
                        rowsMax={4}
                        label={"Activities"}
                        name={"activities"}
                        helperText={"Ex. Volleyball, debating club"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateProjectForm