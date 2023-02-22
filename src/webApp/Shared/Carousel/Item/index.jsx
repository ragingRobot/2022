import React, { Children, useState } from 'react';

function Item({
    onClick,
    selected = false,
    yRotation = 0,
    radius = 0,
    children,
    back,
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const forward = 325;
    return (
        <li className={"project " + (selected ? "selected " : "") + (isFlipped ? "flipped " : "")} style={{
            transform: 'rotateY(' + yRotation + 'deg) translateZ(' + (selected && isFlipped ? radius + forward : radius) + 'px) rotateX(' + (selected && isFlipped ? '-180deg' : '0deg') + ')',
        }} onClick={() => {
            if (selected) {
                setIsFlipped(!isFlipped);
            } else if (onClick) {
                setIsFlipped(false);
                onClick();
            }
        }}>
            <span className='top'></span>
            <div className='front'>
                {children}
            </div>
            <div className='back'>{back}</div>
        </li>
    );
}

export default Item;
