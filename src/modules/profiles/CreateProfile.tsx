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
import {Form, Formik} from "formik";
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
import {Redirect, useHistory} from "react-router-dom";
import {combineReducers} from "redux";
import {getUser} from "../../services/User";
import XForm from "../../components/forms/XForm";
import {User} from "oidc-client/dist/oidc-client";
import {getInitials} from "../../utils/stringHelpers";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import XDialog from "../../components/dialogs/XDialog";
import XTextInput from "../../components/inputs/XTextInput";
import XRadioInput from "../../components/inputs/XRadioInput";
import {Options} from "../../utils/options";
import XTextAreaInput from "../../components/inputs/XTextAreaInput";
import XDateInput from "../../components/inputs/XDateInput";
import XSelectInput from "../../components/inputs/XSelectInput";
import {IOption} from "../../components/inputs/inputHelpers";
import * as yup from "yup";
import {reqArray, reqString} from "../../data/validations";
import {IProfile} from "../../interfaces/IProfile";
import {makeUrl, post} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import Toast from "../../utils/Toast";

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

    const history = useHistory()
    const classes = globalStyles()
    const user: User = getUser()

    const splitName = user.profile.name?.split(' ') ?? []

    const initialValues = {
        firstName: user.profile.first_name ?? splitName.length > 0 ? splitName[0] : "",
        middleName: user.profile.middle_name ?? splitName.length === 3 ? splitName[2] : "",
        lastName: user.profile.last_name ?? splitName.length === 2 ? splitName[1] : "",
        email: user.profile.email
    }

    const [loading, setLoading] = useState<boolean>(false)
    const [openEditProfilePhotoDialog, setOpenEditProfilePhotoDialog] = useState<boolean>(false)

    const interests = Interests.slice(0, 12).map(m => ({id: m.id, name: m.name}))
    const categories: IOption[] = [
        {
            name: "Investor",
            id: faker.random.uuid()
        },
        {
            name: "Student",
            id: faker.random.uuid()
        },
        {
            name: "Entrepreneur",
            id: faker.random.uuid()
        }
    ]

    const handleSubmit = (values: IProfile) => {
        setLoading(true)

        values.userId = getUser().profile.sub

        const url = makeUrl("Profiles", Endpoints.person.base)
        post(url, values, (response) => {
            if(response){
                history.push(Urls.profiles.onePerson(values.userId))
            }
        }, err => {
            Toast.error("Unable to create your profile. Try again")
        })
    }

    return (
        <Container maxWidth={"md"}>
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
                            <Typography variant={"h5"}>Start creating your profile.</Typography>
                            <Typography variant={"body2"}>A profile helps you get noticed as well as get
                                notified about things that you are interested in.</Typography>
                        </Box>

                        <Box mb={3}>
                            <Box className={classes.profilePhoto}>
                                <Avatar
                                    src={user.profile.picture}
                                    variant={"circle"}
                                    color={"secondary"}
                                    className={classes.largeAvatar}>
                                    {getInitials(user.profile.name)}
                                </Avatar>

                                <Typography style={{position: "relative"}}>
                                    <IconButton
                                        onClick={() => setOpenEditProfilePhotoDialog(true)}
                                        className={classes.avatarPhotoIcon}>
                                        <AddAPhotoIcon fontSize={"large"}/>
                                    </IconButton>

                                    <XDialog title={"Update photo"}
                                             maxWidth={"sm"}
                                             onClose={() => setOpenEditProfilePhotoDialog(false)}
                                             open={openEditProfilePhotoDialog}>

                                    </XDialog>

                                </Typography>
                            </Box>

                            <Box>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={4}>
                                        <XTextInput
                                            name={"firstName"}
                                            helperText={"Ex. John"}
                                            label={"First name"}/>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <XTextInput
                                            name={"middleName"}
                                            helperText={"Ex. Watson"}
                                            label={"Middle name"}/>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <XTextInput
                                            name={"lastName"}
                                            helperText={"Ex. Joe"}
                                            label={"Last name"}/>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <XTextInput
                                            name={"email"}
                                            helperText={"We shall use your email to communicate to you. We don't share it with anyone"}
                                            label={"Email address"}/>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <XDateInput
                                            disableFuture
                                            label={"Do you remember when you were born?"}
                                            name={"dateOfBirth"}
                                            helperText={"Knowing your age will help us give you age appropriate content."}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <XSelectInput
                                            label={"What of these best describes you?"}
                                            name={"categories"}
                                            multiple={true}
                                            helperText={"Select all that apply to you"}
                                            options={categories}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <XRadioInput
                                            label={"What is your gender?"}
                                            name={"gender"}
                                            helperText={"Your gender will help us give you the most relevant content. It's optional."}
                                            options={Options.GENDER} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <XTextAreaInput
                                            name={"bio"}
                                            rows={4}
                                            label={"Say something about your self"}
                                            helperText={"Write a brief description about you. Keep it precise and short"}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <XSelectInput
                                            label={"What are you interested in?"}
                                            name={"interests"}
                                            multiple={true}
                                            helperText={"Select all that apply to you"}
                                            options={interests}
                                        />
                                    </Grid>
                                </Grid>

                            </Box>
                        </Box>
                    </XForm>
                </CardContent>
            </Card>
        </Container>
    )
}