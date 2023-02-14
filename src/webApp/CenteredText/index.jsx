import React from 'react';

function CenteredText({ title, children }) {
    return (
        <section className='centered'>
            <h2>{title}</h2>
            {children}
        </section>
    );
}

export default CenteredText;
