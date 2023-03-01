import React, { useEffect, useState } from 'react';
import CenteredText from '../CenteredText';
import Carousel from '../Shared/Carousel';
import Item from '../Shared/Carousel/Item';

function Art() {

  const [work, setWork] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('/assets/json/art.json')
      .then((response) => response.json())
      .then((data) => {
        setWork(data.work);
      });
    window.addEventListener(
      "animationComplete",
      (e) => {
        setIsLoading(false);
      },
      false
    );
  }, [])
  return (
    <div className='project-page'>
      <CenteredText title="Art Projects">
        <p>
          I'm excited to share my creations with you. On this page, you'll find a collection of my design and illustration works, both digital and traditional. From playful digital pieces to rich watercolor paintings, each work showcases my love for vibrant hues and dynamic lines. Whether you're a fan of digital art or a lover of traditional mediums, I hope you'll find something here that speaks to you.
        </p>
      </CenteredText>
      <Carousel items={work} radius={1100} isLoading={isLoading}>
        {work.map((project) => {
          return <Item
            className={"artwork " + project.format}
            back={project.images[0].indexOf(".mp4") > -1 ? <video src={'/assets/' + project.images[0]} autoplay="true" playsinline="true" muted="true" loop="true" /> : <img src={'/assets/' + project.images[project.images.length - 1]} alt="" />}
          >
            <div className='art-container'>
              <div className='image'>{project.images[0].indexOf(".mp4") > -1 ? <video src={'/assets/' + project.images[0]} autoplay="true" playsinline="true" muted="true" loop="true" /> : <img src={'/assets/' + project.images[0]} alt="" />}</div>
              <div className='info'>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          </Item>;
        })}
      </Carousel>
    </div>
  );
}

export default Art;
