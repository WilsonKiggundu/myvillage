import React, {createRef, useEffect, useState} from "react"
import {Chip, Container, Divider} from "@material-ui/core";
import XForm from "../../components/forms/XForm";
import Grid from "@material-ui/core/Grid";
import XTextInput from "../../components/inputs/XTextInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Box from "@material-ui/core/Box";
import * as yup from "yup";
import {reqString} from "../../data/validations";
import {FormikHelpers} from "formik";
import XRichTextArea from "../../components/inputs/XRichTextArea";
import XDragAndDrop from "../../components/XDragAndDrop";
import {Add, Image} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import XCheckBoxInput from "../../components/inputs/XCheckBoxInput";
import {IUpload} from "../../interfaces/IUpload";
import {postFileAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import Toast from "../../utils/Toast";
import {Urls} from "../../routes/Urls";
import {useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import {createArticle, getArticleById, updateArticle} from "./redux/articlesEndpoints";

const schema = yup.object().shape(
    {
        title: reqString,
        details: reqString
    }
)

export default function UpdateArticle({match}: any) {

    const user = useSelector(userSelector)
    const container = createRef<any>()

    const {id} = match.params

    const [initialValues, setInitialValues] = useState<any>({
        id: id,
        title: '',
        details: '',
        publish: true
    })

    useEffect(() => {
        getArticleById(id)
            .then((response: any) => {
                const article = response.body.articles[0]

                setInitialValues({
                    title: article.title,
                    details: article.details,
                    publish: article.status === 2
                })

            })
            .catch((error: any) => Toast.error("Error while fetching article"))
    }, [])

    const [files, setFiles] = useState<any>([])
    const [submitting, setSubmitting] = useState<boolean>(false)

    const handleDragDrop = (files: any) => {
        if (files.length) {
            setFiles(files)
        }
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        setSubmitting(true)

        // upload the files if any is attached
        let uploads: IUpload[] = []
        if (files.length) {
            await Promise.all(files.map(async (file: any) => {
                const {body}: any = await postFileAsync(file)
                const upload: any = {
                    fileName: body.attachment_file_name,
                    path: Endpoints.cdn.base + body.path
                }
                uploads.push(upload)
            }))
        }

        const article = {
            id: values.id,
            authorId: user.profile.sub,
            status: values.publish ? 2 : 1, // 1 = draft, 2 = published
            ...values,
            uploads,
        }

        updateArticle(article)
            .then((response: any) => {
                Toast.success("Article added successfully")
                // console.log(response.body)
                window.location.replace(Urls.blog)
            })
            .catch(error => Toast.error("Error while adding article"));
    }

    return (
        <Container maxWidth={"md"}>
            <Card>
                <CardContent>
                    <XForm
                        schema={schema}
                        initialValues={initialValues}
                        submitButtonLabel={"Publish"}
                        loading={submitting}
                        onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <XTextInput
                                    name={"title"}
                                    multiline
                                    style={{border: 0}}
                                    fontSize={30}
                                    placeholder={"Title..."}
                                    variant={"standard"}/>
                            </Grid>

                            <Grid item xs={12}>

                                {/*<ButtonGroup>*/}
                                {/*    <Button style={{textTransform: 'inherit'}}*/}
                                {/*            onClick={()=>setShowDropzone(!showDropzone)}*/}
                                {/*            variant={"outlined"} size={"small"} color={"default"}>*/}
                                {/*        <Image /> <span style={{marginLeft: 5}}>Upload photo</span>*/}
                                {/*    </Button>*/}
                                {/*</ButtonGroup>*/}

                                <Box mt={4}>
                                    <XDragAndDrop
                                        showPreviews
                                        dropzoneText={"Upload a cover photo for your article. " +
                                        "This will appear on top of your article. Recommended size is 1024 X 960"}
                                        filesLimit={1}
                                        acceptedTypes={['image/*']}
                                        onDragDrop={handleDragDrop}/>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box mt={2}>
                                    <XRichTextArea
                                        name={"details"}
                                        label={"Details"}
                                        placeholder={"Start typing here..."}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box mt={2}>
                                    <XCheckBoxInput name={"publish"} label={"Publish now"}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </XForm>
                </CardContent>
            </Card>
        </Container>
    )
}