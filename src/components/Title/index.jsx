import React from 'react';
import { Wrapper, Text, Sub, Right } from './styles';

export default ({ children, sub, right }) => (
    <Wrapper>
        <Text>
            { children }
            { sub ? <Sub type={sub.type}>{ sub.label }</Sub> : null }
        </Text>
        { right ? <Right>{ right }</Right> : null }
    </Wrapper>
);