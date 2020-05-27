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

    getBlogCategory(id) {
        return new Field('blogCategory')
            .addArgument('id', 'String', id)
            .addFieldList(['title', 'content', 'category_url']);
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
            .addFieldList(['content', 'featured_image', 'title', 'post_url'])
            .addField(new Field('categories').addFieldList(['title', 'category_url']));
    }

    getPostItems() {
        return new Field('items')
            .addFieldList(['short_content', 'featured_image', 'title', 'post_url']);
    }
}

export default new BlogQuery();
