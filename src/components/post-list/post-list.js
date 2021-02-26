import React from 'react';

import './post-list.css';

import PostListItem from '../post-list-item';

const PostList = ({posts}) => {

    const elements = posts.map( (item) => { 
        const {id, ...itemPrors} = item;

        return (               
            <PostListItem key={id} {...itemPrors} />                        
        );
    });    

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
};

export default PostList;