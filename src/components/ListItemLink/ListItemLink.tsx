import {ListItemProps, withStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import palette from "../../theme/palette";
import MuiListItem from "@material-ui/core/ListItem";
import {useHistory, useLocation} from "react-router-dom";
import './ListItemLink.css'

interface IProps {
    handleClick: () => void
    children?: any,
    slag?: string
}

const ListItemLink = ({handleClick, slag, ...props}: IProps) => {

    const [activeMenu, setActiveMenu] = useState<string>('')

    const location = useLocation()

    useEffect(() => {
        const locationArray = location.pathname.split('/')
        if (locationArray.includes('feed')) setActiveMenu('feed')
        if (locationArray.includes('startups')) setActiveMenu('startups')
        if (locationArray.includes('people')) setActiveMenu('community')
        if (locationArray.includes('events')) setActiveMenu('events')
        if (locationArray.includes('jobs')) setActiveMenu('jobs')
        if (locationArray.includes('freelancers')) setActiveMenu('freelancers')
        if (locationArray.includes('developers')) setActiveMenu('developers')
    })

    return (
        <>
            <div  className={"ListItemLink-root " + (activeMenu === slag ? 'active' : '')}>
                <MuiListItem className="ListItemLink-item" onClick={handleClick} button {...props} />
            </div>
        </>


    )
}

export default ListItemLink