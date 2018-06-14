import React from 'react';
import GlobeIcon from 'react-icons/lib/fa/globe';
import EventsIcon from 'react-icons/lib/io/android-alert';
import IncomeIcon from 'react-icons/lib/io/cash';

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
    },
    {
        to: '/income',
        icon: IncomeIcon,
        label: 'Прибыль'
    },
    {
        to: '/events',
        icon: EventsIcon,
        label: 'Уведомления'
    },
];

export default navigation