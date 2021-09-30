import XForm from "../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {reqString} from "../../../../data/validations";
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import XTextInput from "../../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../../components/inputs/XTextAreaInput";
import {IAddress} from "../../../../interfaces/IAddress";
import {IStartup} from "../../../../interfaces/IStartup";
import XSelectInput from "../../../../components/inputs/XSelectInput";
import {Options} from "../../../../utils/options";
import {countries} from "../../../../data/Countries";
import {ICountry} from "../../../../interfaces/ICountry";
import {addStartupAddress, editStartupAddress} from "../redux/startupsActions";

interface IProps {
    onClose?: () => any
    profile: IStartup
    address?: IAddress
}

const schema = yup.object().shape(
    {
        type: reqString,
        country: reqString
    }
)

const UpdateAddressForm = ({onClose, address, profile}: IProps) => {
    const dispatch = useDispatch()

    const initialValues = {...address}

    const handleSubmit = async (values: IAddress, actions: FormikHelpers<any>) => {
        try {
            values.businessId = profile.id
            dispatch(address?.id ? editStartupAddress(values) : addStartupAddress(values))
        } catch (e) {

        } finally {
            actions.resetForm()
            if (onClose) onClose()
        }
    }

    return (
        <XForm
            debug={false}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12} sm={6}>
                    <XSelectInput
                        label={"Type"}
                        name={"type"}
                        options={Options.ADDRESS_TYPES}
                        helperText={"Ex. Mailing"}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XTextInput label={"Postal code"} name={"postalCode"}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XSelectInput
                        multiple={false}
                        helperText={"Ex. Uganda, Kenya, Remote"}
                        name={"country"}
                        label={"Country"}
                        options={countries.map((c: ICountry) => ({id: c.label, name: c.label}))}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XTextInput
                        label={"City"}
                        name={"city"}
                        helperText={"Ex. Kampala"}
                    />
                </Grid>

                {/*<Grid item xs={12} sm={4}>*/}
                {/*    <XTextInput*/}
                {/*        label={"Region"}*/}
                {/*        name={"region"}*/}
                {/*    />*/}
                {/*</Grid>*/}

                <Grid item xs={12} sm={6}>
                    <XTextInput
                        label={"Building"}
                        name={"building"}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <XTextInput
                        label={"Floor"}
                        name={"floor"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        label={"Street address"}
                        name={"street"}
                    />
                </Grid>

                <Grid item xs={12}>
                    <XTextAreaInput
                        rows={2}
                        label={"Address line"}
                        name={"addressLine"}
                    />
                </Grid>

            </Grid>

        </XForm>
    )
}

export default UpdateAddressForm
