import React from "react";
import {Avatar, AvatarProps} from "@material-ui/core";
import {IPerson} from "../modules/profiles/people/IPerson";

interface IProps {
    person?: IPerson
}

const XAvatar = (props: IProps & AvatarProps) => {
    const {person, ...rest} = props

    console.log(props)

    return <Avatar
        {...rest}
        alt={`${person?.firstname} ${person?.lastname}`}
        src={person?.avatar}>
        {person?.firstname[0].toUpperCase()}
        {person?.lastname[0].toUpperCase()}
    </Avatar>
}

export default XAvatar;
