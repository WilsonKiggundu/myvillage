import {Box} from "@material-ui/core";
import React from "react";
import faker from "faker"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Alert} from "@material-ui/lab";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemLink from "../../components/ListItemLink";
import {Urls} from "../../routes/Urls";
import {format, differenceInCalendarDays, formatDistanceToNow} from "date-fns"
import {Link, useHistory} from "react-router-dom";
import XSelectDropdown from "../../components/inputs/XSelectDropdown";
import palette from "../../theme/palette";
import CustomAccordion from "../../components/CustomAccordion";

const Jobs = ({match}: any) => {
    const history = useHistory()
    let jobs = []

    for (let i = 0; i < 18; i++) {
        const job = {
            id: faker.random.uuid(),
            deadline: new Date(faker.date.soon(4)),
            title: faker.lorem.sentence(4),
            status: faker.random.arrayElements(['Part time', 'Full time'])[0],
            location: faker.address.country(),
            company: {
                name: faker.company.companyName(),
                id: faker.random.uuid()
            },
            about: faker.lorem.paragraphs(3),
            description: faker.lorem.sentences(12),
            qualifications: faker.lorem.sentences(7),
            benefits: faker.lorem.sentences(21),
            instructions: faker.lorem.sentences(3)
        }
        jobs.push(job)
    }

    let {id} = match.params
    if (id === undefined) {
        id = jobs[0].id
    }

    const locations = Array.from(new Set([...jobs.map(j => j.location)]))
        .map(m => ({label: m, value: m}))

    const categories: any = Array.from(new Set([...jobs.map(j => j.status)]))
        .map(m => ({label: m, value: m}))

    const companies: any = Array.from(new Set([...jobs.map(j => j.company.name)]))
        .map(m => ({label: m, value: m}))

    const handleClick = (id: string) => {
        history.push(Urls.jobs + "/" + id)
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid spacing={2} container justify={"flex-start"}>
                <Box mb={2} clone order={{xs: 1, md: 1}}>
                    <Grid item xs={12}>
                        <CustomAccordion title={"Filter"}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={4}>
                                    <XSelectDropdown
                                        variant={"standard"}
                                        placeholder={"Location"}
                                        helperText={"Filter by location"}
                                        options={locations}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <XSelectDropdown helperText={"Filter by category"}
                                                     placeholder={"Category"}
                                                     options={categories}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <XSelectDropdown helperText={"Filter by company"}
                                                     placeholder={"Company"}
                                                     options={companies}/>
                                </Grid>
                            </Grid>
                        </CustomAccordion>
                    </Grid>
                </Box>

                <Box clone order={{xs: 3, md: 2}}>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                {jobs ? jobs.map(job => (
                                    <div key={job.id}>
                                        <ListItemLink alignItems="flex-start" onClick={() => handleClick(job.id)}>
                                            <ListItemText primary={job.title} secondary={job.company.name}/>
                                        </ListItemLink>
                                        <Divider/>
                                    </div>
                                )) : ""}
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>

                <Box clone order={{xs: 2, md: 3}}>
                    <Grid item xs={12} md={9}>
                        {jobs ? jobs.filter(f => f.id === id).map(job => (
                            <Box mb={2} key={job.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant={"h4"} style={{marginBottom: 10}}>
                                            {job.title}
                                        </Typography>
                                        <Typography component={"div"}>
                                            <Link style={{textDecoration: 'none', color: palette.secondary.main}}
                                                  to={`${Urls.profiles.startups}/${job.company.id}`}>
                                                {job.company.name}</Link> . {job.location} . {job.status}
                                        </Typography>

                                        <Box mt={2} mb={2}>
                                            <Alert color={
                                                differenceInCalendarDays(job.deadline, new Date()) <= 1 ? "warning" : "info"
                                            } icon={false}>
                                                Application deadline is
                                                on <strong>{format(job.deadline, "PPPP")}</strong> ({formatDistanceToNow(job.deadline)} from
                                                now)
                                            </Alert>
                                        </Box>

                                        <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                            <strong>About the role</strong>
                                        </Typography>
                                        <Typography component={"p"}>{job.about}</Typography>

                                        <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                            <strong>What you'll do</strong>
                                        </Typography>
                                        <Typography component={"p"}>{job.description}</Typography>

                                        <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                            <strong>What you'll bring</strong>
                                        </Typography>
                                        <Typography component={"div"}>
                                            <ul>
                                                {job.qualifications.slice(0, -1).split('.').map((m, index) => <li
                                                    key={index}>{m}</li>)}
                                            </ul>
                                        </Typography>

                                        <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                            <strong>What you'll get</strong>
                                        </Typography>
                                        <Typography component={"div"}>
                                            <ul>
                                                {job.benefits.slice(0, -1).split('.').map((m, index) => <li
                                                    key={index}>{m}</li>)}
                                            </ul>
                                        </Typography>

                                        <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                            <strong>How to apply</strong>
                                        </Typography>
                                        <Typography component={"div"}>
                                            <ul>
                                                {job.instructions.slice(0, -1).split('.').map((m, index) => <li
                                                    key={index}>{m}</li>)}
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        )) : ""
                        }
                    </Grid>
                </Box>
            </Grid>
        </Container>
    )
}

export default Jobs