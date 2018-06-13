import React from 'react';
import { Wrapper, Text } from './styles';

export default ({ children }) => (
    <Wrapper>
        <Text>{ children }</Text>
    </Wrapper>
);