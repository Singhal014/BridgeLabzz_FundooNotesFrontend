import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { updateNoteApiCall } from "../../services/api";
import "./EditNote.scss";

const EditNote = ({ open, handleClose, noteData, updateList }) => {
  const [note, setNote] = useState({ title: "", description: "", color: "#FFFFFF" });

  useEffect(() => {
    if (noteData) {
      setNote({
        title: noteData.title,
        description: noteData.description,
        color: noteData.color || "#FFFFFF",
      });
    }
  }, [noteData]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleUpdateAndClose = async () => {
    try {
      if (note.title.trim() && note.description.trim()) {
        const response = await updateNoteApiCall(noteData.id, note);
        const updatedNote = response.data?.data;

        if (updatedNote) {
          updateList(updatedNote, "update"); // Update UI without refresh
        }
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
    handleClose(); // Close dialog after update
  };

  return (
    <Dialog open={open} onClose={handleUpdateAndClose} fullWidth maxWidth="sm">
      <DialogContent className="edit-note-content">
        <TextField
          name="title"
          placeholder="Title"
          fullWidth
          variant="standard"
          value={note.title}
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            className: "title-input",
          }}
        />
        
        <TextField
          name="description"
          placeholder="Take a note..."
          fullWidth
          variant="standard"
          value={note.description}
          onChange={handleChange}
          multiline
          rows={4}
          InputProps={{
            disableUnderline: true,
            className: "description-input",
          }}
        />
      </DialogContent>

      <DialogActions className="edit-note-actions">
        <Button onClick={handleUpdateAndClose} className="close-btn" size="small">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNote;
