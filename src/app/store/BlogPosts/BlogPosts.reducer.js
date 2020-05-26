const updateCartTotals = () => {
    return 'lol';
};

const BlogPostsReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case GET_POSTS:
        return updateCartTotals();

    default:
        return state;
    }
};

export default BlogPostsReducer;
