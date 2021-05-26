import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import React from "react";

interface IProps {
    title?: string
    description?: string
    hashtags?: ["#MyVillage"]
}

const SocialShare = ({title, description, hashtags}: IProps) => {

    const url = window.location.href

    return (
        <Box mb={2} mt={2}>
            <Grid container justify={"center"} spacing={2}>
                <Grid item>
                    <FacebookShareButton quote={description} hashtag={hashtags?.join(' ')} url={url}>
                        <FacebookIcon size={40} round/>
                    </FacebookShareButton>
                </Grid>
                <Grid item>
                    <LinkedinShareButton title={title} summary={description} url={url}>
                        <LinkedinIcon size={40} round/>
                    </LinkedinShareButton>
                </Grid>
                <Grid item>
                    <TwitterShareButton title={`${title} ${description}`} hashtags={["MyVillage"]} url={url}>
                        <TwitterIcon size={40} round/>
                    </TwitterShareButton>
                </Grid>
                <Grid item>
                    <WhatsappShareButton title={title} url={url}>
                        <WhatsappIcon size={40} round/>
                    </WhatsappShareButton>
                </Grid>

            </Grid>
        </Box>
    )
}

export default SocialShare