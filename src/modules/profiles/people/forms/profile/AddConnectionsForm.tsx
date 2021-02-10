import React, {useEffect, useState} from "react";
import {Grid, List} from "@material-ui/core";
import {IPerson} from "../../IPerson";
import {PleaseWait} from "../../../../../components/PleaseWait";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {getPeople} from "../../redux/peopleEndpoints";
import ListItem from "@material-ui/core/ListItem";
import {Urls} from "../../../../../routes/Urls";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import {useHistory} from "react-router-dom";
import _ from "lodash";
import {globalStyles} from "../../../../../theme/styles";
import Toast from "../../../../../utils/Toast";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../../../data/coreSelectors";
import {editPersonConnection} from "../../redux/peopleActions";

interface IProps {
    person: IPerson
    onClose?: () => any
}

const AddConnectionsForm = ({person, onClose}: IProps) => {

    const classes = globalStyles()

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    const [page, setPage] = useState<number>(1)
    const [people, setPeople] = useState<IPerson[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false)

    // const p = useSelector((state => personSelector(state, user.profile.sub)));
    //
    // console.log(p)
    //
    // const exclude: any = []
    // const exclude = connections?.map((m: IConnection) => m.personId)
    // exclude?.push(user.profile.sub)


    const handleScroll = (event: any) => {
        const element = event.target

        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            if (hasMore) {
                fetchPeople()
            }
        }
    }

    useEffect(() => {
        fetchPeople()
    }, [])

    const fetchPeople = () => {
        getPeople({page, pageSize: 10})
            .then((response: any) => {
                setPeople([...people, ...response?.body?.persons])
                if (response.body.hasMore) {
                    const nextPage = page + 1;
                    setPage(nextPage)
                    setHasMore(true)
                }
            })
    }

    const handleClick = async (personId: string) => {

        try {
            dispatch(editPersonConnection({personId, followerId: user.profile.sub}))
        } catch (e) {
            Toast.error(e.toString())
        } finally {
            if (onClose) onClose()
        }

    }

    if (_.isEmpty(people)) return (
        <Box mb={4}>
            <PleaseWait/>
        </Box>
    )

    return (
        <Grid onScroll={handleScroll} className={classes.scrollableDialog} spacing={2} container>
            <Grid item xs={12}>
                <List>
                    {people?.map((person: any, index: number) => {
                        return (
                            <Box key={index}>
                                <ListItem button
                                          onClick={() => history.push(Urls.profiles.onePerson(person.id))}
                                          alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={person.firstname} src={person.avatar}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${person.firstname} ${person.lastname}`}
                                        secondary={
                                            <Typography
                                                noWrap
                                                className={classes.ellipsis}
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {person.bio}
                                            </Typography>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => handleClick(person.id)} edge="end" aria-label="more">
                                            <ChevronRightIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider variant="fullWidth" component="li"/>
                            </Box>
                        )
                    })}
                </List>
            </Grid>
        </Grid>
    )
}

export default AddConnectionsForm