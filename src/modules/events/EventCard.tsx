import {IEvent} from "../../interfaces/IEvent";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {format} from "date-fns";
import Button from "@material-ui/core/Button";
import React,{useState} from "react";
import {globalStyles} from "../../theme/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import Hidden from '@material-ui/core/Hidden';
import './event-card.css'
import notAttending from '../../utils/notAttending.png'
import maybeAttending from '../../utils/maybeAttending.png'
import attendingIcon from '../../utils/attending.png'
import eventBg from './cardbg.jpg'
import cardBg from './eventbg.jpg'
import Progress from '../../components/progress/Progress'

interface IProps {
    event: IEvent,
    featured?: boolean
}

const EventCard = ({event, featured}: IProps) => {

    const classes = globalStyles()
    const [attending, setAttending]=  useState(6)
    
    const expectedAttendees= 25
    const score= Math.round((attending / expectedAttendees) * 10000) / 100;

    let day= format(Date.parse(event.startDateTime.replace(/ /g, "T")), "eeee")
    let date= format(Date.parse(event.startDateTime.replace(/ /g, "T")), "d MMMM, yyy")
    let startingTime=format(Date.parse(event.startDateTime.replace(/ /g, "T")), "hh:mma")
    let endingTime=format(Date.parse(event.endDateTime.replace(/ /g, "T")), "hh:mma")

    const handleAddAttendee=()=>{
        setAttending(prevAttendees=>prevAttendees+1)
    }
    return (
            <Grid container className='card-wrapper'>
                {featured?(
                    <Grid item lg={7}>
                        <Grid className="event-body">
                            <Grid>
                                <Typography
                                variant={'body2'}>
                                    Featured Event
                                </Typography>
                                <Grid className='date-and-progress'>
                                    <Grid>
                                        <Typography>
                                            <strong>{day}, {date}</strong>
                                        </Typography>
                                    </Grid>
                                    {attending!==0?(
                                        <Progress 
                                        score={70}
                                        style={{
                                            opacity: 2,
                                            width: `${score}%`,
                                            height: '13px',
                                            cardWidth: '100px',
                                        }}
                                        >
                                            <strong><span style={{color: '#D0D3D4'}}>{attending}</span>/{expectedAttendees}</strong>
                                    </Progress>
                                    ):(
                                        <Grid>
                                        </Grid>
                                    )
                                    }
                                </Grid>

                            </Grid>
                            <Grid>
                                <Typography variant={"h5"}>
                                    <strong>{event.title}</strong>
                                </Typography>
                                <Typography variant={'body1'} className='event-details'>
                                    {event.details}
                                </Typography>
                                <Typography variant={'body1'} className='title-font'>
                                    <strong>Venue:</strong> {event.location} | <strong>{startingTime}-{endingTime}</strong>
                                </Typography>
                            </Grid>                   
                        </Grid>
                        {true?(
                                <Grid className='event-bg-wrapper'>
                                    <img alt='eventbg' className='event-bg' src={eventBg}/>
                                </Grid>
                            ):(
                                <Grid>
                                </Grid>
                            )}
                        <Grid className='rsvp-buttons'>
                            <Grid>
                                <Button>
                                    <img alt='Maybe' src={maybeAttending}/><br/>
                                </Button><br/>
                                May be    
                            </Grid>
                            <Grid>
                                <Button>
                                    <img alt='Not Attending' src={notAttending}/><br/>
                                </Button><br/>
                                Not Attending
                            </Grid>
                            <Grid>
                                <Button
                                    onClick={handleAddAttendee}
                                >
                                    <img alt='Attending' src={attendingIcon}/><br/>
                                </Button><br/>                                
                                Attending
                            </Grid>
                        </Grid>
                    </Grid>
                ):(
                    <Grid container lg={7}>
                        <Hidden only={['md', 'sm', 'xs']}>
                            <Grid item lg={4}>
                                {true?(
                                        <Grid className='event-bg-wrapper'>
                                            <img alt='eventbg' className='card-bg' src={cardBg}/>
                                        </Grid>
                                    ):(
                                        <Grid>

                                        </Grid>
                                    )}
                            </Grid>
                        </Hidden>
                        <Grid item lg={8} className='event-description'>
                            <Grid className='title-and-progress'>
                                <Typography variant={"h6"}>
                                    <strong>{event.title}</strong>
                                </Typography>
                                {attending!==0?(
                                    <Grid className='progress-bar'>
                                        <Progress 
                                            score={70}
                                            style={{
                                                opacity: 2,
                                                width: `${score}%`,
                                                height: '8px',
                                                cardWidth: '100px'
                                            }}
                                            >                                            
                                        </Progress>
                                        <strong>{attending}/{expectedAttendees} attending</strong>
                                    </Grid>                                       
                                    ):(
                                        <Grid>
                                        </Grid>
                                    )
                                    }   
                            </Grid>
                            <Grid>
                                <Typography variant={'body2'} className='event-details'>
                                    {event.details}
                                </Typography>
                            </Grid>
                            <Grid 
                                container 
                                className='event-rsvp'
                                justify={"space-between"} 
                                alignItems={'center'}
                            >
                                <Grid item lg={6}>
                                    <Grid className='flex-display'>                                        
                                        <LocationOnIcon/>
                                        <Typography variant={'body2'} className='title-font'>
                                            {event.location} 
                                        </Typography>
                                    </Grid>
                                    <Grid className='flex-display'>
                                        <DateRangeOutlinedIcon />
                                        <Typography variant={'body2'}>
                                                <strong>&nbsp;{day}, {date}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item lg={6} className='rsvp-buttons rsvp-sm'>
                                    <Grid>
                                        <Button>
                                            <img alt='Maybe' className='rsvp-btns-sm' src={maybeAttending}/><br/>
                                        </Button><br/>
                                        May be     
                                    </Grid>
                                    <Grid>
                                        <Button>
                                            <img alt='Not Attending' className='rsvp-btns-sm' src={notAttending}/><br/>
                                        </Button><br/>
                                        Not Attending
                                    </Grid>
                                    <Grid>
                                        <Button
                                            onClick={handleAddAttendee}
                                        >
                                            <img alt='Attending' className='rsvp-btns-sm' src={attendingIcon}/><br/>
                                        </Button><br/>                                
                                        Attending
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}   
            </Grid>
    )
}

export default EventCard