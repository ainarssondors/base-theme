import { Field } from 'Util/Query';

export class BlogQuery {
    constructFilters(filter) {
        const a = filter.reduce((acc, { key, value, condition }) => {
            return {
                ...acc,
                [key]: { [condition]: value }
            };
        }, {});
        console.log(a);
    }

    getBlogPosts({ pageSize, currentPage, filter }) {
        const query = new Field('blogPosts')
            .addField(this.getPostItems());

        if (pageSize) query.addArgument('pageSize', 'Int', pageSize);
        if (currentPage) query.addArgument('currentPage', 'Int', currentPage);
        if (filter) query.addArgument('filter', 'BlogPostsFilterInput', this.constructFilters(filter));

        return query;
    }

    getPostItems() {
        return new Field('items')
            .addField('content');
    }

    getSingleBlogPost(id) {
        return new field('blogPost')
            .addArgument('id', 'ID!', id)
            .addField('content');
    }
}

export default new BlogQuery();
