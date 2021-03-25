import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqObject, reqString} from "../../../../data/validations";
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import {IStartup} from "../../../../interfaces/IStartup";
import XSelectInputAsync from "../../../../components/inputs/XSelectInputAsync";
import {Endpoints} from "../../../../services/Endpoints";
import XSelectInputCreatable from "../../../../components/inputs/XSelectInputCreatable";
import {Options} from "../../../../utils/options";
import {editStartupRoles} from "../redux/startupsActions";

interface IProps {
    onClose?: () => any
    profile: IStartup
}

const schema = yup.object().shape(
    {
        personId: reqString,
        role: reqObject
    }
)

const AddStartupRole = ({onClose, profile}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {}

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        values.businessId = profile?.id

        dispatch(editStartupRoles(values))

        if (onClose) onClose()
    }

    return (
        <XForm
            debug={false}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XSelectInputAsync
                        name="personId"
                        label={"Who do you want to add?"}
                        helperText={"Start typing their name. Only people with MyVillage profiles can be added."}
                        data={{
                            label: 'fullName',
                            field: 'persons',
                            params: {page: 1, pageSize: 25},
                            avatar: 'avatar',
                            endpoint: Endpoints.base + Endpoints.person.base
                        }}
                        variant={"outlined"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XSelectInputCreatable
                        name="role"
                        multiple={false}
                        allowAddNew={true}
                        label={"What is their role?"}
                        options={Options.STARTUP_ROLES}
                        helperText={"You can add any role"}
                        variant={"outlined"}
                    />
                </Grid>

            </Grid>

        </XForm>
    )
}

export default AddStartupRole