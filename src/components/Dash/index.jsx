import React from 'react';
import * as Elements from './styles';

export default ({ icon, title, backgroundHeader, colorHeader, children }) => (
    <Elements.Dash>
        <Elements.Header backgroundHeader={backgroundHeader} colorHeader={colorHeader}>
            <Elements.Title>{title}</Elements.Title>
            <Elements.Icon>{icon}</Elements.Icon>
        </Elements.Header>
        <Elements.Body>{children}</Elements.Body>
    </Elements.Dash>
);