import {Box, Card, CardContent, CardHeader} from "@material-ui/core";
import React from "react";
import XRichTextArea from "../../../components/inputs/XRichTextArea";
import XTextInput from "../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";

interface IProps {
    formField: any
}

const JobExperience = ({formField}: IProps) => {

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    title={"Prerequisite experience"}
                    subheader={"Specify the minimum years of experience you want the candidates to have?"}
                />
                <CardContent>
                    <XTextAreaInput
                        rows={1}
                        rowsMax={5}
                        multiline
                        variant={"outlined"}
                        helperText={""}
                        placeholder={"Experience"}
                        name={"experience"}/>
                </CardContent>
            </Card>
        </Box>
    )
}

export default JobExperience