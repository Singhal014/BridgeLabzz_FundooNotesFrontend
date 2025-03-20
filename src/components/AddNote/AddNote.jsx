import React, { useState } from "react";
import { Paper, TextField, IconButton, Button } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { addNoteApiCall } from "../../services/api";
import "./AddNote.scss";

const AddNote = ({ onAdd }) => {
    const [note, setNote] = useState({ title: "", description: "" });
    const [isExpanded, setIsExpanded] = useState(false);

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleClose = async () => {
        if (note.title.trim() && note.description.trim()) {
            try {
                const response = await addNoteApiCall(note); 
                console.log("API Response:", response);

                const createdNote = response.data?.Data;
                if (createdNote) {
                    onAdd(createdNote, "add");
                }
            } catch (error) {
                console.error("Error adding note:", error);
            }
        }

        setNote({ title: "", description: "" });
        setIsExpanded(false);
    };

    return (
        <Paper className="add-note">
            {isExpanded ? (
                <>
                    <TextField
                        name="title"
                        placeholder="Title"
                        fullWidth
                        variant="standard"
                        value={note.title}
                        onChange={handleChange}
                    />
                    <TextField
                        name="description"
                        placeholder="Take a note..."
                        fullWidth
                        variant="standard"
                        value={note.description}
                        onChange={handleChange}
                        multiline
                    />
                    <div className="actions">
                        <div className="icons">
                            <IconButton size="small">
                                <ArchiveIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                                <ColorLensIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                                <PersonAddIcon fontSize="small" />
                            </IconButton>
                        </div>
                        <Button onClick={handleClose} size="small">
                            Close
                        </Button>
                    </div>
                </>
            ) : (
                <TextField
                    placeholder="Take a note..."
                    fullWidth
                    variant="standard"
                    onFocus={() => setIsExpanded(true)}
                />
            )}
        </Paper>
    );
};

export default AddNote;
