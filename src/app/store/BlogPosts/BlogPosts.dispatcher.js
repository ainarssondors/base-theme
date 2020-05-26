/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { fetchQuery } from 'Util/Request';
import { BlogQuery } from 'Query';
import { showNotification } from 'Store/Notification';

export class BlogPostsDispatcher {
    getBlogPosts(dispatch, options) {
        return fetchQuery(BlogQuery.getBlogPosts(options)).then(
            ({ blogPosts }) => blogPosts,
            ([{ message }]) => dispatch(showNotification('error', message))
        );
    }

    getSingleBlogPost(dispatch, options) {
        return fetchQuery(BlogQuery.getSingleBlogPost(options)).then(
            ({ blogPost }) => blogPost,
            ([{ message }]) => dispatch(showNotification('error', message))
        );
    }
}

export default new BlogPostsDispatcher();
