import {Form, Formik} from "formik";
import {Box, Button, CircularProgress} from "@material-ui/core";
import React from "react";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import {Endpoints} from "../../../services/Endpoints";
import XSelectInputAsync from "../../../components/inputs/XSelectInputAsync";
import {useDispatch} from "react-redux";
import {loadJobs} from "../redux/jobsActions";
import {useHistory, useLocation} from "react-router-dom";

const JobFilter = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const useQuery = () => {
        return new URLSearchParams(location.search)
    }

    const companyId = useQuery().get('companyId')
    const categoryId = useQuery().get('categoryId')

    const initialValues = {
        companyId,
        categoryId
    }

    const handleSearch = (values: any, actions: any) => {
        const queryString =
            Object
                .keys(values)
                .filter(v => values[v])
                .map(key => key + '=' + values[key])
                .join('&')

        const {pathname} = window.location

        history.push({
            pathname,
            search: queryString
        })

        dispatch(loadJobs(values))
    }

    return (
        <Box mb={1}>
            <Grid spacing={2} container>
                <Grid xs={12} item>
                    <div className="headline">Search for your next job</div>
                    <div className="filter-container">

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSearch}
                        >
                            {({isSubmitting}) => (
                                <Form id="job-filter">
                                    <Grid spacing={2} justify={"flex-start"} container>
                                        <Grid item xs={12} sm={5}>
                                            <XSelectInputAsync
                                                size={"small"}
                                                name="companyId"
                                                placeholder={"Select company"}
                                                data={{
                                                    label: 'name',
                                                    field: 'startups',
                                                    params: {page: 1, pageSize: 100},
                                                    avatar: 'avatar',
                                                    endpoint: Endpoints.base + Endpoints.business.base
                                                }}
                                                variant={"outlined"}/>
                                        </Grid>
                                        <Grid item xs={9} sm={5}>
                                            <XSelectInputAsync
                                                size={"small"}
                                                placeholder={"Select category"}
                                                name={"categoryId"}
                                                variant={"outlined"}
                                                data={{
                                                    label: 'name',
                                                    endpoint: Endpoints.jobs.base + Endpoints.jobs.api + '/categories'
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={2}>
                                            <Button
                                                type={"submit"}
                                                className="search-btn"
                                                variant={"contained"}
                                                color={"secondary"}
                                            >
                                                {
                                                    isSubmitting ?
                                                        <CircularProgress
                                                            color={"inherit"} size={24}
                                                            variant={"indeterminate"}/> :
                                                        <SearchIcon/>
                                                }
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default JobFilter