import {Box, Card, CardContent, CardHeader, Divider} from "@material-ui/core";
import React from "react";
import XRichTextArea from "../../../components/inputs/XRichTextArea";

interface IProps {
    formField: any
}

const JobSkills = ({formField}: IProps) => {

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    title={"Required skills"}
                    subheader={"What skills are you looking for from the potential candidates?"}
                />
                <Divider />
                <CardContent>
                    <XRichTextArea
                        rows={8}
                        rowsMax={12}
                        helperText={""}
                        label={"Skills"}
                        name={"skills"}/>
                </CardContent>
            </Card>
        </Box>
    )
}

export default JobSkills