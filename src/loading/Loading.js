import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return <Spinner className='w-25 mx-auto' animation="grow" />
};

export default Loading;