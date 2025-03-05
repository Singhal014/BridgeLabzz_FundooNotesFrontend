import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import NoteCard from "../NoteCard/NoteCard";
import AddNote from "../AddNote/AddNote"; 
import { getNotesApiCall } from "../../utils/Api";
import "./NoteContainer.scss";
import { SearchQuery } from "../../App";

const NoteContainer = () => {
  const [notes, setNotes] = useState([]);
  const searchQuery = useContext(SearchQuery);

  console.log(searchQuery);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    getNotesApiCall()
      .then((response) => {
        console.log("Fetched notes:", response.data.data);
        setNotes(response.data.data || []);
      })
      .catch((error) => console.error("Error fetching notes:", error));
  };

  const handleUpdateList = (data, action) => {
    if (action === "trash" || action === "archive") {
      setNotes(prevNotes => prevNotes.filter(n => n.id !== data));
    } else if (action === "restore" || action === "unarchive") {
      fetchNotes();
    }
  };

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <Box className="note-container">
      <Sidebar />
      <Navbar />
      
      <Typography variant="h5" className="note-header">
        Notes
      </Typography>

      <AddNote onAdd={handleAddNote} />  

      <Box className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              data={note}
              container="notes"
              updateList={handleUpdateList}
            />
          ))
        ) : (
          <Typography>No notes available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default NoteContainer;
