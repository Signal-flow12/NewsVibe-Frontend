import { useEffect, useState } from "react";

const Post = () => {

    const [ post, setPost ] = useState([])

const URL = 'http://localhost:4000/';

const getPost = async () => {
    try{
         const response = await fetch(URL)
         const  allPost = await response.json()
         setPost(allPost)
    }catch(err){
        console.log(err)
    }
}

useEffect(() => {
    getPost();
}, [])

console.log(`There are ${post.length} people available to render`)

const loaded = () => {
    return post?.map((singlePost) => {
        return (
          <div key={singlePost._id}>
            <h1>{singlePost.text}</h1>
            <h1>{singlePost.verified === true ? <span>&#10004;</span> : null}</h1>
            <h1>{singlePost.image}</h1>
            <hr />
          </div>
        );
      });
    };

    const loading = () => (
        <>
          <h1>
            Loading...
          </h1>
        </>
      );
    
  
    return (
        <>
        {post && post.length ? loaded() : loading() }
        </>
    )
}

 export default Post;