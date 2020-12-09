import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {IPost} from "../../interfaces/IPost";
import {getProfile} from "../../services/User";
import {IProfile} from "../../interfaces/IProfile";
import {IComment} from "../../interfaces/IComment";

const initialState = {
    comments: [],
    status: 'idle',
    currentRequestId: undefined,
    error: null
}

export const getComments = createAsyncThunk('comments/fetchComments', async (postId: any, {getState, requestId}: any) => {

    const {currentRequestId, status} = getState().comments
    if(status !== 'loading' || requestId !== currentRequestId) return

    const url = makeUrl("Profiles", Endpoints.blog.comment)
    const response: any = await getAsync(url, {postId})

    return response.body
})

export const addComment = createAsyncThunk(
    'comments/addComment',
    async (comment: IComment) => {
        const url = makeUrl("Profiles", Endpoints.blog.comment)
        const response: any = await postAsync(url, comment)
        return response.body
    }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        commentAdded: {
            reducer(state: any, action: any){
                const {postId, comment} = action.payload
                const existingPost = state.comments.find((post: IPost) => post.id === postId)
                if (existingPost) existingPost.comments.push(comment)
            },
            prepare(){
                const profile: IProfile = getProfile()
                return {
                    payload: {
                        dateCreated: new Date().toISOString(),
                        author: profile
                    }
                }
            }
        }
    },
    extraReducers: {
        [getComments.pending.toString()]: (state, action) => {
            state.status = 'loading'
            state.currentRequestId = action.meta.requestId
        },
        [getComments.fulfilled.toString()]: (state: any, action: any) => {
            const {requestId} = action.meta
            if(state.status === 'loading' && state.currentRequestId === requestId){
                state.status = 'succeeded'
                state.comments.push([...action.payload])
                state.currentRequestId = undefined
            }
        },
        [getComments.rejected.toString()]: (state, action) => {
            const {requestId} = action.meta
            if(state.status === 'loading' && state.currentRequestId === requestId){
                state.status = 'failed'
                state.error = action.error.message
                state.currentRequestId = undefined
            }
        },
        [addComment.fulfilled.toString()]: (state: any, action: any) => {
            const profile: IProfile = getProfile()

            action.payload.dateCreated = new Date().toISOString()
            action.payload.author = profile

            const {postId} = action.payload

            state.posts.posts.filter((p: IPost) => p.id === postId)[0].comments.push(action.payload)

            state.currentRequestId = undefined
        }

    }
})

export const {commentAdded} = commentsSlice.actions
export default commentsSlice.reducer
export const getCommentsByPostId = (state: any, postId: any) => {
    const post: IPost = state.posts.posts.filter((p: IPost) => p.id === postId)[0]
    return post.comments
}
