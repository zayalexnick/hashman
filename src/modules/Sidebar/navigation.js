import Globe from 'react-icons/lib/io/android-globe';
import LogoutIcon from 'react-icons/lib/io/log-out';
import EventsIcon from 'react-icons/lib/io/android-alert';

export default [
    {
        to: '/servers',
        label: 'Фермы',
        icon: Globe
    },
    {
        to: "/rigs",
        label: "Устройства",
        icon: Globe
    },
    {
        to: "/events",
        label: "Уведомления",
        icon: EventsIcon
    },
    {
        to: "/auth/logout",
        label: "Выход",
        icon: LogoutIcon
    }
]