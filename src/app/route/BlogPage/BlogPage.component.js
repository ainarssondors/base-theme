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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Html from 'Component/Html';
import ContentWrapper from 'Component/ContentWrapper';

export default class CartPage extends PureComponent {
    static propTypes = {
    };

    render() {
        const { posts } = this.props;

        return (
            <main block="BlogPage" aria-label="Blog Page">
                <ContentWrapper
                  wrapperMix={ { block: 'BlogPage', elem: 'Wrapper' } }
                  label="Blog page details"
                >
                    <div block="BlogPage" elem="Static">
                        { posts.map(({ content }) => <Html content={ content } />)}
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}
