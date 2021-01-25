import React from "react";
import ContentLoader, {Facebook} from "react-content-loader";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

export const PostContentLoader = () => {
    return (
        <Card>
            <CardContent>
                <Facebook/>

                <ContentLoader
                    width={"100%"}
                    height={120}
                    speed={2}
                >
                    <rect x="0" y="0" rx="0" ry="0" width="30%" height="100" />
                    <rect x="33%" y="0" rx="0" ry="0" width="30%" height="100" />
                    <rect x="66%" y="0" rx="0" ry="0" width="30%" height="100" />

                    <rect x="0" y="110" rx="0" ry="0" width="100%" height="1" />

                    {/*<rect x="10%" y="120" rx="0" ry="0" width="30%" height="30" />*/}
                    {/*<rect x="60%" y="120" rx="0" ry="0" width="30%" height="30" />*/}
                </ContentLoader>

            </CardContent>
        </Card>
    );
};
