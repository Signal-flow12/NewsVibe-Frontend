import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PostForm = ({ getPost }) => {
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    text: "",
    image: "",
  });

  const URL = 'http://localhost:4000/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost)
      });
      getPost();
      setNewPost({ text: "", image: "" });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setNewPost((previousFormState) => ({
      ...previousFormState,
      [e.target.name]: e.target.value
    }));
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
    <div className="home">
      <h1>Home 📰</h1>
    <Button className="post-button" variant="contained" onClick={handleOpen} color='secondary'>
        Create Vibe
    </Button>
    </div>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Enter your vibe details:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="Headline"
              type="text"
              fullWidth
              value={newPost.title}
              onChange={handleChange}
            />
              <TextField
                margin="dense"
                id="image"
                name="image"
                label="Image"
                type="text"
                fullWidth
                value={newPost.image}
                onChange={handleChange}
              />
            <TextField
              autoFocus
              margin="dense"
              id="text"
              name="text"
              label="Body"
              type="text"
              fullWidth
              value={newPost.text}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default PostForm;
