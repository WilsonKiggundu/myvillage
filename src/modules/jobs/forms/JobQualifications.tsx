import {Box, Card, CardContent, CardHeader} from "@material-ui/core";
import React from "react";
import XRichTextArea from "../../../components/inputs/XRichTextArea";

interface IProps {
    formField: any
}

const JobQualifications = ({formField}: IProps) => {

    return (
        <Box mb={2}>
            <Card>
                <CardHeader title={"Qualifications"}
                            subheader={"What are the minimum qualifications that potential candidates should possess?"}/>
                <CardContent>
                    <XRichTextArea
                        rows={8}
                        rowsMax={12}
                        helperText={""}
                        label={"Qualifications"}
                        name={"qualifications"}/>
                </CardContent>
            </Card>
        </Box>
    )
}

export default JobQualifications