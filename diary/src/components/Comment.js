import React from 'react';

const Comment = ({children, key}) => (<div>{children.uid + ': ' + children.commentBody}</div>)


export default Comment;