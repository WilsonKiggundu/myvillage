import {IUpload} from "../../interfaces/IUpload";
import {Box, Card, CardActionArea, List} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import AttachmentIcon from "@material-ui/icons/Attachment";
import React from "react";

interface IProps {
    uploads?: IUpload[]
}

const handleDownload = (path: string) => {
    window.open(path, '_blank')
}

const EventAttachments = ({uploads}: IProps) => {

    return (
        <>
            {
                uploads?.length ?
                    <Box mt={2} mb={2}>
                        <List>
                            {
                                uploads?.map((upload: any, index: number) => (
                                    <Grid key={index} container spacing={2}>
                                        <Grid item xs={12} lg={4}>
                                            <Card elevation={0} className="event-attachment">
                                                <CardActionArea
                                                    onClick={() => handleDownload(upload.path)}>
                                                    <CardContent>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={2}>
                                                                <AttachmentIcon/>
                                                            </Grid>
                                                            <Grid item xs={10}>
                                                                {upload.name}
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                        </List>
                    </Box> : ""
            }
        </>
    )
}

export default EventAttachments