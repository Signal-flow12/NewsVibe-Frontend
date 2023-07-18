import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Comments from "../components/Comments";



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
                <Link to={`/${id}/edit`}>
                    <button>Edit</button>
                </Link>
                <Link to={`/${id}/delete`}>
                    <button>Delete</button>
                </Link>
                <hr/>
                <Comments postId={id} />
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