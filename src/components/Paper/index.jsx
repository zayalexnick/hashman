import React from 'react';
import LoaderContainer from '~/components/Loader';
import { Container, Title, Subes } from "./styles";

export default ({ title, subes, style, type, children, loading }) => (
    <Container type={type} style={style}>
        <LoaderContainer loading={loading}>
            { title ? <Title type={type}>{title}</Title> : null }
            { subes ? (
                <Subes>
                    { subes.map((sub, index) => sub) }
                </Subes>
            ) : null }
            { children }
        </LoaderContainer>
    </Container>
);