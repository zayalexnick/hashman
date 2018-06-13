import React from 'react';
import { Wrapper, Loader } from "./styles";

export default ({ loading, children, transparent }) => (
    <Wrapper>
        <Loader loading={loading} transparent={transparent} />
        { children }
    </Wrapper>
);