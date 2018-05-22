import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from "./SignIn";

export default (props) => {
    return (
        <div>
            <Route path="/auth/signin" component={SignIn} />
        </div>
    );
};