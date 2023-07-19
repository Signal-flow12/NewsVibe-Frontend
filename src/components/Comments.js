import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'

const Comments = ({ postId }) => {
  const URL = `https://newsvibe.onrender.com/${postId}/comments`;

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }; 

  const loaded = () => {
    return comments.map((comment, idx) => {
      return (
        <div className="comments" key={idx}>
          <div className="comment">
            <div className="commentText">
              <h3>User: {comment.user}</h3>
              <h4>{comment.text}</h4>
            </div>
          </div>
          
        </div>
      );
    });
  };

  const textFieldStyles = {
    background: 'white',
  };
  

  return (
    <>
      <form onSubmit={handleSubmit}>
      <TextField
          type="text" 
          placeholder='Username'
          name="user" 
          onChange={handleChange}
          value={newComment.user}
          InputProps={{
            style: textFieldStyles,}}
             />

        <TextField   
          placeholder='Enter a comment'
          type="text"
          name="text"
          onChange={handleChange}
          value={newComment.text}
          fullWidth
          multiline
              rows={2}
              maxRows={Infinity}
          InputProps={{
            style: textFieldStyles,}}
          />
       <Button variant="contained"  type="submit" color="primary" style={{ marginTop: '5px' }} endIcon={<SendIcon />}>
        Send
      </Button>
      </form>
      
      {comments ? loaded() : <h3>Loading...</h3>}
    </>
  );
};

export default Comments;
