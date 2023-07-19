import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import * as React from 'react';
import { Button } from "@mui/material";
import PostForm from "../forms/PostForm";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Post = () => {
   
const [post, setPost] = useState([])
const [newPost, setnewPost]= useState({
    text: "",
    image: "",
})

const URL = 'https://newsvibe.onrender.com/';

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
                <Link to={`/${singlePost._id}`} style={{ textDecoration: 'none' }}>
                    <h2 className="postText" id="title">{singlePost.title}</h2>
                    <h4 className="postText">{singlePost.text}</h4>
                    <img src={singlePost.image} alt="image" />
                </Link>
                <div className="comments-likes"><ChatBubbleOutlineIcon /> <FavoriteBorderIcon /></div>

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
        <PostForm getPost={getPost} />
        {post && post.length ? loaded() : loading() }
        </>
    )
}

 export default Post;