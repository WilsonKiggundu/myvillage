import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import {getInitials, IPerson} from "../modules/profiles/people/IPerson";

import './ContactCard.css'

interface IProps {
    children?: any
    person: IPerson
    isEven?: boolean
    category?: string
}


const ContactCard = (props: IProps, scrollPosition: any) => {

    const {
        firstname,
        lastname,
        avatar,
        categories,
        coverPhoto,
        freelanceTerms,
        connectionsCount
    } = props.person

    const getRateTypeLabel = (type: number) => {
        switch (type) {
            case 1:
                return 'hour'
            case 2:
                return 'day'
            case 3:
                return 'week'
            case 4:
                return 'month'
            case 5:
                return 'quarter'
            case 6:
                return 'year'
            default:
                return type
        }
    }

    return (
        <Card>
            <div className="cover-photo">
                <Avatar src={avatar} className={'avatar'}>
                    {getInitials(firstname, lastname)}
                </Avatar>
                {/*<LazyLoadImage*/}
                {/*    width={"100%"}*/}
                {/*    className="cover-photo-image"*/}
                {/*    src={coverPhoto}*/}
                {/*    effect={'blur'}*/}
                {/*/>*/}
            </div>
            <CardContent>
                <section className="profile-details">
                    <section className="profile-name">{firstname} {lastname}</section>
                    <section className="profile-category profile-category-teaser">
                        {categories.map((c: any) => c.category?.name).join(', ')}
                    </section>

                    {props.category === "freelancers" ?

                        <section className="profile-connections">
                            {
                                freelanceTerms && <span>
                                    {freelanceTerms.currency} {freelanceTerms.rate} per {getRateTypeLabel(freelanceTerms.rateType)}
                                </span>
                            }
                        </section> :
                        <section className="profile-connections">
                            {connectionsCount} Connections
                        </section>
                    }

                </section>

                {props.children}

            </CardContent>
        </Card>
    )
}

export default ContactCard