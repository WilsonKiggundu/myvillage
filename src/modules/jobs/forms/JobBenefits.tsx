import {Box, Card, CardContent, CardHeader} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import XRichTextArea from "../../../components/inputs/XRichTextArea";

interface IProps {
    formField: any
}

const JobBenefits = ({formField}: IProps) => {
    const user = useSelector(userSelector)

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    title={"Benefits"}
                    subheader={"What benefits come with the role? This makes it easier for potential candidates to apply."}/>
                <CardContent>
                    <XRichTextArea
                        rows={8}
                        rowsMax={12}
                        helperText={""}
                        label={"Benefits"}
                        name={"benefits"}/>
                </CardContent>
            </Card>
        </Box>
    )
}

export default JobBenefits