import {Box, Card, CardContent, CardHeader, Divider} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import XRichTextArea from "../../../components/inputs/XRichTextArea";

interface IProps {
    categories?: any[]
    formField: any
}

const JobDescription = ({categories, formField}: IProps) => {
    const user = useSelector(userSelector)

    return (
        <Box mb={2}>
            <Card>
                <CardHeader title={"Job description"} subheader={"What will the candidate be doing on a daily basis?"}/>
                <Divider />
                <CardContent>
                    <XRichTextArea
                        rows={8}
                        rowsMax={12}
                        helperText={"Briefly describe the job so that candidates know what to expect.."}
                        label={"Job description"}
                        name={"details"}/>
                </CardContent>
            </Card>
        </Box>
    )
}

export default JobDescription