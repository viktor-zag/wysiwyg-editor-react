import React from 'react';

const LinkComponent = (props) => {
    console.log("hit Link component: ",props)
    const { url, label } = props.contentState.getEntity(props.entityKey).getData();

    return(
        <a data-offset-key={props.offsetKey} className="formatted_link" href={url}>{label || props.children}</a>
    ) 
}

export default LinkComponent;
