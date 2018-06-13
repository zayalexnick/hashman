import React from 'react';
import { Container, Title, Subes } from "./styles";

export default ({ title, subes, type, children }) => (
    <Container>
        { title ? <Title type={type}>{title}</Title> : null }
        { subes ? (
            <Subes>
                { subes.map((sub, index) => sub) }
            </Subes>
        ) : null }
        { children }
    </Container>
);