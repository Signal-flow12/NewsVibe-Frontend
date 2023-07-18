import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import * as React from 'react';

const Post = () => {
   
const [post, setPost] = useState([])
const [newPost, setnewPost]= useState({
    text: "",
    image: "",
})

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

//create new post function sends to mongo 
const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost)
        })
        getPost()
        setnewPost({ text: "", image: "" })

    }catch(err){
        console.log(err)
    }
}

//form handle local change function
const handleChange = (e) => {
    console.log(e.target);
    setnewPost((previousFormState) => ({
        ...previousFormState,
        [e.target.name]: e.target.value
    }))
}


//console.log(`There are ${post.length} Post available to render`)


const loaded = () => {
    return (
      <div className="feed">
        {post?.map((singlePost) => (
          <div key={singlePost._id} className="post-container">
            <div className="post">
              <Link to={`/${singlePost._id}`}>
                <h1>{singlePost.text}</h1>
                <img src={singlePost.image} alt="image" />
              </Link>
              <hr />
            </div>
          </div>
        ))}
      </div>
    );
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
        <div className="newPost">
            <h2>Create a Vibe</h2>
            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newPost.text}
                        name="text"
                        placeholder="Enter your vibe here"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={newPost.image}
                        name="image"
                        placeholder="Image"
                        onChange={handleChange}
                    />
                <input type="submit" value="Vibe" />
            </form>
        </div>
        {post && post.length ? loaded() : loading() }
        </>
    )
}

 export default Post;