import React from 'react';
import Auth from 'scenes/Auth';
import Login from 'modules/Login';

type Routes = {
    path: string,
    component?: React.Component,
    routes?: Array<Routes>
}

const routes: Array<Routes> = [
    {
        path: '/',
        component: null,
    },
    {
        path: '/auth',
        component: Auth,
        routes: [
            {
                path: '/auth/login',
                component: Login
            }
        ]
    }
];

export default routes;