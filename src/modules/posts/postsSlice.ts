import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {IPost} from "../../interfaces/IPost";
import {getProfile, getUser} from "../../services/User";
import {User} from "oidc-client/dist/oidc-client";
import {IProfile} from "../../interfaces/IProfile";
import {IComment} from "../../interfaces/IComment";

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const getPosts = createAsyncThunk('posts/fetchPosts',
    async () => {
        const url = makeUrl("Profiles", Endpoints.blog.post)
        const response: any = await getAsync(url)
        return response.body
    })

export const getPostsByPersonId = createAsyncThunk('posts/fetchPosts',
    async (personId: string) => {
        const url = makeUrl("Profiles", Endpoints.blog.post)
        const response: any = await getAsync(url, {personId})
        return response.body
    })

export const addPost = createAsyncThunk(
    'posts/addPost',
    async (post: any) => {
        const url = makeUrl("Profiles", Endpoints.blog.post)
        const response: any = await postAsync(url, post)

        return response.body
    }
)

export const addComment = createAsyncThunk(
    'posts/addComment',
    async (comment: IComment) => {
        const url = makeUrl("Profiles", Endpoints.blog.comment)
        const response: any = await postAsync(url, comment)
        return response.body
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state: any, action: any) {
                state.posts.push(action.payload)
            },
            prepare(post) {
                return {
                    payload: {
                        dateCreated: new Date().toISOString()
                    }
                }
            }
        },
        commentAdded: {
            reducer(state: any, action: any) {
                const {postId, comment} = action.payload
                const existingPost = state.posts.find((post: IPost) => post.id === postId)
                if (existingPost) existingPost.comments.push(comment)
            },
            prepare() {
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
        [getPosts.pending.toString()]: (state, action) => {
            state.status = 'loading'
        },
        [getPosts.fulfilled.toString()]: (state: any, action: any) => {
            state.status = 'succeeded'
            state.posts.push(...action.payload)
        },
        [getPosts.rejected.toString()]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addPost.fulfilled.toString()]: (state: any, action: any) => {
            const profile: IProfile = getProfile()

            action.payload.dateCreated = new Date()
            action.payload.author = profile

            if (action.payload.uploads) {
                action.payload.uploads = JSON.parse(action.payload.uploads)
            }

            state.posts.push(action.payload)
        },
        [addComment.fulfilled.toString()]: (state: any, action: any) => {
            const profile: IProfile = getProfile()

            action.payload.dateCreated = new Date().toISOString()
            action.payload.author = profile

            const {postId} = action.payload

            state.posts.filter((p: IPost) => p.id === postId)[0].comments.push(action.payload)

            state.currentRequestId = undefined
        }
    }
})

export const {postAdded} = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = (state: any) => state.posts.posts