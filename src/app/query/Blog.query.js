import { Field } from 'Util/Query';

export class BlogQuery {
    constructFilters(filter) {
        return filter.reduce((acc, { key, value, condition }) => {
            return {
                ...acc,
                [key]: { [condition]: value }
            };
        }, {});
    }

    getBlogPosts({ pageSize, currentPage, filter }) {
        const query = new Field('blogPosts')
            .addField(this.getPostItems());

        if (pageSize) query.addArgument('pageSize', 'Int', pageSize);
        if (currentPage) query.addArgument('currentPage', 'Int', currentPage);
        if (filter) query.addArgument('filter', 'BlogPostsFilterInput', this.constructFilters(filter));

        return query;
    }

    getSingleBlogPost(id) {
        return new Field('blogPost')
            .addArgument('id', 'String!', id)
            .addFieldList(['content', 'featured_image', 'title']);
    }

    getPostItems() {
        return new Field('items')
            .addFieldList(['short_content', 'featured_image', 'title', 'post_url']);
    }
}

export default new BlogQuery();
