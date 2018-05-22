import React from 'react';
import Main from 'scenes/Main';
import Auth from 'scenes/Auth';
import SignIn from 'scenes/Auth/SignIn';

type Routes = {
    path: string,
    component: React.Component,
    routes?: Array<Routes>
}

const routes: Array<Routes> = [
    {
        path: "/",
        component: Main,
        routes: {

        }
    },
    {
        path: "/auth",
        component: Auth,
        routes: [
            {
                path: '/auth/signin',
                component: SignIn
            }
        ]
    }
];

export default routes;