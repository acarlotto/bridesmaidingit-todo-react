import React from 'react';

const HeaderInfoThing = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <span>{props.content}</span>
        </div>
    );
};

export default HeaderInfoThing;