import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './XStepper.css'
import {Grid, Paper, StepContent} from "@material-ui/core";
import {on} from "cluster";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
    }),
);

export interface IStep{
    index: number
    label: string
    icon: any
    children?: any
}

interface IProps {
    steps: IStep[]
    onSubmit?: any
}

const getStepContent = (stepIndex: number, steps: IStep[]) => {
    return steps.find((step: IStep) => step.index === stepIndex)?.children
}

const XStepper = ({steps, onSubmit}: IProps) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {

        if (activeStep === steps.length - 1 && onSubmit){
            onSubmit()
        }

        else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation={"horizontal"} alternativeLabel>
                {steps.map((step: IStep, index: number) => (
                    <Step key={index}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep, steps)}
                            </Typography>
                            <div className={classes.actionsContainer}>
                                <Grid container justify={"center"}>
                                    <Grid item>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            Back
                                        </Button>
                                        <Button variant="text" color="primary" onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
            {/*<div className="Stepper-content">*/}
            {/*    {activeStep === steps.length ? (*/}
            {/*        <div>*/}
            {/*            <Button onClick={handleReset}>Reset</Button>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <div>*/}
            {/*            <Typography className={classes.instructions}>*/}
            {/*                {getStepContent(activeStep, steps)}*/}
            {/*            </Typography>*/}
            {/*            <Grid container justify={"center"}>*/}
            {/*                <Grid item>*/}
            {/*                    <Button*/}
            {/*                        disabled={activeStep === 0}*/}
            {/*                        onClick={handleBack}*/}
            {/*                        className={classes.backButton}*/}
            {/*                    >*/}
            {/*                        Back*/}
            {/*                    </Button>*/}
            {/*                    <Button variant="text" color="primary" onClick={handleNext}>*/}
            {/*                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
            {/*                    </Button>*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
}

export default XStepper