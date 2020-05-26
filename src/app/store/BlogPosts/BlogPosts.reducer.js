import { GET_POSTS } from './BlogPosts.action';

const initialState = [];

const BlogPostsReducer = (state = initialState, action) => {
    const { type, postData } = action;

    switch (type) {
    case GET_POSTS:
        return postData;
    default:
        return state;
    }
};

export default BlogPostsReducer;
