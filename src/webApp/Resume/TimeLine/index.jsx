import React, { Children, isValidElement } from 'react';
import { useState } from 'react';
import Event from './Event';

function TimeLine({ startYear = 2009, children }) {
    const [selected, setSelected] = useState(0);
    const totalYears = new Date().getFullYear() - startYear;
    const tabs = [];
    for (let i = children.length; i--; i > -1) {
        tabs.push(<li key={children[i].props.title} className={i === selected ? "active" : ""} style={{ gridColumn: 'span ' + children[i].props.years }}
            onClick={() => {
                setSelected(i);
            }}>
            <div className="start">{children[i].props.startYear}</div>
            <span></span>
        </li>);
    }
    return (
        <div className='timeline'>
            <ul style={{ gridTemplateColumns: 'repeat(' + totalYears + ', 1fr)' }}>
                {tabs}
            </ul>
            {children[selected]}
        </div>
    );
}

export { TimeLine, Event };
