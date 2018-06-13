import React from 'react';
import GlobeIcon from 'react-icons/lib/fa/globe';

type Item = {
    icon: React.Component,
    label: string,
    to: 'string'
};

const navigation: Array<Item> = [
    {
        to: '/servers',
        icon: GlobeIcon,
        label: 'Фермы'
    },
    {
        to: '/rigs',
        icon: GlobeIcon,
        label: 'Устройства'
    }
];

export default navigation