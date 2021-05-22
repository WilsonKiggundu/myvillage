import React, {useEffect, useState} from "react"
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
import XDateInput from "../../components/inputs/XDateInput";
import * as yup from "yup";
import {reqArray, reqString} from "../../data/validations";
import {getAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import Toast from "../../utils/Toast";
import palette from "../../theme/palette";
import {useDispatch, useSelector} from "react-redux";
import {globalStyles} from "../../theme/styles";
import {white} from "../../theme/custom-colors";
import './CreateProfile.css'
import {ReactComponent as MyVillageLogo} from "../../assets/images/mv-colored-logo.svg"
import XSelectInputCreatable from "../../components/inputs/XSelectInputCreatable";
import XRichTextArea from "../../components/inputs/XRichTextArea";
import {putPersonCategories} from "./people/redux/peopleEndpoints";

interface IProps {
    history: any
}

const schema = yup.object().shape(
    {
        firstName: reqString,
        lastName: reqString,
        dateOfBirth: reqString,
        gender: reqString,
        bio: reqString,
        categories: reqArray
    }
)


export const CreateProfile = (props: IProps) => {

    const dispatch = useDispatch()
    const classes = globalStyles()
    const {user} = useSelector((state: any) => state.oidc)

    const [categories, setCategories] = useState<any>([])

    useEffect(() => {

        (async () => {
            const lookupUrl = makeUrl("Profiles", Endpoints.lookup.category)
            const response: any = await getAsync(lookupUrl, {});

            if (response.status === 200) {
                const categories = response.body.map((m: any) => ({id: m.id, name: m.name}))
                setCategories(categories)
            }

        })();

    })

    const initialValues = {
        email: user.profile.email,
        categories: [],
        firstName: user.profile.given_name,
        lastName: user.profile.family_name,
        bio: '',
        dateOfBirth: ''
    }

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (values: any) => {
        setLoading(true)
        const {categories} = values
        const personId = user.profile.sub

        const url = makeUrl("Profiles", Endpoints.person.base)

        try {
            await postAsync(url, {
                userId: personId,
                dateOfBirth: values.dateOfBirth,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                bio: values.bio
            })

            await putPersonCategories({categories, personId})
            window.location.replace(Urls.profiles.onePerson(personId))

        } catch (e) {
            Toast.error("Unable to create profile." + e)
        }
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
                <Grid container
                      justify={"center"}>
                    <Grid item lg={5}>
                        <Box className='box'
                             style={{backgroundColor: palette.tertiary.light, color: white, height: '100%'}} p={3}>
                            <Grid container spacing={4}>
                                <Grid item>
                                    <MyVillageLogo style={{height: 60, width: 'auto'}}/>
                                </Grid>
                                <Grid item>
                                    <Box mb={1}>
                                        <Typography className={classes.largestText} variant={'h3'}>
                                            Start creating your profile
                                        </Typography>
                                        <Typography style={{marginTop: 15}} variant={"subtitle2"}>
                                            A profile helps you get noticed as well as get
                                            notified about things that you are interested in.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={5}>
                        <Card className={classes.tile} style={{height: '100%'}}>
                            <CardContent>
                                <XForm
                                    debug={false}
                                    schema={schema}
                                    initialValues={initialValues}
                                    submitButtonLabel={"Save and continue"}
                                    loading={loading}
                                    onSubmit={handleSubmit}
                                >

                                    <Grid container spacing={2}>
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

                                        <Grid item xs={12}>
                                            <XDateInput
                                                disableFuture
                                                label={"Date of birth"}
                                                name={"dateOfBirth"}
                                                variant={'outlined'}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <XSelectInputCreatable
                                                variant={"outlined"}
                                                name={"categories"}
                                                allowAddNew={true}
                                                multiple={true}
                                                label={"Category"}
                                                helperText={"You can select as many options as apply to you."}
                                                options={categories}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <XRichTextArea
                                                name={"bio"}
                                                rows={4}
                                                helperText={"Say something about your self"}
                                                variant={'outlined'}
                                                label={"Say something about your self"}
                                            />
                                        </Grid>
                                    </Grid>

                                </XForm>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
                {/*<Hidden only={['sm', 'md', 'xs']}>*/}
                {/*    <Grid lg={12} className={classes.bottomDesign}>*/}
                {/*    </Grid>*/}
                {/*</Hidden>*/}
                {/*<Hidden only={['sm', 'md', 'xs']}>*/}
                {/*    <Grid lg={3} className={classes.leftBottomDesign}>*/}
                {/*    </Grid>*/}
                {/*</Hidden>*/}
                {/*<Hidden only={['sm', 'md', 'xs']}>*/}
                {/*    <Grid lg={3} className={classes.rightBottomDesign}>*/}
                {/*    </Grid>*/}
                {/*</Hidden>*/}
            </Grid>
        </Container>
    )
}