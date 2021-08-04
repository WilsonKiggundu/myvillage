import React from "react";
import ContentLoader, {Facebook} from "react-content-loader";

export const EventLoader = () => {
    return (
            <div className="event-canvas">

                <ContentLoader
                    width={"100%"}
                    height={100}
                    speed={2}
                >
                    <rect x="0" y="0" rx="0" ry="0" width="75%" height="35" />
                    <rect x="80%" y="0" rx="0" ry="0" width="20%" height="50" />
                    <rect x="0" y="40" rx="0" ry="0" width="30%" height="20" />

                </ContentLoader>

                <ContentLoader
                    width={"100%"}
                    height={120}
                    speed={2}
                >
                    <rect x="0" y="0" rx="0" ry="0" width="32%" height="100" />
                    <rect x="36%" y="0" rx="0" ry="0" width="30%" height="100" />
                    <rect x="70%" y="0" rx="0" ry="0" width="30%" height="100" />

                </ContentLoader>

                <ContentLoader
                    width={"100%"}
                    height={120}
                    speed={2}
                >
                    <rect x="0" y="0" rx="0" ry="0" width="80%" height="15" />
                    <rect x="0" y="18" rx="0" ry="0" width="75%" height="15" />
                    <rect x="0" y="36" rx="0" ry="0" width="93%" height="15" />
                    <rect x="0" y="54" rx="0" ry="0" width="50%" height="15" />

                </ContentLoader>

                <ContentLoader
                    width={"100%"}
                    height={500}
                    speed={2}
                >
                    <rect x="0" y="0" rx="0" ry="0" width="100%" height="300" />
                    <rect x="0" y="320" rx="0" ry="0" width="20%" height="50" />
                    <rect x="22%" y="320" rx="0" ry="0" width="20%" height="50" />
                    <rect x="0" y="400" rx="0" ry="0" width="100%" height="2" />
                    <circle cx="35%" cy="450" r="25" />
                    <circle cx="45%" cy="450" r="25" />
                    <circle cx="55%" cy="450" r="25" />
                    <circle cx="65%" cy="450" r="25" />

                </ContentLoader>

            </div>
    );
};
