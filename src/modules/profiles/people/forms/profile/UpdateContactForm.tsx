import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqString} from "../../../../../data/validations";
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../../components/inputs/XTextAreaInput";
import {IContact} from "../../../../../interfaces/IContact";
import XSelectInput from "../../../../../components/inputs/XSelectInput";
import {Options} from "../../../../../utils/options";
import {addPersonContact, editPersonContact} from "../../redux/peopleActions";
import {IPerson} from "../../IPerson";
import {userSelector} from "../../../../../data/coreSelectors";


interface IProps {
    onClose?: () => any
    profile: IPerson
    contact?: IContact
}

const schema = yup.object().shape(
    {
        type: reqString,
        value: reqString
    }
)

const UpdateContactForm = ({onClose, contact, profile}: IProps) => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    // const initialValues = {...contact}
    const initialValues: IContact = {
        belongsTo: user.profile.sub,
        details: "Personal email",
        value: "wil.kiggundu@gmail.com",
        category: 1,
        type: 1
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
        try {
            values.belongsTo = profile.id

            if(contact?.id){
                dispatch(editPersonContact(values))
            }else
            {
                dispatch(addPersonContact(values))
            }

        } catch (e) {

        } finally {
            actions.resetForm()
            if (onClose) onClose()
        }
    }

    return (
        <XForm
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12} sm={6}>
                    <XSelectInput
                        label={"Type"}
                        name={"type"}
                        multiple={false}
                        options={Options.CONTACT_TYPES}
                        helperText={"Ex. Telephone"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <XSelectInput
                        label={"Category"}
                        name={"category"}
                        multiple={false}
                        options={Options.CONTACT_CATEGORIES}
                        helperText={"Ex. Primary, Alternative"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        label={"Value"}
                        name={"value"}
                        helperText={"Ex. someone@email.com"}/>
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={3}
                        label={"Details"}
                        name={"details"}
                        helperText={"Any additional information about the contact"}/>
                </Grid>

            </Grid>

        </XForm>
    )
}

export default UpdateContactForm