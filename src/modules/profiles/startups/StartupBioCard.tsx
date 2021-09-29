import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {IStartup} from "../../../interfaces/IStartup";
import {Divider, Grid, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

import PeopleIcon from '@material-ui/icons/People';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';

import './css/StartupBioCard.css'
import {IAddress} from "../../../interfaces/IAddress";

interface IProps {
    startup: IStartup
}

export function StartupBioCard({startup}: IProps) {

    const [address, setAddress] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (startup.addresses?.length) {
            const addressArray : string[] = []
            const address : IAddress = startup.addresses[0]
            if (address.city) addressArray.push(address.city)
            if (address.country) addressArray.push(address.country)
            if (address.addressLine) addressArray.push(address.addressLine)
            setAddress(addressArray.join(', '))
        }
    }, [startup])

    return <Box mb={2}>

        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <div className="about-title">
                            About
                        </div>
                        <Box mb={2}>
                            <Typography style={{whiteSpace: "pre-line", marginTop: 15}} variant="body2">
                                {startup.description}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <TodayIcon/>
                                </ListItemIcon>
                                <ListItemText primary={startup.incorporationDate} secondary="Incorporation date"/>
                            </ListItem>

                            <Divider/>
                            <ListItem>
                                <ListItemIcon>
                                    <PeopleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={startup.employeeCount} secondary="Number of employees"/>
                            </ListItem>

                            {address ? <>
                                <Divider/>
                                <ListItem>
                                    <ListItemIcon>
                                        <LocationOnIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={address} secondary="Address"/>
                                </ListItem>
                            </> : ""}

                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </Box>;
}
