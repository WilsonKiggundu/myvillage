import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React from "react";
import ContactCard from "../../../components/ContactCard";

interface IProps {
    title: string
    items: any
}

export function PeopleCard(props: IProps) {
    return <Box mb={2}>
        <Typography style={{padding: "15px 0"}}>{props.title}</Typography>

        {props.items ?
            <Grid container spacing={2}>
                {
                    props.items.slice(0, 6).map((person: any, index: number) => (
                        <Grid key={person.id} item xs={6} sm={6} md={4}>
                            <ContactCard {...person}/>
                        </Grid>
                    ))

                }
                <Grid item xs={12} sm={2} md={4}>

                </Grid>
            </Grid> : ""
        }
    </Box>;
}