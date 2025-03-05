import React, { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import NoteCard from "../NoteCard/NoteCard";
import { getArchivedNotesApiCall } from "../../utils/Api";
import "./ArchiveContainer.scss";
import { SearchQuery } from "../../App";

const ArchiveContainer = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const searchQuery = useContext(SearchQuery);

  useEffect(() => {
    getArchivedNotesApiCall()
      .then((response) => {
        console.log("Fetched archived notes:", response.data.data);
        setArchivedNotes(response.data.data || []);
      })
      .catch((error) => console.error("Error fetching archived notes:", error));
  }, []);

  const handleUpdateList = (data, action) => {
    if (action === "unarchive" || action === "trash") {
      setArchivedNotes((prevNotes) => prevNotes.filter((n) => n.id !== data));
    }
  };

  const filteredArchiveNotes = archivedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="note-container">
      <Sidebar />
      <Navbar />
      <Typography variant="h5" className="archive-header">
        Archived Notes
      </Typography>
      <Box className="notes-grid">
        {filteredArchiveNotes.length > 0 ? (
          filteredArchiveNotes.map((note) => (
            <NoteCard 
              key={note.id} 
              data={note} 
              container="archive" 
              updateList={handleUpdateList} 
            />
          ))
        ) : (
          <Typography>No archived notes found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ArchiveContainer;
