import Typography from "@material-ui/core/Typography";
import React from "react";
import {globalStyles} from "../../theme/styles";
import Container from "@material-ui/core/Container";
import ErrorIcon from '@material-ui/icons/Error';
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import {errorColor} from "../../theme/custom-colors";
import userManager from "../../utils/userManager";
import {useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";

interface IProps {
    title: string
    message: string
}

const ErrorPage = ({title, message}: IProps) => {

    const classes = globalStyles()
    const user = useSelector(userSelector)

    // const isLoggedOut = message === "Cannot read property 'profile' of null"
    const isLoggedOut = !user

    const errorMessage = isLoggedOut ?
        "You are not logged in." : message

    return (
        <Container maxWidth={"md"}>
            <Card>
                <CardHeader
                    style={{color: errorColor}}
                    avatar={
                        <ErrorIcon fontSize={"large"} color={"error"}/>
                    }
                    title={
                        <Typography variant={"h6"}>{title}</Typography>
                    }
                />
                <Divider/>
                <CardContent>
                    <Box mb={4}>
                        <Typography className={classes.whiteSpace} variant={"body2"} component={"div"}>
                            {errorMessage}
                        </Typography>
                    </Box>
                    <Typography variant={"body2"} component={"div"}>
                        {isLoggedOut ?
                            <Button style={{textTransform: 'inherit'}}
                                    variant={"outlined"}
                                    onClick={() => userManager.signinRedirect()}
                                    color={"default"}>Login</Button> :
                            <Button style={{textTransform: 'inherit'}}
                                    variant={"outlined"}
                                    onClick={() => window.location.reload()}
                                    color={"default"}>Refresh</Button>
                        }
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    )
}

export default ErrorPage