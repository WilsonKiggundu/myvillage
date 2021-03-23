import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import {getInitials, IPerson} from "../modules/profiles/people/IPerson";

import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'

import './ContactCard.css'

interface IProps {
    children?: any
    person: IPerson
    isEven?: boolean
}


const ContactCard = (props: IProps, scrollPosition: any) => {

    const {firstname, lastname, avatar, categories, coverPhoto, connectionsCount } = props.person

    return (
        <Card>
            <div className="cover-photo">
                <Avatar src={avatar} className ={'avatar'}>
                    {getInitials(firstname, lastname)}
                </Avatar>
                <LazyLoadImage
                    width={"100%"}
                    className="cover-photo-image"
                    src={coverPhoto}
                    effect={'blur'}
                />
            </div>
            <CardContent>
                <section className="profile-details">
                    <section className="profile-name">{firstname} {lastname}</section>
                    <section className="profile-category">{categories.join(', ')}</section>
                    <section className="profile-connections">
                        {connectionsCount} Connections
                    </section>
                </section>
    
                {props.children}

            </CardContent>
        </Card>
    )
}

export default ContactCard