import React, { useState, useEffect } from 'react';
import CenteredText from '../CenteredText';
import { TimeLine, Event } from './TimeLine';

function Resume() {
    const startYear = 2009;
    const totalYears = new Date().getFullYear() - startYear;
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        window.addEventListener(
            "animationComplete",
            (e) => {
                setIsLoading(false);
            },
            false
        );
    }, [])
    return (
        <>
            <CenteredText title="Work History">{totalYears} years of professional software engineering experience</CenteredText>
            {/*
            <h3>Skills</h3>
            <ul>
                <li>Proficient in JavaScript, Java, C#, HTML, CSS, and PHP</li>
                <li>Experience with React, Jquery, PIXI, Phaser, and RequireJS</li>
                <li>Proficient in using NPM, GIT, FIGMA, Procreate, WebPack, and ES-Build</li>
                <li>Experience with CSS preprocessors (Less and Sass) and version control software (GIT, SVN, TFS)</li>
                <li>Familiarity with Open AI APIs and Chat-GPT</li>
                <li>Experience with Object Oriented Programming and common design patterns</li>
                <li>Familiar with Sublime Text, Visual Studio, Adobe Creative Suite, Eclipse, Android Studio, and Unity</li>
                <li>Experience working with popular content management systems</li>
                <li>Expertise in building native Android apps</li>
            </ul>
    */}
            <TimeLine startYear={startYear} className={isLoading ? '' : 'loaded'}>
                <Event startYear={2018} endYear={new Date().getFullYear()} years={Math.floor(new Date().getFullYear() - 2018)} title="Senior Software Engineer, Intuit Mailchimp (Apr 2018-Present)">
                    <p>Collaborate with cross-functional teams and contribute to the design, development, and implementation of new features.</p>
                </Event>
                <Event startYear={2014} endYear={2018} years={4} title="Senior Presentation Layer Engineer, Razorfish (Nov 2014-2018)">
                    <p>While working at Razorfish, a leading digital agency, I was assigned to the Mercedes account where I contributed to a variety of projects for their marketing site. However, my most significant role was in building a cutting-edge web app that enabled Mercedes drivers to unlock and start their vehicles. As part of the team, I helped set up the React Flux architecture and developed a design system that could be used to create pages within the app. Later, I transitioned to work on product features for the app. In addition, I played a key role in developing the native Android version of the app alongside other team members. This role allowed me to expand my skills and expertise in both frontend and mobile app development while working on groundbreaking projects for a major brand. I even got to work on some emerging technologies like VR during my time here.</p>
                </Event>
                <Event startYear={2012} endYear={2014} years={2} title="Senior Developer, BFG Interactive (June 2012-Sept 2014)">
                    <p>At BFG, an advertising agency, I worked on projects for the R.J. Reynolds Tobacco Company. One of our biggest projects was developing a web app that served as a social network for their customers, where they could win prizes and learn about new products. As a frontend developer, I was responsible for building promotional games for the site and working closely with designers to ensure that the games and the overall site were visually stunning and engaging. This job was a perfect fit for me, as it allowed me to apply my skills and training in game development to a real-world scenario, and work alongside talented designers on projects that were tailored to my strengths.</p>
                </Event>

                <Event startYear={2009} endYear={2012} years={3} title="Front-End Developer, Savannah College of Art and Design (June 2009-June 2012)">
                    <p>At the Savannah College of Art and Design, I started as a Flash developer and later became a frontend engineer. I built image galleries, 3D virtual tours, and customizable video players for college events like the Savannah Film Festival and SCAD Fashion Show. I worked with ActionScript 3, JavaScript, HTML, CSS, PHP, and ColdFusion, collaborating closely with designers to create visually stunning projects that were also engaging and interactive.</p>
                </Event>
            </TimeLine>
        </>
    );
}

export default Resume;
