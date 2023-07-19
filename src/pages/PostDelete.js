import { useParams } from "react-router";
import { Link } from "react-router-dom";

function PostDelete() {
    const {id} = useParams();
    const URL = `https://newsvibe.onrender.com/${id}`

    async function deletePost() {
        try {
            // Make an API call to the DELETE route!
            await fetch(URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <h2>Are you sure you want to delete this Post?</h2>
            <Link to='/'>
                <button onClick={deletePost}>Yes, delete it!</button>
            </Link>
            <Link to={`/${id}`}>
                <button>No, cancel</button>
            </Link>
        </>
    )
}

export default PostDelete;