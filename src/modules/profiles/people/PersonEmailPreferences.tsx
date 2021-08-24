import {
    Button,
    Card, CardActionArea, CardContent,
    CardHeader,
    Container,
    Divider,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Switch
} from "@material-ui/core";
import React, {useEffect} from "react";
import {emailPreferences} from "../../../data/emailPreferences";
import {IEmailPreference} from "../../../interfaces/IEmailPreference";
import _ from "lodash";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import {getAsync, makeUrl, putAsync} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {handleLogin} from "../../../utils/authHelpers";
import Toast from "../../../utils/Toast";

export default function PersonEmailPreferences() {

    const user = useSelector(userSelector)

    if (!user) handleLogin()

    const preferences = _.chain(emailPreferences())
        .groupBy((pref: IEmailPreference) => pref.section)
        .map((items, section) => ({section, items}))
        .value();

    const [checked, setChecked] = React.useState<string[]>([]);

    const handleToggle = (value: any) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        const isChecked = currentIndex === -1

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        // update the preference
        const url = makeUrl("Profiles", Endpoints.settings)

        console.log({personId: user.profile.sub, type: value, value: isChecked})

        putAsync(url, {personId: user.profile.sub, type: value, value: isChecked})
            .then(() => {
                setChecked(newChecked)
            })
            .catch(error => Toast.error(error.toString()))
    }

    useEffect(() => {
        const url = makeUrl("Profiles", Endpoints.settings)
        getAsync(url, {personId: user.profile.sub})
            .then((response: any) => {
                const preferences = response.body

                console.log({...preferences})

                if (preferences){
                    for (const [key, value] of Object.entries(preferences)) {
                        if (value) checked.push(key)
                    }
                }

            })
    }, [user])

    return (
        <Container maxWidth={"md"}>
            <Card>
                <CardHeader title={"Email Preferences"}/>

                {preferences.map((pref: any, index: number) => {
                    return (
                        <div key={index}>
                            <Divider/>
                            <List subheader={<ListSubheader>{pref.section}</ListSubheader>}>
                                {pref.items.map((item: IEmailPreference, index: number) => {
                                    const id = 'switch-list-label' + item.id
                                    return (
                                        <div key={id}>
                                            <ListItem disabled={item.disabled} disableRipple onClick={handleToggle(item.id)} button>
                                                <ListItemText
                                                    id={id}
                                                    secondary={item.secondaryLabel}
                                                    primary={item.primaryLabel}/>
                                                <ListItemSecondaryAction>
                                                    <Switch
                                                        color={"primary"}
                                                        edge="end"
                                                        disabled={item.disabled}
                                                        onChange={handleToggle(item.id)}
                                                        checked={checked.indexOf(item.id) !== -1}
                                                        inputProps={{'aria-labelledby': id}}
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            {index + 1 < pref.items.length && <Divider/>}
                                        </div>
                                    )
                                })}
                            </List>
                        </div>
                    )
                })}

            </Card>
        </Container>
    )
}