import { useEffect, useState } from "react";

const Comments = ({ postId }) => {
  const URL = `http://localhost:4000/${postId}/comments`;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    text: "",
    user: "",
  });

  const getComments = async () => {
    try {
      const request = await fetch(URL);
      const response = await request.json();
      console.log(response)
      setComments(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleChange = (e) => {
    setNewComment((currentComment) => ({
      ...currentComment,
      [e.target.name]: e.target.value,
    }));
  }; // Added closing parenthesis

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });
      getComments();
      setNewComment({ text: "", user: "" });
    } catch (err) {
      console.log(err);
    }
  }; // Added closing curly bracket

  const loaded = () => {
    return comments.map((comment, idx) => {
      return (
        <div key={idx}>
          <h2>{comment.user}</h2>
          <br />
          <h3>{comment.text}</h3>
          <hr />
        </div>
      );
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Text: </label>
        <input type="text" name="text" onChange={handleChange} value={newComment.text} />
        <label>User: </label>
        <input type="text" name="user" onChange={handleChange} value={newComment.user} />
        <button>Submit</button>
      </form>
      <h2>Here are all my comments</h2>
      {comments ? loaded() : <h3>Loading...</h3>}
    </>
  );
};

export default Comments;
