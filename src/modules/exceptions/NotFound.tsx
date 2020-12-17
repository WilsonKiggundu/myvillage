import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from '@material-ui/icons/Error';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {Urls} from "../../routes/Urls";

const NotFound = () => {
    return (
        <Container maxWidth={"sm"}>
            <Card>
                <CardContent style={{textAlign: 'center'}}>
                    <ErrorIcon fontSize={"large"}/>
                    <Box mt={3} mb={3}>
                        <Typography variant={"h5"}>404 Page not found</Typography>
                    </Box>
                    <Box mb={3}>
                        <Typography>Oooops! We were unable to find this page.</Typography>
                    </Box>

                    <Button variant={"text"} href={Urls.feed}>Go back home</Button>
                </CardContent>
            </Card>
        </Container>
    )
}

export default NotFound