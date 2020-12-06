import React from 'react';

function PostCard(props) {
  return (
    <h1>{props.title}</h1>
    // <div className='container post-container w-75 p-3 border rounded'>
    //   <div className='container title-container'>
    //     <a href='/posts/<%= post[i]._id %>'>
    //       <h1>{props.title}</h1>
    //     </a>
    //     <p>
    //       By
    //       <a href='/users/<%= post[i].user._id %>'>
    //         <span className='font-weight-bold'>
    //           &lt;%= post[i].user.username %&gt;
    //         </span>
    //       </a>
    //       on
    //       <span>&lt;%= post[i].date%&gt;</span>
    //     </p>
    //   </div>
    //   <div className='image-container'>
    //     <a href='/posts/<%= post[i]._id %>'>
    //       <img src='' className='post-image' alt='' />
    //     </a>
    //     <p>&lt;%= post[i].caption%&gt;</p>
    //   </div>
    // </div>
  );
}

export default PostCard;
