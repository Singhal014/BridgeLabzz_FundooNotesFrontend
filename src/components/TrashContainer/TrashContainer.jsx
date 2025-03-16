import React, { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import NoteCard from "../NoteCard/NoteCard";
import { getTrashedNotesApiCall } from "../../services/api";
import { SearchQuery } from "../../App";
import "./TrashContainer.scss";

const TrashContainer = () => {
  const [trashNotes, setTrashNotes] = useState([]);
  const searchQuery = useContext(SearchQuery);

  useEffect(() => {
    fetchTrashNotes();
  }, []);

  const fetchTrashNotes = async () => {
    try {
      const response = await getTrashedNotesApiCall();
      console.log("Fetched trash notes:", response.data.data);
      setTrashNotes(response.data.data || []);
    } catch (error) {
      console.error("Error fetching trash notes:", error);
    }
  };

  const handleUpdateList = async (noteId, action) => {
    if (action === "restore" || action === "delete") {
      await fetchTrashNotes(); 
    }
  };

  const filteredTrashNotes = trashNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="note-container">
      <Typography variant="h5" className="trash-header">
        Trash
      </Typography>
      <Box className="notes-grid">
        {filteredTrashNotes.length > 0 ? (
          filteredTrashNotes.map((note) => (
            <NoteCard 
              key={note.id} 
              data={note} 
              container="trash" 
              updateList={handleUpdateList} 
            />
          ))
        ) : (
          <Typography>No notes in trash.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default TrashContainer;
