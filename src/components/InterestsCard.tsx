import {Box} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import React from "react";
import {globalStyles} from "../theme/styles";
import Typography from "@material-ui/core/Typography";

interface IProps {
    items: any
}

const InterestsCard = (props: IProps) => {

    const classes = globalStyles()

    return (
        <Box mb={2}>
            <Typography style={{padding: '15px 0'}}>Interests</Typography>
            <Card>
                <CardContent>
                    <div className={classes.flexWrap}>
                        {props.items ? props.items.map((i: any) =>
                            <Chip
                                label={i.name}
                                key={i.id}
                                clickable
                                color="secondary"
                                variant="outlined"/>) : ""}
                    </div>

                </CardContent>
            </Card>
        </Box>
    )
}

export default InterestsCard