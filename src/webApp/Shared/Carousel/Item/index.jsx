import React, { Children, useState } from 'react';

function Item({
    onClick,
    selected = false,
    yRotation = 0,
    radius = 0,
    children,
    back,
    className,
    distanceFromCamera,
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const forward = 500;
    return (
        <li className={"project " + className + " " + (selected ? "selected " : "") + (selected && isFlipped ? "flipped " : "")} style={{
            transform: 'rotateY(' + yRotation + 'deg) translateZ(' + (selected && isFlipped ? forward + radius : radius) + 'px) rotateX(' + (selected && isFlipped ? '-180deg' : '0deg') + ')',
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
