import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component
{
    render()
    {
        return (
            <main>
                <Link to="/auth/signin">Signin</Link>
            </main>
        );
    }
}