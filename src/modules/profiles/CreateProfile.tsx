import React, {ChangeEvent, useState} from "react"
import {Card} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {globalStyles} from "../../theme/styles";
import Button from "@material-ui/core/Button";
import {Urls} from "../../routes/Urls";
import { Form, Formik} from "formik";
import LinearProgress from "@material-ui/core/LinearProgress";
import {IProfileCategory} from "../../interfaces/IProfileCategory";
import faker from 'faker'
import XSelectMultipleDropdown from "../../components/inputs/XSelectMultipleDropdown";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import CustomDatePicker from "../../components/CustomDatePicker";
import Grid from "@material-ui/core/Grid";
import {Interests} from "../../data/mockData";
import Checkbox from "@material-ui/core/Checkbox";
import CardActionArea from "@material-ui/core/CardActionArea";
import {RedirectToUrl} from "../../routes/RedirectToUrl";
import AuthService from "../../services/AuthService";
import { Redirect } from "react-router-dom";
import {combineReducers} from "redux";

interface IProfile {
    category: string
    dateOfBirth?: string
}

interface IProps{
    history: any
}

export const CreateProfile = (props: IProps) => {

    const classes = globalStyles()
    const authService = new AuthService()
    const interests = Interests.slice(0, 12)
    const categories: IProfileCategory[] = [
        {
            label: "Investor",
            value: faker.random.uuid()
        },
        {
            label: "Student",
            value: faker.random.uuid()
        },
        {
            label: "Entrepreneur",
            value: faker.random.uuid()
        }
    ]

    const [gender, setGender] = useState();
    const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value)
    }

    const handleInterestClick = (event: any) => {
        console.log(event.target)
    }

    const handleSubmit = async (values: any) => {
        const {history} = props
        const user = await authService.getUser()
        history.push(Urls.profiles.onePerson(user.profile.sub))
    }

    const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms))

    return (
        <Container maxWidth={"md"}>
            <Card>
                <CardContent>
                    <Box mt={3} mb={3} mx={3}>
                        <Typography variant={"h5"}>Start creating your profile.</Typography>
                        <Typography variant={"body2"}>A profile helps you get noticed as well as get
                            notified about things that you are interested in.</Typography>
                    </Box>

                    <Box mt={3} mb={3} mx={3}>
                        <Avatar variant={"circle"} className={classes.mediumAvatar}>WK</Avatar>
                    </Box>

                    <Box mt={3} mb={3} mx={3}>
                        <Formik
                            initialValues={{category: '', dateOfBirth: ''}}
                            // validate={values => {
                            //     const errors: Partial<IProfile> = {}
                            //     if (!values.category) {
                            //         errors.category = 'Required'
                            //     }
                            //
                            //     return errors
                            // }}
                            onSubmit={async (values, {setSubmitting}) => {
                                await handleSubmit(values)
                            }}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <XSelectMultipleDropdown
                                        placeholder={"What of these best describes you?"}
                                        helperText={"Select all that apply to you"}
                                        options={categories}
                                    />

                                    <Box mt={4} mb={2}>
                                        <FormLabel component={"legend"}>What is your gender?</FormLabel>

                                        <FormControlLabel
                                            label={"Male"}
                                            labelPlacement={"end"}
                                            value="male"
                                            name="rb-gender"
                                            control={
                                                <Radio
                                                    checked={gender === 'male'}
                                                    color={"secondary"}
                                                    onChange={handleGenderChange}
                                                    inputProps={{'aria-label': 'male'}}
                                                />
                                            }
                                        />

                                        <FormControlLabel
                                            label={"Female"}
                                            labelPlacement={"end"}
                                            value="female"
                                            name="rb-gender"
                                            control={
                                                <Radio
                                                    checked={gender === 'female'}
                                                    color={"secondary"}
                                                    onChange={handleGenderChange}
                                                    inputProps={{'aria-label': 'female'}}
                                                />
                                            }
                                        />

                                        <FormHelperText>Your gender will help us give you the most relevant content.
                                            It's optional.</FormHelperText>
                                    </Box>

                                    <Box mt={4} mb={2}>
                                        <CustomDatePicker
                                            defaultValue={"01-01-2000"}
                                            label={"Do you remember when you were born?"}
                                            helperText={"Knowing your age will help us give you age appropriate content."}
                                        />
                                    </Box>

                                    <Box mt={4} mb={2}>
                                        <FormLabel>What are you interested in?</FormLabel>
                                        <FormHelperText>Select as many as you can</FormHelperText>
                                        <Grid style={{marginTop: 5}} container spacing={3}>
                                            {interests ? interests.map((item, index) => (
                                                <Grid key={item.id} item xs={6} sm={3}>
                                                    <Card>
                                                        <CardActionArea>
                                                            <CardContent style={{padding: '5px 15px'}}>
                                                                <FormControlLabel
                                                                    style={{display: "block"}}
                                                                    control={
                                                                        <Checkbox
                                                                            // checked={state.checkedB}
                                                                            // onChange={handleChange}
                                                                            name="checkedB"
                                                                            color="secondary"
                                                                        />
                                                                    }
                                                                    label={item.name}
                                                                    labelPlacement={"end"}
                                                                />
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </Grid>
                                            )) : ""}
                                        </Grid>
                                    </Box>

                                    <Box mt={5}>
                                        {isSubmitting && <LinearProgress
                                            variant={"indeterminate"}
                                            color={"secondary"}
                                            style={{marginBottom: 15}}/>}

                                        <Grid container justify={"flex-start"}>
                                            <Button disabled={isSubmitting}
                                                    type={"submit"}
                                                    className={classes.flat}
                                                    color={"secondary"}
                                                    variant={"contained"}>
                                                <strong>Create profile</strong>
                                            </Button>
                                            <Button href={Urls.feed}
                                                    style={{marginLeft: 15}}
                                                    variant={"outlined"}>Skip, I will do this
                                                later</Button>
                                        </Grid>
                                    </Box>

                                </Form>
                            )}
                        </Formik>
                    </Box>


                </CardContent>
            </Card>
        </Container>
    )
}