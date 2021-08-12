import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {IArticle} from "../../interfaces/IArticle";
import {timeAgo} from "../../utils/dateHelpers";
import {Urls} from "../../routes/Urls";

import './css/ArticleListItem.css'
import Card from "@material-ui/core/Card";
import {useHistory} from "react-router-dom";
import {format} from "date-fns";
import XImageLoader from "../../components/XImageLoader";
import Button from "@material-ui/core/Button";
import {ChevronRight} from "@material-ui/icons";

interface IProps {
    id?: string
    article: any
}

export default function ArticleListItem({article, id}: IProps) {

    const history = useHistory()

    const [author, setAuthor] = useState(article.author)
    const [summary, setSummary] = useState<string | undefined>(undefined)

    const handleClick = (article: IArticle) => {
        const date = format(new Date(article.dateCreated), "yyyy-MM-dd")
        const dateArray = date.split("-")
        const year = dateArray[0]
        const month = dateArray[1]
        const day = dateArray[2]

        history.push(Urls.articles.singleArticle(id ?? article.id, year, month, day))
    }

    useEffect(() => {
        let div = document.createElement("div")
        div.innerHTML = article.details

        const text = div.textContent || div.innerText || ""
        setSummary(text)
    }, [article])


    return (
        <Card>
            <List>
                <ListItem alignItems={"flex-start"}>
                    <ListItemAvatar>
                        <Avatar/>
                    </ListItemAvatar>
                    <ListItemText
                        secondary={timeAgo(article.dateCreated)}
                        primary={
                            <a className="article-author"
                               href={Urls.profiles.onePerson(article.authorId)}>
                                {article.author.firstname} {article.author.lastname}
                            </a>
                        }/>
                </ListItem>
            </List>

            <div className="article-image">
                {article && article.uploads.length > 0 && <XImageLoader
                    height={'auto'}
                    width={"100%"}
                    src={article.uploads[0].path}
                    effect={'blur'}
                />}
            </div>

            <div className="article-title">
                <a onClick={() => handleClick(article)}>
                    {article.title}
                </a>
            </div>
            <div className="article-summary">{summary}</div>
            <div className="article-item-actions">
                <Button
                    onClick={() => handleClick(article)}
                    disableElevation color={"secondary"}
                    style={{textTransform: 'inherit'}}
                    variant={"outlined"}
                    size={"medium"}>
                    Read Article <ChevronRight/>
                </Button>
            </div>
        </Card>
    )
}