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
                <div className='image'>
                    <img src={'/assets/' + images[selectedImage]} alt="" />
                </div>
                <div className='text'>
                    <h3>{title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                    <a href={webLink} target='_blank'>View The Project</a>
                </div>
            </div>
            <div className='back'><img src={'/assets/' + images[selectedImage]} alt="" /></div>
        </li>
    );
}

export default Project;
