import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { changeNavigationState } from 'Store/Navigation';
import { updateMeta } from 'Store/Meta';
import { BlogPostsDispatcher } from 'Store/BlogPosts';

import BlogPage from './BlogPage.component';

export const mapStateToProps = state => ({
    headerState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState
});

export const mapDispatchToProps = dispatch => ({
    getBlogPosts: options => BlogPostsDispatcher.getBlogPosts(dispatch, options),
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

    state = { posts: [], categoryId: null };

    async componentDidMount() {
        const { updateMeta, getBlogPosts, match: { params: { categoryId } } } = this.props;

        updateMeta({ title: __('Blog') });

        const { items } = await getBlogPosts({ filter: [{ key: 'category_id', value: categoryId, condition: 'eq' }] });

        this.setState({ posts: items, categoryId });
    }

    render() {
        const { posts } = this.state;

        return (
            <BlogPage
             posts={ posts }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPageContainer);
