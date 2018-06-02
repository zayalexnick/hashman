import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Sidebar from '~/modules/Sidebar';
import Topbar from '~/modules/Topbar';

import GlobeIcon from 'react-icons/lib/fa/globe';

type Props = {

};

@hot(module)
export default class extends Component<Props> {
    render() {
        return (
            <main>
                <Sidebar
                    logo={{ to: '/', label: 'Hashman' }}
                    navigate={[
                        {
                            to: '/',
                            icon: GlobeIcon,
                            label: 'Фермы'
                        }
                    ]}
                />
                <Topbar />
            </main>
        );
    }
}