import React from "react";
import {Card, Grid} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {Urls} from "../../../routes/Urls";
import {globalStyles} from "../../../theme/styles";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router-dom";

import './css/StartupCard.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {IStartup} from "../../../interfaces/IStartup";
import Chip from "@material-ui/core/Chip";

interface IProps {
    startup: IStartup
}

const StartupCard = ({startup}: IProps) => {

    const styles = globalStyles()
    const history = useHistory()

    let div = document.createElement("div")
    div.innerHTML = startup.description

    const startupDescription = div.textContent || div.innerText || ""

    const initials: string[] = []
    const nameArray = startup.name.split(' ')

    nameArray.forEach(part => {
        initials.push(part[0].toUpperCase())
    })

    const handleClick = (id: string) => {
        const route = Urls.profiles.singleStartup(id)
        history.push(route)
    }

    return (
        <Card>
            <CardContent>
                <Grid justify={"center"} container>
                    <Grid item xs={12}>
                        <div className="startup-logo-holder">
                            {startup.avatar ?
                                <LazyLoadImage
                                    src={startup.avatar}
                                    effect={"blur"}
                                    alt={startup.name}
                                /> : <div className="startup-initials">
                                    {initials.join('')}
                                </div>
                            }
                        </div>
                    </Grid>
                </Grid>

                <Grid spacing={2} justify={"center"} container>
                    <Grid item xs={12}>
                        <div className="startup-name">
                            {startup.name}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="startup-category">
                            {
                                startup.category.split(',')
                                    .map((c: string, index: number) => <Chip
                                        size={"small"}
                                        key={index}
                                        color={"secondary"}
                                        variant={"outlined"}
                                        label={c}/>)
                            }
                        </div>
                    </Grid>
                </Grid>

                <div className="startup-description-truncated">
                    {startupDescription}
                </div>

                <Box mt={2}>
                    <Grid container justify={"space-between"}>
                        {startup.incorporationDate ? <Grid item>
                            <div className="startup-inc-date">
                                {startup.incorporationDate}
                            </div>
                        </Grid> : ""}
                        {startup.employeeCount ? <Grid item>
                            <div className="startup-inc-date">
                                {startup.employeeCount} employees
                            </div>
                        </Grid> : ""}
                    </Grid>
                </Box>

                <Box mx={"auto"} mt={2}>
                    <a href={Urls.profiles.singleStartup(startup.id)}
                       className="startup-view-profile">
                        <strong>View profile</strong>
                    </a>
                </Box>
            </CardContent>
        </Card>
    )
}

export default StartupCard