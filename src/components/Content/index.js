import React from 'react';
import Content from './styles';
import { Loader, LoaderWrapper } from "components/Loader";

export default ({ loading, children }) => {
    if (loading)
        return (
            <Content>
                <LoaderWrapper visible full>
                    <Loader />
                </LoaderWrapper>
            </Content>
        )

    return (
        <Content>
            { children }
        </Content>
    )
};