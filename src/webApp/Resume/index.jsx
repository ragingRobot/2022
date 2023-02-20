import React from 'react';
import CenteredText from '../CenteredText';
import { TimeLine, Event } from './TimeLine';

function Resume() {
    const startYear = 2009;
    const totalYears = new Date().getFullYear() - startYear;
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
            <TimeLine startYear={startYear}>
                <Event startYear={2018} endYear={new Date().getFullYear()} years={Math.floor(new Date().getFullYear() - 2018)} title="Senior Software Engineer, Intuit Mailchimp (Apr 2018-Present)">
                    <p>Collaborate with cross-functional teams and contribute to the design, development, and implementation of new features.</p>
                </Event>
                <Event startYear={2014} endYear={2018} years={4} title="Senior Presentation Layer Engineer, Razorfish (Nov 2014-2018)">
                    <p>Worked on mbusa.com and the Mercedes Me web app and native Android app. As the lead developer for the web app, responsible for managing other front-end developers, creating tasks in JIRA, giving time estimates, determining feasibility of new features, making decisions on the best way to implement new features, and presenting work to the team at the end of sprints.</p>
                </Event>
                <Event startYear={2012} endYear={2014} years={2} title="Senior Developer, BFG Interactive (June 2012-Sept 2014)">
                    <p>Responsible for creating websites, mobile promotions, and web-based games, primarily using JavaScript, C#, HTML, and CSS for the Camel Cigarettes website.</p>
                </Event>

                <Event startYear={2009} endYear={2012} years={3} title="Front-End Developer, Savannah College of Art and Design (June 2009-June 2012)">
                    <p>Worked on a team that created the college's website and micro sites, using JavaScript, Flash, HTML, CSS, PHP, and ColdFusion.</p>
                </Event>
            </TimeLine>
        </>
    );
}

export default Resume;
