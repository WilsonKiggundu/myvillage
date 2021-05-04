import XForm from "../../../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {useState} from "react";
import * as yup from "yup"
import {reqString} from "../../../../../data/validations";
import {useDispatch, useSelector} from "react-redux";
import {Grid, FormControlLabel, FormLabel, RadioGroup, FormControl, Radio, FormHelperText} from "@material-ui/core";
import XTextInput from "../../../../../components/inputs/XTextInput";
import {addPersonStack, editPersonStack} from "../../redux/peopleActions";
import {userSelector} from "../../../../../data/coreSelectors";
import {ITechStack} from "../../../../../interfaces/ITechStack";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import XRadioInput from "../../../../../components/inputs/XRadioInput";

interface IProps {
    onClose?: () => any
    stack?: ITechStack
}

const schema = yup.object().shape(
    {
        stack: reqString
    }
)

const UpdateTechStackForm = ({onClose, stack}: IProps) => {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const [level, setLevel] = useState<string | undefined>(stack?.level ?? 'intermediate');

    const initialValues: ITechStack = {
        personId: user.profile.sub,
        stack: stack?.stack ?? '',
        level: stack?.level ?? ''
    }

    const handleChange = (event : any) => {
        setLevel(event.target.value);
    };

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        values.level = level

        if (stack?.id) {
            values.id = stack.id
            dispatch(editPersonStack(values))
        } else {
            dispatch(addPersonStack(values))
        }

        if (onClose) onClose()
        actions.resetForm()
    }

    return (
        <XForm
            debug={false}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XTextInput
                        variant={"filled"}
                        label={"Stack"}
                        autoFocus
                        placeholder={"Ex. Mongoose, jQuery"}
                        helperText={"Language / Library / Framework / Environment"}
                        name={"stack"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormHelperText>At what level of expertise are you?</FormHelperText>
                        <RadioGroup row aria-label="level" name="level" value={level} onChange={handleChange}>
                            <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                            <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                            <FormControlLabel value="Expert" control={<Radio />} label="Expert" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

        </XForm>
    )
}

export default UpdateTechStackForm