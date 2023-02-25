import React, { useEffect, useState } from 'react';
import CenteredText from '../CenteredText';
import Carousel from '../Shared/Carousel';
import Item from '../Shared/Carousel/Item';
function Software() {
  const [work, setWork] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    window.addEventListener(
      "animationComplete",
      (e) => {
        setIsLoading(false);
        fetch('/assets/json/work.json')
          .then((response) => response.json())
          .then((data) => {
            setWork(data.work);
          });
      },
      false
    );
  }, []);
  return (
    <div className='project-page'>
      <CenteredText title="Software Projects">
        <p>
          I am passionate about creating interactive experiences that leave a lasting impression. I believe that good software is not just functional, but also feels great to use. That's why I focus on creating user experiences that are not only seamless, but also engaging and enjoyable. Here, you'll find a mix of projects from my day job and some of my experimental side ventures. From practical applications to quirky experiments, each project has been crafted with care to deliver the best possible user experience.
        </p>
      </CenteredText>
      <Carousel isLoading={isLoading} radius={1100}>
        {work.map((project) => {
          return <Item
          className="softwareproject"
            back={<img src={'/assets/' + project.images[0]} alt="" />}
          >
            <>
              <div className='image'>
                <img src={'/assets/' + project.images[0]} alt="" />
              </div>
              <div className='text'>
                <h3>{project.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
                <a href={project.webLink} target='_blank'>View The Item</a>
              </div>
            </>
          </Item>;
        })}
      </Carousel>
    </div>
  );
}

export default Software;
