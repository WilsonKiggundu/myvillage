import XForm from "../../../components/forms/XForm";
import {FormikHelpers} from "formik";
import React, {ChangeEvent, FormEvent, useState} from "react";
import * as yup from "yup"
import {reqObject, reqString} from "../../../data/validations";
import {useSelector} from "react-redux";
import {Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup} from "@material-ui/core";
import {userSelector} from "../../../data/coreSelectors";
import XSelectInputAsync from "../../../components/inputs/XSelectInputAsync";
import {Endpoints} from "../../../services/Endpoints";
import {getAsync, makeUrl, postAsync} from "../../../utils/ajax";
import {PleaseWait} from "../../../components/PleaseWait";
import {Alert} from "@material-ui/lab";
import XTextInput from "../../../components/inputs/XTextInput";
import Toast from "../../../utils/Toast";
import ProfileRating from "../../../components/ProfileRating";

interface IProps {
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        business: reqObject,
        person_name: reqString,
        contact_email: reqString,
        contact_telephone: reqString
    }
)


const TakeAssessment = ({onClose}: IProps) => {
    const user = useSelector(userSelector)

    const [answer, setAnswer] = useState<string>('')
    const [error, setError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');

    const [showFinalScore, setShowFinalScore] = useState<boolean>(false)
    const [businessRating, setBusinessRating] = useState<any | undefined>(undefined)
    const [questionIndex, setQuestionIndex] = useState<number>(0)
    const [entrepreneur, setEntrepreneur] = useState<any | undefined>(undefined)
    const [questions, setQuestions] = useState<any[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<any | undefined>(undefined)

    const initialValues = {
        business: {},
        person_name: `${user.profile.given_name} ${user.profile.family_name}`,
        contact_email: user.profile.email,
        contact_telephone: ''
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
        const entrepreneur = {
            entrepreneurId: user.profile.sub,
            entrepreneurName: `${user.profile.given_name} ${user.profile.family_name}`,

            businessId: values.business.id,
            businessName: values.business.name,

            contactPerson: values.person_name,
            contactEmail: values.contact_email,
            contactTelephone: values.contact_telephone
        }

        setEntrepreneur(entrepreneur)

        // create the entrepreneur
        const baseUrl: string = makeUrl("InvestorReadiness", '/api')
        const res = await postAsync(baseUrl + '/entrepreneurs', entrepreneur)

        // get questions
        const response: any = await getAsync(baseUrl + '/questions')
        const questions: [] = response.body.results
        setQuestions(questions)

        setCurrentQuestion(questions[questionIndex])
    }

    const handleBack = () => {
        if (questionIndex === 0) {
            return // close the dialog
        } else {
            setQuestionIndex(questionIndex - 1)
            setCurrentQuestion(questions[questionIndex - 1])
        }
    }

    const handleSubmitResponse = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // submit response
        const response = {
            questionId: currentQuestion.id,
            optionId: answer,
            businessId: entrepreneur.businessId,
            personId: entrepreneur.entrepreneurId
        }

        let baseUrl: string = makeUrl("InvestorReadiness", '/api')

        postAsync(baseUrl + '/responses', response)
            .then(() => {
                if (questionIndex === questions.length - 1) {
                    // computer the final rating
                    getAsync(baseUrl + '/responses/rating', {
                        businessId: response.businessId
                    }).then((rating: any) => {
                        // if (onClose) onClose()
                        setBusinessRating(rating.body)
                        console.log(rating)
                        setShowFinalScore(true)
                    }).catch(() => {
                        Toast.error("Unable to submit your response")
                    })
                } else {
                    setQuestionIndex(questionIndex + 1)
                    setCurrentQuestion(questions[questionIndex + 1])
                }
            })
            .catch(() => {
                Toast.error("Unable to submit your response")
            })
    }

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
        setHelperText(' ');
        setError(false);
    }

    if (entrepreneur) {
        return (
            <Box mt={1} ml={1} mr={1}>
                <form onSubmit={handleSubmitResponse}>
                    {currentQuestion ? <>

                        {businessRating  ?
                            <Box mb={2}>
                                <Alert variant={"standard"} color={"info"} icon={false}>
                                    <h6><strong>Rating</strong></h6>
                                    <ProfileRating readonly={true} size={"large"} rating={businessRating.tier}/>
                                </Alert>
                            </Box>
                            :
                            <>
                                <Alert icon={false} variant={"standard"}
                                       color={currentQuestion.category ? "success" : "error"}>
                                    <Box mt={2} mb={2}>
                                        <h5><strong>{currentQuestion.text}</strong></h5>
                                        <span>{currentQuestion.description}</span>
                                    </Box>

                                    <Box mt={2} mb={2}>
                                        <FormControl
                                            error={error}
                                            variant={"standard"}
                                            component="fieldset">
                                            <RadioGroup
                                                onChange={handleRadioChange}
                                                value={answer}
                                                row
                                                aria-label="gender"
                                                name="row-radio-buttons-group">
                                                {currentQuestion.options.map((option: any, index: number) => {
                                                    return (
                                                        <div key={index}>
                                                            <FormControlLabel
                                                                value={option.id}
                                                                control={<Radio/>}
                                                                label={option.label}/>
                                                        </div>
                                                    )
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Alert>

                                <Box mt={2} mb={2}>
                                    <Grid container justify={"space-between"}>
                                        <Grid item>
                                            <Button disabled variant={"text"}>
                                                Question {questionIndex + 1} of {questions.length}
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button disabled={questionIndex === 0}
                                                    onClick={handleBack}
                                                    className="mr-2"
                                                    variant={"outlined"}
                                                    color={"primary"}>
                                                &larr; Back
                                            </Button>
                                            <Button type={"submit"}
                                                    disableElevation
                                                    disabled={!answer}
                                                    variant={"contained"}
                                                    color={"secondary"}>
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                        }

                    </> : <PleaseWait/>}
                </form>
            </Box>
        )
    } else {
        return (
            <XForm
                schema={schema}
                debug={false}
                initialValues={initialValues}
                submitButtonLabel={"Continue"}
                onSubmit={handleSubmit}>
                <Grid spacing={2} container>
                    <Grid item xs={12}>
                        <XSelectInputAsync
                            returnObject
                            data={{
                                field: "startups",
                                params: {
                                    personId: user?.profile.sub
                                },
                                endpoint: makeUrl("Profiles", Endpoints.business.base),
                                label: "name",
                                avatar: undefined
                            }}
                            name="business"
                            label={"Business name"}
                            helperText={"What business do you want to assess?"}
                            variant={"outlined"}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <XTextInput
                            fontSize={16}
                            name={"person_name"}
                            label={"Contact person"}
                            variant={"outlined"}
                            placeholder={"Contact Person"}/>
                    </Grid>

                    <Grid item xs={12}>
                        <XTextInput
                            fontSize={16}
                            name={"contact_email"}
                            label={"Email address"}
                            variant={"outlined"}
                            placeholder={"Email address"}/>
                    </Grid>

                    <Grid item xs={12}>
                        <XTextInput
                            fontSize={16}
                            name={"contact_telephone"}
                            label={"Contact telephone"}
                            variant={"outlined"}
                            placeholder={"Contact telephone"}/>
                    </Grid>

                </Grid>

            </XForm>
        )
    }


}

export default TakeAssessment
