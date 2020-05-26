import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Html from 'Component/Html';
import Image from 'Component/Image';
import Link from 'Component/Link';
import ContentWrapper from 'Component/ContentWrapper';
import { CATEGORY_BLOG_TYPE } from 'Route/BlogPage/BlogPage.container';

import './BlogPage.style';



export default class BlogPage extends PureComponent {
    static propTypes = {
    };

    renderSinglePost(posts) {
        console.log('##########');
        const { featured_image, content, title } = posts[0];

        return (
            <div block="BlogPage" elem="SinglePost">
                <h3 block="BlogPage" elem="Header">{ title }</h3>
                <Image src={ featured_image } mix={ { block: 'BlogPage', elem: 'Image' } } />
                <Html content={ content } />
            </div>
        )
    }

    renderPosts(posts) {
        posts.map(({ content }) => content && <Html content={ content } />);

        const filteredPosts = posts.filter(({ short_content }) => short_content);

        return filteredPosts.map(({ short_content, featured_image, title, post_url }) => (
            <div block="BlogPage" elem="Post">
                <Link block="BlogPage" elem="Header" to={ post_url }>{ title }</Link>
                <Image src={ featured_image } mix={ { block: 'BlogPage', elem: 'Image' } } />
                <Html content={ short_content } />
            </div>
        ));
    }

    render() {
        const { posts, blogType } = this.props;

        // todo add loaders
        if (!posts.length) return null;

        return (
            <main block="BlogPage" aria-label="Blog Page">
                <ContentWrapper
                  wrapperMix={ { block: 'BlogPage', elem: 'Wrapper' } }
                  label="Blog page details"
                >
                    { blogType === CATEGORY_BLOG_TYPE
                        ? (
                            <div block="BlogPage" elem="ListWrapper">
                                { this.renderPosts(posts) }
                            </div>)
                        : this.renderSinglePost(posts)
                    }
                </ContentWrapper>
            </main>
        );
    }
}
