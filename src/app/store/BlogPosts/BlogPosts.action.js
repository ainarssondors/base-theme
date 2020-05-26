export const GET_POSTS = 'GET_POSTS';
export const GET_SINGLE_POST = 'GET_SINGLE_POST';

const getBlogPosts = postData => {
    return ({
        type: GET_POSTS,
        postData
    });
}

const getSingleBlogPost = postData => {
    return ({
        type: GET_SINGLE_POST,
        postData
    })
}

export {
    getBlogPosts,
    getSingleBlogPost
};