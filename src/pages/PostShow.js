import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


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
            <div className="postDetail">
                <h1>{post.text}</h1>
                <img src={post.image} alt="image"/>
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