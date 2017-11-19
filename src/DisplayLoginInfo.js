import React from 'react';
import HeaderInfoThing from './HeaderInfoThing';

const DisplayLoginInfo = (props) => {
    return (
        <div>
            <h1>The Bridesmaids ToDo List!</h1>
            <HeaderInfoThing title="username" content={props.username} />
            <HeaderInfoThing title="password" content={props.password} />
            <HeaderInfoThing title="token" content={props.token} />

            {/* <h2>username</h2>
            <span>{props.username}</span>
            <h2>password</h2>
            <span>{props.password}</span>
            <h2>token</h2>
            <span>{props.token}</span> */}
        </div>
    );
};

export default DisplayLoginInfo;
