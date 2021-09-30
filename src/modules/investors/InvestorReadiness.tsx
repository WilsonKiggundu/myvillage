import React, {useState} from 'react';
// import Particles from "react-particles-js";
import particlesConfig from "../../config/configParticles";
import {Box, Button, Card, CardContent, CardHeader, Container, Grid} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import QuizIcon from "@material-ui/icons/QuestionAnswer"

import './css/InvestorReadiness.css'
import {useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import {handleLogin} from "../../utils/authHelpers";
import {AddCircle} from "@material-ui/icons";
import UpdateStartupDetails from "../profiles/startups/forms/UpdateStartupDetails";
import XDialog from "../../components/dialogs/XDialog";
import TakeAssessment from "./forms/TakeAssessment";

const InvestorReadiness = () => {

    const user = useSelector(userSelector)
    const [addStartupDialog, setAddStartupDialog] = useState<boolean>(false)
    const [assessmentDialog, showAssessmentDialog] = useState<boolean>(false)

    const handleRegisterBusiness = async () => {
        if (!user) await handleLogin()
        else setAddStartupDialog(true)
    }
    const handleTakeAssessmentClick = async () => {
        if (!user) await handleLogin()
        else showAssessmentDialog(true)
    }

    return (
        <>
            <div className="particles-background">
                {/* <Particles height={"50vh"} width={"100%"} params={particlesConfig}/> */}
            </div>

            <div className="ir-jumbotron">
                <Grid container justify={"center"}>
                    <Grid item xs={12} lg={4}>
                        <h1 className="ir-title">Is your idea or business <strong>ready for investment?</strong></h1>
                        <Box mt={2}>
                            <Button size={"large"} variant={"contained"}
                                    onClick={handleTakeAssessmentClick}
                                    disableElevation color={"primary"}>
                                Take the assessment</Button>
                        </Box>

                        <XDialog title={"Assess your business"}
                                 maxWidth={"sm"}
                                 open={assessmentDialog}
                                 onClose={() => showAssessmentDialog(false)}>
                            <TakeAssessment onClose={() => showAssessmentDialog(false)}/>
                        </XDialog>
                    </Grid>
                </Grid>
            </div>

            <Box mt={4}>
                <Container maxWidth={"lg"}>
                    <Grid spacing={4} container justify={"center"}>
                        <Grid item xs={12} lg={4}>
                            <Card elevation={0}>
                                <CardContent>
                                    <AccountCircleIcon className="ir-icon"/>
                                </CardContent>
                                <CardHeader title={"Create an account"}/>
                                <CardContent>
                                    <p>You need to have an account. If you don't have one, you can create one. It's
                                        simple and quick.</p>
                                    <Button size={"small"}
                                            className="mr-2"
                                            disableElevation
                                            onClick={handleLogin}
                                            variant={"contained"}
                                            color={"secondary"}>Signup</Button>
                                    <Button size={"small"}
                                            variant={"outlined"}
                                            onClick={handleLogin}
                                            color={"secondary"}>Login</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Card elevation={0}>
                                <CardContent>
                                    <AddCircle className="ir-icon"/>
                                </CardContent>

                                <CardHeader title={"Register your business"}/>
                                <CardContent>
                                    <p>There is no limit to the number of businesses you can register.</p>
                                    <Button size={"small"}
                                            className="mr-2"
                                            onClick={handleRegisterBusiness}
                                            disableElevation
                                            variant={"contained"}
                                            color={"default"}>Register</Button>
                                </CardContent>

                                <XDialog title={"Register your business"}
                                         maxWidth={"sm"}
                                         open={addStartupDialog}
                                         onClose={() => setAddStartupDialog(false)}>
                                    <UpdateStartupDetails onClose={() => setAddStartupDialog(false)}/>
                                </XDialog>

                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Card elevation={0}>
                                <CardContent>
                                    <QuizIcon className="ir-icon"/>
                                </CardContent>

                                <CardHeader title={"Take the assessment"}/>
                                <CardContent>
                                    <p>Find out if your business / idea is ready for investment. You can do the
                                        assessment as many times as you wish.</p>
                                    <Button size={"small"}
                                            className="mr-2"
                                            disableElevation
                                            variant={"outlined"}
                                            color={"primary"}>Take assessment</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default InvestorReadiness
