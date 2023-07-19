import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom"

const PostEdit = () => {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const URL = `https://newsvibe.onrender.com/${id}`
  

    useEffect(() => {
        async function getPost() {
            try {
                const request = await fetch(URL);
                const response = await request.json();
                setPost(response);
            } catch(err) {
                console.log(err);
            }
        }
        getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [id]);

    function handleChange(e) {
        setPost((currentState) => ({
            ...currentState,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSumbit(e) {
        try{
            e.preventDefault();
            await fetch(URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            });
            return navigate(`/${id}`);
        } catch(err) {
            console.log(err);
        }
    }

    function loaded() {
        return(
            <>
                <h2>Edit</h2>
                <form onSubmit={handleSumbit}>
                    Post: <input type="text" value={post.text} name="title" onChange={handleChange} />
                    User: <input type="text" value={post.image} name="author" onChange={handleChange} />
                    <button>Submit</button>
                </form>
            </>
        )
    }

    return (
        <>
            {post ? loaded() : <h2>Loading...</h2>}
        </>
    )
}

export default PostEdit;