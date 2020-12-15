import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {reqString} from "../../../../../data/validations";
import {useDispatch} from "react-redux";
import {get, makeUrl, put} from "../../../../../utils/ajax";
import Toast from "../../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../../components/inputs/XTextAreaInput";
import Box from "@material-ui/core/Box";
import FormHelperText from "@material-ui/core/FormHelperText";
import XRadioInput from "../../../../../components/inputs/XRadioInput";
import {Options} from "../../../../../utils/options";
import XDateInput from "../../../../../components/inputs/XDateInput";
import {IPerson} from "../../IPerson";
import {Endpoints} from "../../../../../services/Endpoints";
import XSelectInput from "../../../../../components/inputs/XSelectInput";
import {IOption} from "../../../../../components/inputs/inputHelpers";
import {addCategory, getCategories, updatePerson} from "../../personSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {on} from "cluster";

interface IProps {
    person: IPerson
    done?: () => any
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        firstname: reqString,
        lastname: reqString,
    }
)



const UpdateProfileForm = ({done, person, onClose}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {
        firstname: person.firstname,
        lastname: person.lastname,
        gender: person.gender,
        bio: person.bio,
        dateOfBirth: person.dateOfBirth,
        categories: person.categories?.map((category: any) => category.categoryId)
    }

    const [categories, setCategories] = useState<IOption[]>([]);

    useEffect(() => {
        const url = makeUrl("Profiles", Endpoints.lookup.category)
        get(url, {}, (categories) => {
            if (categories) {
                setCategories(categories)
            }
        })

    }, [setCategories])

    const handleSubmit = async (values: IPerson, actions: FormikHelpers<any>) => {
        values.id = person.id

        try {
            const resultAction: any = await dispatch(updatePerson(values))
            await dispatch(getCategories(person.id))
            unwrapResult(resultAction)
        } catch (e) {

        }

        if(onClose) onClose()
    }

    return (
        <XForm
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12} sm={6}>
                    <XTextInput
                        name="firstname"
                        label={"First name"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XTextInput
                        name="lastname"
                        label={"Last name"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XSelectInput
                        options={categories}
                        label={"Category"}
                        multiple={true}
                        helperText={"Select all that apply to you"}
                        name={"categories"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box mt={2}>
                        <XRadioInput
                            helperText={"Your gender will help us give you the most relevant content."}
                            label={"Gender"}
                            name={"gender"}
                            options={Options.GENDER}/>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XDateInput
                        disableFuture={true}
                        label={"Date of birth"}
                        name={"dateOfBirth"}
                        variant={"standard"}
                    />
                    <FormHelperText>The date of birth will help us give you age appropriate content.</FormHelperText>
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        name={"bio"}
                        rows={4}
                        rowsMax={28}
                        label={"Short description about you"}
                        variant={"standard"}
                        margin={"none"}
                    />
                    <FormHelperText>Say a few things about you that make you stand out of the crowd.</FormHelperText>
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateProfileForm