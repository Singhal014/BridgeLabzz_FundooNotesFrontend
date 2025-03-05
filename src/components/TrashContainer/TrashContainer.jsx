import React, { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import NoteCard from "../NoteCard/NoteCard";
import { getTrashedNotesApiCall } from "../../utils/Api";
import { SearchQuery } from "../../App";
import "./TrashContainer.scss";

const TrashContainer = () => {
  const [trashNotes, setTrashNotes] = useState([]);
  const searchQuery = useContext(SearchQuery);

  useEffect(() => {
    getTrashedNotesApiCall()
      .then((response) => {
        console.log("Fetched trash notes:", response.data.data);
        setTrashNotes(response.data.data || []);
      })
      .catch((error) => console.error("Error fetching trash notes:", error));
  }, []);

  const handleUpdateList = (noteId, action) => {
    if (action === "restore" || action === "delete") {
      setTrashNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    }
  };

  const filteredTrashNotes = trashNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="note-container">
      <Sidebar />
      <Navbar />
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