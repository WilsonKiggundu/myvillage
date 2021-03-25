import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {IStartup} from "../../../interfaces/IStartup";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";


interface IProps {
    startup: IStartup
}

export function StartupBioCard({startup}: IProps) {

    const user = useSelector(userSelector)
    const canEdit = startup.roles?.some((role: any) => role.personId === user?.profile.sub) ?? false

    return <Box mb={2}>
        <Card>
            <CardContent>
                <Box mb={2} mt={2}>
                    <Typography variant={"h4"}>
                        <strong>About</strong>
                    </Typography>

                    <Box mb={2}>
                        <Typography style={{whiteSpace: "pre-line", marginTop: 15}} variant="body2">
                            {startup.description}
                        </Typography>
                    </Box>

                    <Box mb={2}>
                        <Typography variant={"body2"}>
                            <strong>Incorporation Date</strong>
                        </Typography>
                        {startup.incorporationDate}
                    </Box>

                    <Box mb={2}>
                        <Typography variant={"body2"}>
                            <strong>Number of Employees</strong>
                        </Typography>
                        {startup.employeeCount}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </Box>;
}