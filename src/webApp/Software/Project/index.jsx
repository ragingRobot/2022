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
}) {
    const [selectedImage, setSelectedImage] = useState(0);
    return (
        <li className={"project " + (selected ? "selected" : "")} style={style} onClick={onClick}>
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
