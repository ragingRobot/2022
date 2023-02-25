import React, { Children, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TbCircleDashed } from "react-icons/tb";
function Carousel({ isLoading, children, radius = 800, distanceFromCamera = 100 }) {
    const [selected, setSelected] = useState(0);
    return (

        <>
            {isLoading && <div className='projects-container loading'>
                <strong>Loading...</strong>
                <TbCircleDashed />
            </div>}
            {!isLoading && <div className='projects-container'>
                <button style={children.length === 0 ? { transform: 'translateZ(900px)' } : null} className="prev" onClick={() => {
                    if (selected > 0) {
                        setSelected(selected - 1);
                    } else {
                        setSelected(children.length - 1)
                    }
                }}><FaChevronLeft /></button>
                <ul className='projects' style={{ transform: 'translateZ(-' + (radius + distanceFromCamera) + 'px)  translateY(100px) rotateY(' + (-selected * (360 / children.length)) + 'deg)' }}>
                    {React.Children.map(children, (child, index) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, {
                                selected: index === selected % children.length,
                                yRotation: (index * (360 / children.length)),
                                distanceFromCamera,
                                radius: radius,
                                onClick: () => {
                                    setSelected(index);
                                }
                            });
                        }
                        return child;
                    })}
                </ul>
                <button style={children.length === 0 ? { transform: 'translateZ(900px)' } : null} className="next" onClick={() => {
                    if (selected < children.length - 1) {
                        setSelected(selected + 1);
                    } else {
                        setSelected(0);
                    }
                }}><FaChevronRight /></button>
            </div>}
        </>
    );
}

export default Carousel;
