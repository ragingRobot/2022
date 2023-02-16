import React from 'react';

function Event({ className, title, children }) {
    return (
        <div className={"event " + className}>
            <div className='content'>
                {title}
                {children}
            </div>
        </div>
    );
}

export default Event;
