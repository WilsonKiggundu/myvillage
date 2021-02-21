import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {getInitials, IPerson} from "../modules/profiles/people/IPerson";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import Connections from "../assets/images/connections.png"
import ConnectionsB from "../assets/images/connections-b.png"

import './ContactCard.css'

interface IProps {
    children?: any
    person: IPerson
    isEven?: boolean
}


const ContactCard = (props: IProps) => {

    const {firstname, lastname, avatar, coverPhoto, connectionsCount } = props.person
    const isEven = props.isEven


    return (
        <Card className ={isEven ? '' : 'bg'}>

            {
                coverPhoto ?
                    <CardMedia style={{height: 150}} image={coverPhoto}/> :
                    <Box style={{height: 150, backgroundColor: grey[300]}}/>
            }

            <CardContent style={{ marginTop: -110}}>

                <Avatar src={avatar} className ={'avatar'}>
                    {getInitials(firstname, lastname)}
                </Avatar>

                <Typography noWrap component="div" className ={isEven ? 'name' : 'name-b'}>
                    <strong>{firstname} {lastname}</strong> <span className ={'role'}>Student</span>
                    <section>
                        <p>{isEven ? <img src={Connections} alt=''></img>: 
                        <img src={ConnectionsB} alt=''></img>}
                        <span >&nbsp;{connectionsCount}&nbsp;</span> <span>Connections</span></p>
                    </section>
                </Typography>
    
                {props.children}

            </CardContent>
        </Card>
    )
}

export default ContactCard