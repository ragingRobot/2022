import React from 'react';

function Event({ className, title, children, startYear, endYear }) {
    return (
        <div className={"event " + className}>
            <div className='content'>
                <h3>{title}</h3>
                {children}
            </div>
        </div>
    );
}

export default Event;
