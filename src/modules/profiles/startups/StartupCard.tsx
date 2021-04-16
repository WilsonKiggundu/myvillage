import React from "react";
import {Button, Card, Grid} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {Urls} from "../../../routes/Urls";
import {useHistory} from "react-router-dom";

import './css/StartupCard.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {IStartup} from "../../../interfaces/IStartup";
import {ChevronRight} from "@material-ui/icons";
import XImageGridList from "../../../components/grid-list/XImageGridList";
import XImageLoader from "../../../components/XImageLoader";

// import avatar from "../../../assets/images/MoTIV-logo-icon.png"

interface IProps {
    startup: IStartup
    index: number
}

const StartupCard = ({startup, index}: IProps) => {

    const history = useHistory()

    let div = document.createElement("div")
    div.innerHTML = startup.description

    const startupDescription = div.textContent || div.innerText || ""

    const handleClick = (id: string) => {
        const route = Urls.profiles.singleStartup(id)
        history.push(route)
    }

    const bgColors = ['#636569', '#ff9015', '#62cbc9']
    const color = bgColors[Math.floor(Math.random() * bgColors.length)];
    const name = startup.name.replace(/^\s+|\s+$/gm,'');

    return (
        <Card onClick={() => handleClick(startup.id)} elevation={0} className="clickable">
            <CardContent>
                <Grid justify={"flex-start"} spacing={2} container>
                    <Grid item xs={3}>
                        <div className="startup-logo-holder">
                            {startup.avatar ?
                                <XImageLoader
                                    src={startup.avatar}
                                    effect={"opacity"}
                                    alt={startup.name}
                                /> : <div style={{backgroundColor: color}} className="startup-initials">
                                    {name[0].toUpperCase()}
                                </div>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="startup-name">
                            {name.toLowerCase()}
                        </div>
                        <div className="startup-category">
                            {
                                startup.category.split(',')
                                    .map((category: string, index: number) => (
                                        <span key={index}>{category}</span>
                                    ))
                            }
                        </div>
                        <div className="startup-description-truncated">
                            {startupDescription}
                        </div>

                        <Button variant={"outlined"} style={{textTransform: "inherit", float: 'right'}}
                                size={"small"} color={"default"}
                                onClick={() => handleClick(startup.id)}>View Profile <ChevronRight /></Button>
                    </Grid>
                </Grid>

                {/*<Grid spacing={2} justify={"center"} container>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <div className="startup-name">*/}
                {/*            {startup.name}*/}
                {/*        </div>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <div className="startup-category">*/}
                {/*            {*/}
                {/*                startup.category.split(',')*/}
                {/*                    .map((c: string, index: number) => <Chip*/}
                {/*                        size={"small"}*/}
                {/*                        key={index}*/}
                {/*                        color={"secondary"}*/}
                {/*                        variant={"outlined"}*/}
                {/*                        label={c}/>)*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                {/*<div className="startup-description-truncated">*/}
                {/*    {startupDescription}*/}
                {/*</div>*/}

                {/*<Box mt={2}>*/}
                {/*    <Grid container justify={"space-between"}>*/}
                {/*        {startup.incorporationDate ? <Grid item>*/}
                {/*            <div className="startup-inc-date">*/}
                {/*                {startup.incorporationDate}*/}
                {/*            </div>*/}
                {/*        </Grid> : ""}*/}
                {/*        {startup.employeeCount ? <Grid item>*/}
                {/*            <div className="startup-inc-date">*/}
                {/*                {startup.employeeCount} employees*/}
                {/*            </div>*/}
                {/*        </Grid> : ""}*/}
                {/*    </Grid>*/}
                {/*</Box>*/}

                {/*<Box mx={"auto"} mt={2}>*/}
                {/*    <a href={Urls.profiles.singleStartup(startup.id)}*/}
                {/*       className="startup-view-profile">*/}
                {/*        <strong>View profile</strong>*/}
                {/*    </a>*/}
                {/*</Box>*/}
            </CardContent>
        </Card>
    )
}

export default StartupCard