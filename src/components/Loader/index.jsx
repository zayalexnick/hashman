import React from 'react';
import { Wrapper, Loader } from "./styles";

export default ({ loading, children }) => (
    <Wrapper>
        <Loader loading={loading} />
        { children }
    </Wrapper>
);