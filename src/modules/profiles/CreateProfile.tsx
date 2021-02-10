import React, {useState} from "react"
import {Card} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {Urls} from "../../routes/Urls";
import Grid from "@material-ui/core/Grid";
import XForm from "../../components/forms/XForm";
import XTextInput from "../../components/inputs/XTextInput";
import XRadioInput from "../../components/inputs/XRadioInput";
import {Options} from "../../utils/options";
import XTextAreaInput from "../../components/inputs/XTextAreaInput";
import XDateInput from "../../components/inputs/XDateInput";
import * as yup from "yup";
import {reqString} from "../../data/validations";
import {IProfile} from "../../interfaces/IProfile";
import {makeUrl, post} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import Toast from "../../utils/Toast";
import Logo from "../../assets/images/myvillage-logo.png"
import palette from "../../theme/palette";
import {useSelector} from "react-redux";
import {globalStyles} from "../../theme/styles";
import {white} from "../../theme/custom-colors";

interface IProps {
    history: any
}

const schema = yup.object().shape(
    {
        firstName: reqString,
        lastName: reqString,
        dateOfBirth: reqString,
        gender: reqString
    }
)

export const CreateProfile = (props: IProps) => {

    const classes = globalStyles()
    const {user} = useSelector((state: any) => state.oidc)

    const initialValues = {
        email: user.profile.email,
        firstName: user.profile.given_name,
        lastName: user.profile.family_name,
    }

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (values: IProfile) => {
        setLoading(true)

        values.userId = user.profile.sub

        const url = makeUrl("Profiles", Endpoints.person.base)
        post(url, values, (response) => {
            if (response) {
                window.location.replace(Urls.profiles.onePerson(values.userId))
            }
        }, err => {
            Toast.error("Unable to create your profile. Try again")
        })
    }

    return (
        <Container style={{overflow: 'auto', height: '100vh'}} maxWidth={false}>

            <Grid justify={"center"} container spacing={2}>
                <Grid item xs={12} lg={9}>
                    <Box style={{backgroundColor: palette.tertiary.main, color: white}} p={3}>
                        <Grid container spacing={4}>
                            <Grid item>
                                <img alt={"logo"} src={Logo} style={{height: 100, width: 'auto'}}/>
                            </Grid>
                            <Grid item>
                                <Box mb={3}>
                                    <Typography variant={"h5"}>
                                        <strong>Welcome, {user.profile.given_name}</strong>
                                    </Typography><br/>
                                    <Typography variant={"h6"}>Start creating your profile.</Typography>
                                    <Typography variant={"body2"}>A profile helps you get noticed as well as get
                                        notified <br/>about things that you are interested in.</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <CardContent>
                            <XForm
                                debug={false}
                                schema={schema}
                                initialValues={initialValues}
                                submitButtonLabel={"Create profile"}
                                loading={loading}
                                onSubmit={handleSubmit}>

                                <Box mb={3}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={6}>
                                            <XTextInput
                                                name={"firstName"}
                                                disabled
                                                helperText={"Ex. John"}
                                                label={"First name"}/>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <XTextInput
                                                name={"lastName"}
                                                disabled
                                                helperText={"Ex. Joe"}
                                                label={"Last name"}/>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <XTextInput
                                                name={"email"}
                                                disabled
                                                helperText={"We shall use your email to communicate to you. We don't share it with anyone"}
                                                label={"Email address"}/>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <XDateInput
                                                disableFuture
                                                label={"Date of birth"}
                                                name={"dateOfBirth"}
                                                helperText={"Knowing your age will help us give you age appropriate content."}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <XRadioInput
                                                label={"What is your gender?"}
                                                name={"gender"}
                                                helperText={"Your gender will help us give you the most relevant content. It's optional."}
                                                options={Options.GENDER}/>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <XTextAreaInput
                                                name={"bio"}
                                                rows={6}
                                                label={"Say something about your self"}
                                                helperText={"Write a brief description about you. Press enter to start a new line."}
                                            />
                                        </Grid>

                                    </Grid>

                                </Box>
                            </XForm>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </Container>
    )
}