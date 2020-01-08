import React from 'react';

const renderContentHelper = (contentRender) => {
    switch (typeof contentRender) {
        case "function":
            return contentRender();
        case "string":
            return <div dangerouslySetInnerHTML={{__html: contentRender}}/>;
        case "object":
            return contentRender instanceof Element ?
                <div dangerouslySetInnerHTML={{__html: contentRender.outerHTML}}/> :
                contentRender;
        case "undefined":
            return '';
        default:
            return contentRender;
    }
};

export {renderContentHelper}
