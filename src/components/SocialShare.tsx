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
    size?: number
    round?: boolean
    hashtags?: ["#MyVillage"]
}

const SocialShare = ({title, description, hashtags, round = true, size = 40}: IProps) => {

    const url = window.location.href

    return (
        <Box mb={2} mt={2}>
            <Grid container justify={"center"} spacing={2}>
                <Grid item>
                    <FacebookShareButton quote={description} hashtag={hashtags?.join(' ')} url={url}>
                        <FacebookIcon size={size} round/>
                    </FacebookShareButton>
                </Grid>
                <Grid item>
                    <LinkedinShareButton title={title} summary={description} url={url}>
                        <LinkedinIcon size={size} round/>
                    </LinkedinShareButton>
                </Grid>
                <Grid item>
                    <TwitterShareButton title={`${title} ${description}`} hashtags={["MyVillage"]} url={url}>
                        <TwitterIcon size={size} round/>
                    </TwitterShareButton>
                </Grid>
                <Grid item>
                    <WhatsappShareButton title={title} url={url}>
                        <WhatsappIcon size={size} round/>
                    </WhatsappShareButton>
                </Grid>

            </Grid>
        </Box>
    )
}

export default SocialShare