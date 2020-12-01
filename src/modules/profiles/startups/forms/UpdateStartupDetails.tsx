import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import * as yup from "yup"
import {reqString} from "../../../../data/validations";
import {useDispatch} from "react-redux";
import {makeUrl, post, put} from "../../../../utils/ajax";
import Toast from "../../../../utils/Toast";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../components/inputs/XTextAreaInput";
import Box from "@material-ui/core/Box";
import XDateInput from "../../../../components/inputs/XDateInput";
import {Endpoints} from "../../../../services/Endpoints";
import {IPerson} from "../../people/IPerson";
import {getUser} from "../../../../services/User";
import XSelectInput from "../../../../components/inputs/XSelectInput";
import {Options} from "../../../../utils/options";

interface IProps {
    done?: () => any
}

const schema = yup.object().shape(
    {
        name: reqString,
        description: reqString,
        numberOfEmployees: reqString,
        dateOfIncorporation: reqString,
        category: reqString
    }
)



const UpdateStartupDetails = ({done}: IProps) => {
    const dispatch = useDispatch()

    const [user, setUser] = useState<any>(null)

    const initialValues = {}

    useEffect(() => {
        const user = getUser()
        setUser(user)
    }, [setUser])

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const url = makeUrl("Profiles", Endpoints.business.base)

        post(url, values,
            (data) => {
                Toast.info("Your startup has been added successfully successfully")
                actions.resetForm()
                dispatch({
                    type: '',
                    payload: {...data}
                })
                if (done) {
                    done()
                }
            },
            (err) => {
                Toast.error("Unable to enroll your startup. Please try again later")
            },
            () => {
                actions.setSubmitting(false)
            }
        )
    }

    return (
        <XForm
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12} sm={4}>
                    <XTextInput
                        name="name"
                        label={"What is the name of your startup?"}
                        type={"text"}
                        helperText={"Ensure you spell it correctly to increase visibility. Required"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <XSelectInput
                        name="category"
                        multiple={false}
                        label={"How do you categorize your startup?"}
                        options={Options.STARTUP_CATEGORIES}
                        helperText={"People are always looking for startups in specific categories. Required"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <XTextAreaInput
                        name="description"
                        rows={6}
                        label={"Say something brief about your startup..."}
                        helperText={"Say as much as you can about your startup to capture the attention of the community. Required"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <XTextInput
                        name="numberOfEmployees"
                        label={"How many employees do you have?"}
                        helperText={"It's fine if you just put an approximate number. Required"}
                        type={"text"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box mt={2}>
                        <XDateInput
                            disableFuture={true}
                            helperText={"This helps to know the stage at which your startup."}
                            label={"Date of Incorporation"}
                            name={"dateOfIncorporation"}/>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        name={"website"}
                        label={"Enter the website url"}
                        helperText={"A website is a quick place people can learn more about your startup"}
                        variant={"standard"}
                        margin={"none"}
                    />
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateStartupDetails