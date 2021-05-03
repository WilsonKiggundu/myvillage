import {Box, Card, CardContent, CardHeader, Grid} from "@material-ui/core";
import XTextInput from "../../../components/inputs/XTextInput";
import XSelectInputAsync from "../../../components/inputs/XSelectInputAsync";
import {Endpoints} from "../../../services/Endpoints";
import XSelectInput from "../../../components/inputs/XSelectInput";
import {countries} from "../../../data/Countries";
import {ICountry} from "../../../interfaces/ICountry";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import {IJobCategory} from "../../../interfaces/IJob";
import XSelectInputCreatable from "../../../components/inputs/XSelectInputCreatable";
import XDateInput from "../../../components/inputs/XDateInput";
import {IStartup} from "../../../interfaces/IStartup";
import {getAsync, makeUrl} from "../../../utils/ajax";

interface IProps {
    formField: any
}

const JobOverview = ({formField}: IProps) => {
    const user = useSelector(userSelector)
    const [startups, setStartups] = useState<any[]>([])

    useEffect(() => {
        (async () => {
            const url = makeUrl("Profiles", Endpoints.business.base)
            const response: any = await getAsync(url, {});

            console.log(response)

            if (response.status === 200){
                const startups = response.body.startups.map((m: any) => ({id: m.id, name: m.name}))
                setStartups(startups)
            }
        })();
    }, [setStartups])

    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    title={"Overview"}
                    subheader={"* Required fields"} />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <XTextInput
                                name={"title"}
                                multiline={false}
                                variant={"outlined"}
                                placeholder={"* Job title"}
                                helperText={"Ex. Senior Software Engineer"}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>

                            <XSelectInputCreatable
                                variant={"outlined"}
                                name={"company"}
                                allowAddNew={true}
                                multiple={false}
                                label={"* Company name"}
                                helperText={"Start typing your company name."}
                                options={startups}
                            />

                            {/*<XSelectInputAsync*/}
                            {/*    name="companyId"*/}
                            {/*    placeholder={"* Company"}*/}
                            {/*    helperText={"Start typing your company name."}*/}
                            {/*    data={{*/}
                            {/*        label: 'name',*/}
                            {/*        field: 'startups',*/}
                            {/*        params: {page: 1, pageSize: 25, personId: user.profile.sub},*/}
                            {/*        avatar: 'avatar',*/}
                            {/*        endpoint: Endpoints.base + Endpoints.business.base*/}
                            {/*    }}*/}
                            {/*    variant={"outlined"} />*/}
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <XSelectInputAsync
                                placeholder={"* Category"}
                                name={"category"}
                                variant={"outlined"}
                                helperText={"Ex. Information Technology"}
                                data={{
                                    label: 'name',
                                    endpoint: Endpoints.jobs.base + Endpoints.jobs.api + '/categories'
                                }}/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <XTextInput
                                placeholder={"Job type"}
                                name={"jobType"}
                                variant={"outlined"}
                                helperText={"Ex. Contract, Full time"}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <XTextInput
                                helperText={"Ex. Uganda, Kenya, Remote"}
                                name={"location"}
                                variant={"outlined"}
                                placeholder={"* Location"}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <XDateInput
                                disablePast
                                name={"deadline"}
                                variant={"outlined"}
                                placeholder={"* Application deadline"}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <XTextInput
                                helperText={"Ex. 5 years"}
                                name={"experience"}
                                variant={"outlined"}
                                placeholder={"* Years of experience"}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <XTextInput
                                helperText={"Ex. 500,000. Optional"}
                                name={"minSalary"}
                                variant={"outlined"}
                                placeholder={"Minimum salary"}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <XTextInput
                                helperText={"Ex. 1,000,000. Optional"}
                                name={"maxSalary"}
                                variant={"outlined"}
                                placeholder={"Maximum salary"}
                            />
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default JobOverview