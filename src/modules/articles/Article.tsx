import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import {PleaseWait} from "../../components/PleaseWait";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import {getArticleById} from "./redux/articlesEndpoints";
import Toast from "../../utils/Toast";
import {timeAgo} from "../../utils/dateHelpers";
import SocialShare from "../../components/SocialShare";
import './css/Article.css'
import XImageLoader from "../../components/XImageLoader";
import {Edit} from "@material-ui/icons";
import {XFab} from "../../components/buttons/XFab";
import {Urls} from "../../routes/Urls";
import {useHistory} from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import XDialog from "../../components/dialogs/XDialog";
import LikeDialogBox from "../../components/LikeDialogBox";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import CommentsList from "../../components/CommentsList";
import NewComment from "../posts/forms/NewComment";
import {likePost, loadComments} from "../posts/redux/postsActions";

const Article = ({match}: any) => {

    const {id} = match.params

    const dispatch = useDispatch()
    const history = useHistory()
    const [article, setArticle] = useState<any | undefined>(undefined)
    const [summary, setSummary] = useState<string | undefined>(undefined)
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [liked, setLiked] = useState<boolean>(false)
    const [openLikesDialog, setOpenLikesDialog] = useState<boolean>(false)
    const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [showComments, setShowComments] = useState<boolean>(false)
    const [commentsPage, setCommentsPage] = useState<number>(1)

    const user = useSelector(userSelector)

    const handleUpdate = (id: string) => {
        history.push(`${Urls.articles.update}/${id}`)
    }

    const handleLike = async (id: string) => {
        if (!user) {
            setOpenSnackbar(true)
        } else {
            const personId = user?.profile.sub
            dispatch(likePost({entityId: id, personId}))
        }
    }

    const handleAddComment = () => {
        if (user) setOpenCommentDialog(true)
        else setOpenSnackbar(true)
    }

    useEffect(() => {
        getArticleById(id)
            .then((response: any) => {
                const article = response.body.articles[0]
                setArticle(article)

                setCanEdit(user?.profile?.sub === article.authorId)

                let div = document.createElement("div")
                div.innerHTML = article.details

                const text = div.textContent || div.innerText || ""
                setSummary(text)

            })
            .catch((error: any) => Toast.error("Error while fetching article"))
    }, [])

    if (article === undefined) return (
        <Container maxWidth={"lg"}>
            <PleaseWait label="Loading article. Please wait..."/>
        </Container>
    )

    return (
        <Container className="article-details" maxWidth={"md"}>
            <div className="article-details-image">
                {article && article.uploads.length && <XImageLoader
                    height={'auto'}
                    width={"100%"}
                    src={article.uploads[0].path}
                    effect={'blur'}
                />}
            </div>
            <div className="article-details-title">{article.title}</div>
            <Box mt={2} mb={2}>
                <Divider/>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className="article-author-avatar"/>
                                </ListItemAvatar>
                                <ListItemText
                                    secondary={timeAgo(article.dateCreated)}
                                    primary={`${article.author.firstname} ${article.author.lastname}`}/>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid style={{textAlign: "right"}} item xs={12} md={6}>
                        <SocialShare
                            round={false}
                            size={50}
                            title={article.title}
                            hashtags={["#MyVillage"]}
                            description={summary?.slice(0, 25)}/>
                    </Grid>
                </Grid>
                <Divider/>
            </Box>
            <div className="article-details-body" dangerouslySetInnerHTML={{
                __html: article.details
            }}/>


            <div style={{margin: "0 -20px"}}>

                <div className="Comments">
                    <CommentsList articleId={article.id}/>

                    <div
                        onClick={handleAddComment}
                        className="Comment-input">
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={user?.profile.picture}/>
                                </ListItemAvatar>
                                <ListItemText primary="What do you think about the article?"/>
                            </ListItem>
                        </List>
                    </div>
                    <XDialog
                        title={"Add a comment"}
                        open={openCommentDialog}
                        onClose={() => setOpenCommentDialog(false)}>
                        <NewComment onClose={() => setOpenCommentDialog(false)} article={article}/>
                    </XDialog>
                </div>
            </div>

            {canEdit && <XFab
                onClick={() => handleUpdate(article.id)}
                bottom={20}
                right={20}
                color={"primary"}
                position={"fixed"}
                variant={"round"}>
                <Edit/>
            </XFab>}

        </Container>
    )
}

export default Article