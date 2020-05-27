import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { changeNavigationState } from 'Store/Navigation';
import { updateMeta } from 'Store/Meta';
import { BlogPostsDispatcher } from 'Store/BlogPosts';

import BlogPage from './BlogPage.component';

export const CATEGORY_BLOG_TYPE = 'category';

export const mapStateToProps = state => ({
    headerState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState
});

export const mapDispatchToProps = dispatch => ({
    getBlogCategory: options => BlogPostsDispatcher.getBlogCategory(dispatch, options),
    getBlogPosts: options => BlogPostsDispatcher.getBlogPosts(dispatch, options),
    getSingleBlogPost: options => BlogPostsDispatcher.getSingleBlogPost(dispatch, options),
    changeHeaderState: state => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch),
    updateMeta: meta => dispatch(updateMeta(meta))
});

export class BlogPageContainer extends PureComponent {
    static propTypes = {
        updateBreadcrumbs: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const { match: { params: { blogType, id } } } = props;

        this.state = {
            posts: [],
            id,
            blogType,
            categoryData: {}
        };
    }

    async componentDidMount() {
        const {
            updateMeta, updateBreadcrumbs, getBlogPosts, getSingleBlogPost, getBlogCategory
        } = this.props;
        const { id, blogType } = this.state;

        console.log(this.props);

        updateMeta({ title: __('Blog') });

        if (blogType === CATEGORY_BLOG_TYPE) {
            const { items: posts } = await getBlogPosts({ filter: [{ key: 'category_id', value: id, condition: 'eq' }] });

            const categoryData = await getBlogCategory(id);
            const { title, category_url } = categoryData;

            updateBreadcrumbs([{ name: title, url: category_url }]);

            return this.setState({ posts, categoryData });
        }

        const post = await getSingleBlogPost(id);
        const { categories, title, post_url } = post;

        const { category_url, title: categoryTitle } = categories[0] || {};
        const postBreadcrumbs = [{ name: title, url: post_url }];

        if (category_url && categoryTitle) postBreadcrumbs.push({ name: categoryTitle, url: category_url });

        // todo rework breadcrumbs for single post
        updateBreadcrumbs(postBreadcrumbs);

        return this.setState({ posts: [post] });
    }

    render() {
        return (
            <BlogPage
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPageContainer);
