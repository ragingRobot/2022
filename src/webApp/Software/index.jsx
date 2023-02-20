import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import CenteredText from '../CenteredText';
import Project from './Project';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Software() {
  const [work, setWork] = useState([]);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    fetch('/assets/json/work.json')
      .then((response) => response.json())
      .then((data) => {
        setWork(data.work);
      });
  }, [])
  const radius = 800;
  return (
    <div className='project-page'>
      <CenteredText title="Software Projects">
        <p>
          I am passionate about creating interactive experiences that leave a lasting impression. I believe that good software is not just functional, but also feels great to use. That's why I focus on creating user experiences that are not only seamless, but also engaging and enjoyable. Here, you'll find a mix of projects from my day job and some of my experimental side ventures. From practical applications to quirky experiments, each project has been crafted with care to deliver the best possible user experience.
        </p>
      </CenteredText>
      <div className='projects-container'>
        <button style={work.length === 0 ? { transform: 'translateZ(900px)' } : null} className="prev" onClick={() => {
          setSelected(selected - 1);
        }}><FaChevronLeft /></button>
        <ul className='projects' style={{ transform: 'translateZ(-800px)  translateY(100px) rotateY(' + (-selected * (360 / work.length)) + 'deg)' }}>
          {work.map((project, index) => {
            return <Project {...project} selected={index === selected % work.length} style={{
              transform: 'rotateY(' + (index * (360 / work.length)) + 'deg) translateZ(' + radius + 'px)',
            }} onClick={() => {
              setSelected(index);
            }} />;
          })}
        </ul>
        <button style={work.length === 0 ? { transform: 'translateZ(900px)' } : null} className="next" onClick={() => {
          setSelected(selected + 1);
        }}><FaChevronRight /></button>
      </div>
    </div>
  );
}

export default Software;
