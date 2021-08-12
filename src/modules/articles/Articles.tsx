import React, {useEffect, useState} from "react";
import {Container, Grid} from "@material-ui/core";
import {IArticle} from "../../interfaces/IArticle";
import {PleaseWait} from "../../components/PleaseWait";
import {useDispatch, useSelector} from "react-redux";
import {postsSelector} from "../posts/redux/postsSelectors";
import {userSelector} from "../../data/coreSelectors";
import {articlesSelector} from "./redux/articlesSelectors";
import {loadArticles} from "./redux/articlesActions";
import _ from "lodash";
import ArticleListItem from "./ArticleListItem";
import {XFab} from "../../components/buttons/XFab";
import {Urls} from "../../routes/Urls";
import { useHistory } from "react-router-dom";
import {Add, AddCircle} from "@material-ui/icons";

const Articles = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const articles = useSelector(articlesSelector)

    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadArticles())
    }, [dispatch])

    if (_.isEmpty(articles.data) && articles.isLoading) return (
        <Container maxWidth={"lg"}>
            <PleaseWait label="Loading articles. Please wait..." />
        </Container>
    )

    const handleCreate = () => {
        history.push(Urls.articles.create)
    }

    return (
        <Container maxWidth={"lg"}>

            <Grid container spacing={2}>
                {articles.data.map((article: IArticle, index: number) => {
                    return (
                        <Grid key={index} item xs={12} md={4} lg={4}>
                            <ArticleListItem article={article} />
                        </Grid>
                    )
                })}
            </Grid>

            <XFab
                onClick={handleCreate}
                bottom={20}
                right={20}
                color={"secondary"}
                position={"fixed"}
                variant={"round"}>
                <Add />
            </XFab>

        </Container>
    )
}

export default Articles