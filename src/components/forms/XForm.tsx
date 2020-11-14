import React, {useState} from "react";
import {Form, Formik, FormikHelpers} from 'formik';

import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {Alert} from "@material-ui/lab";
import {hasValue} from "../inputs/inputHelpers";
import {makeStyles} from "@material-ui/core/styles";
import XSubmitButton from "../buttons/XSubmitButton";

interface IProps {
    schema?: any
    onSubmit: (values: any, actions: FormikHelpers<any>) => any
    onCancel?: () => any
    onDelete?: () => any
    debug?: boolean
    loading?: boolean
    children?: React.ReactNode
    initialValues?: any
    submitButtonLabel?: string
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 350,
        [theme.breakpoints.down('sm')]: {
            minWidth: "100%",
        }
    }
}));

const XForm = (props: IProps) => {
    const [count, setCount] = useState<number>(0)
    const classes = useStyles()

    function handleDelete() {
        if (count === 1) {
            setCount(0)
            props.onDelete && props.onDelete()
        } else {
            setCount(count + 1)
        }
    }

    return <Formik
        initialValues={props.initialValues || {}}
        onSubmit={props.onSubmit}
        validationSchema={props.schema}
        validateOnBlur
        enableReinitialize
    >{({submitForm, isSubmitting, values, errors, touched, submitCount}) => (
        <Form>
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12}>
                    <Box m={2}>
                        {props.children}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box p={1} pt={2}>
                        <Grid container spacing={1} alignContent='flex-end' justify='flex-end'>
                            {
                                props.onDelete &&
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        color='default'
                                        onClick={handleDelete}
                                        disabled={isSubmitting}
                                    >{count === 1 ? '! Confirm' : 'Delete'}</Button>
                                </Grid>
                            }
                            {
                                props.onCancel &&
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        color='default'
                                        onClick={props.onCancel}
                                        disabled={isSubmitting || props.loading}
                                    >Cancel</Button>
                                </Grid>
                            }
                            <Grid item>
                                <XSubmitButton
                                    color={"primary"}
                                    label={props.submitButtonLabel ?? "Submit"}
                                    onClick={submitForm}
                                    disabled={isSubmitting || props.loading} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                {
                    props.debug &&
                    <Grid item xs={12}>
                        <pre style={{width: '100%', height: "100%"}}>
                            {JSON.stringify({values, errors, touched}, null, 2)}
                        </pre>
                    </Grid>
                }
            </Grid>
        </Form>
    )}</Formik>
}

export default XForm
