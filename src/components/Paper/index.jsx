import React from 'react';
import { Container, Title } from "./styles";

export default ({ title, children }) => (
    <Container>
        { title ? <Title>{title}</Title> : null }
        { children }
    </Container>
);