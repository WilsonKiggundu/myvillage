import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import React from "react";
import {globalStyles} from "../../../theme/styles";

interface IProps {
    profile: any
}

export function StartupBioCard(props: IProps) {

    const classes = globalStyles()

    const avatar = "https://innovationvillage.co.ug/wp-content/uploads/2020/07/new-logo-white-02-1.png";
    const coverPhoto = "https://picsum.photos/1920/1080?image=20"

    return <Box mb={2}>
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={avatar} aria-label="recipe" className={classes.avatar}/>
                }
                action={
                    <>
                        <IconButton aria-label="settings">
                            <Button className={clsx(classes.noShadow)}
                                    color="primary"
                                    size="small"
                                    variant="outlined">
                                Follow
                            </Button>
                        </IconButton>
                        <IconButton aria-label="send message">
                            <SendIcon />
                        </IconButton>
                    </>
                }
                title={props.profile.name}
                subheader="Gulu . Jinja . Mbarara . Mbale . Ntinda"
            />

            <img style={{width: "100%"}} src={coverPhoto} alt=""/>

            <CardContent>
                <Box>
                    <Typography variant="body2">
                        Quisque eu eleifend sapien. Sed et eros non nibh eleifend tempus. Sed rhoncus
                        mauris in tellus viverra, in molestie turpis feugiat. Fusce massa massa,
                        convallis ut elit ac, dictum porta odio. Aenean viverra neque id turpis maximus
                        cursus. Etiam vitae mi eros. Duis vestibulum orci ex, in vulputate leo iaculis
                        eget. Suspendisse suscipit tortor sit amet neque.
                    </Typography>
                </Box>

            </CardContent>
        </Card>
    </Box>;
}