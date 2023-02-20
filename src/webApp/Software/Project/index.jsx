import React, { useState } from 'react';

function Project({
    title,
    description,
    androidLink,
    githubLink,
    images,
    thumb,
    webLink,
    style,
    onClick,
    selected = false,
    yRotation = 0,
    radius = 0,
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    return (
        <li className={"project " + (selected ? "selected " : "") + (isFlipped ? "flipped " : "")} style={{
            transform: 'rotateY(' + yRotation + 'deg) translateZ(' + radius + 'px) rotateX(' + (selected && isFlipped ? '-180deg' : '0deg') + ')',
        }} onClick={() => {
            if (selected) {
                setIsFlipped(!isFlipped);
            } else if (onClick) {
                onClick();
            }
        }}>
            <span className='top'></span>
            <div className='front'>
                <div className='image'>
                    <img src={'/assets/' + images[selectedImage]} alt="" />
                </div>
                <div className='text'>
                    <h3>{title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </div>
            <div className='back'>Test</div>
        </li>
    );
}

export default Project;
