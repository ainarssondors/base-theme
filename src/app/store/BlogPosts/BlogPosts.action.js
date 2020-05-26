export const GET_POSTS = 'GET_POSTS';

/**
 * Update product list with new list (rewrite if already exists).
 * @param  {Array<Object>} items List of products returned from fetch
 * @param  {Number} totalItems Total number of products in this filter
 * @return {void}
 */
export const getBlogPosts = postData => ({
    type: GET_POSTS,
    postData
});
