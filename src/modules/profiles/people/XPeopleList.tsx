import {IPerson} from "./IPerson";
import Grid from "@material-ui/core/Grid";
import ContactCard from "../../../components/ContactCard";
import Box from "@material-ui/core/Box";
import {XLoginSnackbar} from "../../../components/XLoginSnackbar";
import {Button} from "@material-ui/core";
import {ChevronRight} from "@material-ui/icons";
import React, {useState} from "react";
import {Urls} from "../../../routes/Urls";
import {editPersonConnection, loadPeople} from "./redux/peopleActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {userSelector} from "../../../data/coreSelectors";

interface IProps {
    people: IPerson[],
    category?: string,
    request: any
}

const XPeopleList = ({people, category, request} : IProps) => {

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const handleViewProfile = (id: string) => {
        const url = Urls.profiles.onePerson(id)
        window.location.replace(url)
    }

    const handleLoadMore = () => {
        dispatch(loadPeople({category}))
    }

    const handleConnect = (personId: string) => {
        if (user){
            dispatch(editPersonConnection({personId, followerId: user.profile.sub}))
        }else{
            setOpenSnackbar(true)
        }
    }

    return (
        <Grid spacing={2} justify={"flex-start"} container>
            {people.map((person: IPerson) => (
                <Grid item key={person.id} xs={12} sm={6} md={4} xl={3} lg={3}>
                    <ContactCard person={person}>
                        <div className="profile-bio-teaser">
                            {person.bio}
                        </div>
                        <Box mt={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} className="profile-action-buttons">
                                    <button
                                        type="button"
                                        onClick={() => handleViewProfile(person.id)}
                                        className="view-profile-button">
                                        <span>View Profile</span>
                                    </button>
                                </Grid>
                                <Grid item xs={6} className="profile-action-buttons">
                                    <button
                                        type="button"
                                        disabled={person.isConnected}
                                        onClick={() => handleConnect(person.id)}
                                        className={person.isConnected ? "connect-button-disabled" : "connect-button"}>
                                        <span>Connect</span>
                                    </button>

                                    {
                                        !user &&
                                        <XLoginSnackbar
                                            open={openSnackbar}
                                            onClose={() => setOpenSnackbar(false)}/>
                                    }

                                </Grid>

                            </Grid>

                        </Box>

                    </ContactCard>
                </Grid>
            ))}

            {request.hasMore && <Grid style={{textAlign: "center"}} item xs={12}>
                <Box mt={2} mb={2}>
                    <Button onClick={handleLoadMore} variant={"text"}>Load more <ChevronRight /></Button>
                </Box>
            </Grid>}

        </Grid>
    )
}

export default XPeopleList