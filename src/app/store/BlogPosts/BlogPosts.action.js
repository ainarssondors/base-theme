export const GET_POSTS = 'GET_POSTS';
export const GET_SINGLE_POST = 'GET_SINGLE_POST';
export const GET_BLOG_CATEGORY = 'GET_BLOG_CATEGORY';

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

export const getSingleBlogPost = postData => ({
    type: GET_SINGLE_POST,
    postData
});

export const getBlogCategory = categoryData => ({
    type: GET_BLOG_CATEGORY,
    categoryData
})