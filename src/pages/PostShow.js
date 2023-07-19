import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Comments from "../components/Comments";
import { Button } from "@mui/material";



const PostShow = () => {

    const [post, setPost] = useState(null);
    const { id } = useParams();
    const URL = `http://localhost:4000/${id}`

    const getPostDetail = async () => {
        try{
            const response = await fetch(URL);
            const result = await response.json();
            setPost(result)
        }catch (err){
            console.log(err)
        }
    }

    console.log(`Current Post: ${JSON.stringify(post)}`)

    useEffect(() => {
        getPostDetail()
    }, [])


    const postLoaded = () => {
        return(
            <div className="post-detialContainer">
            <div className="post-detail">
                <h2 id="title">{post.title}</h2>
                <h4>{post.text}</h4>
                <img src={post.image} alt="image"/>
                <div className="edit-delete-post">
                    <Link to={`/${id}/edit`}>
                        <Button size='medium' variant="contained" color='secondary'>Edit</Button>
                    </Link>
                    <Link to={`/${id}/delete`}>
                        <Button size='medium' variant="contained" color='error'>Delete</Button>
                    </Link>
                </div>
                <Comments postId={id} />
            </div>
            </div>
        )
    }
    return (
     
        <>
            {post ? postLoaded() : <h2> Loading...</h2>}
        </>
    )
}

 export default PostShow;