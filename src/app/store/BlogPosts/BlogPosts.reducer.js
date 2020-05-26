import { GET_POSTS, GET_SINGLE_POST } from './BlogPosts.action';

const initialState = [];

const BlogPostsReducer = (state = initialState, action) => {
    const { type, postData } = action;

    switch (type) {
    case GET_POSTS:
        return postData;
    case GET_SINGLE_POST:
        return postData;
    default:
        return state;
    }
};

export default BlogPostsReducer;
