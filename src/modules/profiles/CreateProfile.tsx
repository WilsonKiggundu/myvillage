import React, {useState} from "react"
import {Card} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {Urls} from "../../routes/Urls";
import Grid from "@material-ui/core/Grid";
import XForm from "../../components/forms/XForm";
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
import Hidden from '@material-ui/core/Hidden';

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
        <Container  
        style={{
            overflow: 'auto', 
            height: '100vh', 
            backgroundColor: 
            palette.tertiary.main
            }} maxWidth={false}>

            <Grid 
            justify={"center"} 
            alignItems={'center'} 
            container spacing={2} 
            style={{
                height: '100vh', 
                position: 'relative'
            }}>
                <Grid container lg={11} 
                justify={"center"}
                style={{height: '78vh'}}>
                    <Grid item lg={5}>
                        <Box style={{backgroundColor: palette.tertiary.light, color: white, height:'100%'}} p={3}>
                            <Grid container spacing={4}>
                                <Grid item>
                                    <img alt={"logo"} src={Logo} style={{height: 100, width: 'auto'}}/>
                                </Grid>
                                <Grid item>
                                    <Box mb={3}>
                                        <Typography className={classes.largestText} variant={'h3'}>
                                            Start<br/> creating your <br/> profile
                                        </Typography>
                                        <Typography style={{marginTop: '4em'}} variant={"subtitle2"}>
                                            A profile helps you get noticed as well as get
                                            notified about things that you are interested in.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item lg={5}>
                        <Card className={classes.tile} style={{height: '100%'}}>
                            <CardContent style={{ marginLeft: '20px'}}>
                                <XForm
                                    debug={false}
                                    schema={schema}
                                    initialValues={initialValues}
                                    submitButtonLabel={"Save and continue"}
                                    loading={loading}
                                    onSubmit={handleSubmit}                                    
                                    >

                                    <Box mb={3}>
                                        <Grid container spacing={4} style={{marginLeft: '-20px'}}>
                                            <Grid item lg={12}>
                                                <Typography variant={"h6"}>
                                                {`${user.profile.given_name} ${user.profile.family_name}`}
                                                </Typography>

                                                <Typography variant={"subtitle2"}>
                                                    {user.profile.email}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12} sm={12}>
                                                <XRadioInput
                                                    label={"What is your gender?"}
                                                    name={"gender"}
                                                    options={Options.GENDER}/>
                                            </Grid>

                                            <Grid 
                                                item 
                                                xs={12} 
                                                sm={12} 
                                                lg={12}
                                                style={{
                                                    marginTop: '-30px',
                                                    marginBottom: '-30px',                                              
                                                }}>
                                                <XDateInput
                                                    disableFuture
                                                    label={"Date of birth"}
                                                    name={"dateOfBirth"}
                                                    variant={'outlined'}                                         
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <XTextAreaInput
                                                    name={"bio"}
                                                    rows={4}
                                                    variant={'outlined'}
                                                    style={{
                                                        marginBottom: '-20px'
                                                    }}
                                                    label={"Say something about your self"}
                                                />
                                            </Grid>
                                        </Grid>

                                    </Box>
                                </XForm>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                </Grid>
                <Hidden only={['sm', 'md', 'xs']}>
                    <Grid lg={12} className={classes.bottomDesign}>
                    </Grid>
                </Hidden>
                <Hidden only={['sm', 'md', 'xs']}>
                    <Grid lg={3} className={classes.leftBottomDesign}>
                    </Grid>
                </Hidden>
                <Hidden only={['sm', 'md', 'xs']}>
                    <Grid lg={3} className={classes.rightBottomDesign}>
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    )
}