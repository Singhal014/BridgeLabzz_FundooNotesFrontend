import React, { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import NoteCard from "../NoteCard/NoteCard";
import { getTrashedNotesApiCall } from "../../services/api";
import { SearchQuery } from "../../App";
import "./TrashContainer.scss";

const TrashContainer = () => {
  const [trashNotes, setTrashNotes] = useState([{ id: 3, title: "Meeting Notes", description: "Discuss client requirements." },
    { id: 4, title: "Workout Plan", description: "Include cardio and strength training." },
    { id: 5, title: "Reading List", description: "Finish reading 'Atomic Habits'." },
    { id: 6, title: "Budget Planning", description: "Plan monthly expenses." },
    { id: 7, title: "Holiday Ideas", description: "Explore hill stations for summer vacation." },
    { id: 8, title: "Course Schedule", description: "Check timetable for JavaScript class." },
    { id: 9, title: "Doctor Appointment", description: "Visit dentist at 5 PM." },
    { id: 10, title: "Code Review", description: "Review PR #42 and add comments." },
    { id: 11, title: "Daily Goals", description: "Meditate and read 30 pages." },
    { id: 12, title: "Shopping List", description: "Buy furniture for the living room." },
    { id: 13, title: "Travel Checklist", description: "Pack essentials for the trip." },
    { id: 14, title: "Learning Goals", description: "Master Redux and Context API." },
    { id: 15, title: "Tech Blog Ideas", description: "Write about React performance tips." },
    { id: 16, title: "Learning Goals", description: "Master Redux and Context API." },
    { id: 9, title: "Doctor Appointment", description: "Visit dentist at 5 PM." },
    { id: 10, title: "Code Review", description: "Review PR #42 and add comments." },
    { id: 11, title: "Daily Goals", description: "Meditate and read 30 pages." },
    { id: 12, title: "Shopping List", description: "Buy furniture for the living room." },
    { id: 13, title: "Travel Checklist", description: "Pack essentials for the trip." },
    { id: 15, title: "Tech Blog Ideas", description: "Write about React performance tips." },
    { id: 15, title: "Tech Blog Ideas", description: "Write about React performance tips." },
    { id: 16, title: "Learning Goals", description: "Master Redux and Context API." },
    { id: 15, title: "Tech Blog Ideas", description: "Write about React performance tips." },
    { id: 16, title: "Learning Goals", description: "Master Redux and Context API." }]);
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
      <Box className="notes-wrapper">

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
    </Box>
  );
};

export default TrashContainer;
