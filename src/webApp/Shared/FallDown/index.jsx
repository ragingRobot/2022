import React, { Children, useEffect, useState } from 'react';
function FallDown({ isLoading, children }) {
    return (

        <div className={'fallDown ' + (isLoading ? "loading " : "")}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return <div className="fallItem " style={{ transitionDelay: .5 * index + 's'}}> {
                        React.cloneElement(child, {})}
                    </div>;
                }
                return child;
            })}
        </div>
    );
}

export default FallDown;
