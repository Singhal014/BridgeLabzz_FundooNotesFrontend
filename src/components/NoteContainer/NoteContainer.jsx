import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AddNote from "../AddNote/AddNote";
import NoteCard from "../NoteCard/NoteCard";
import { getNotesApiCall } from "../../services/api"; 
import "./NoteContainer.scss";
import { SearchQuery } from "../../App";

const NoteContainer = () => {
    const [notes, setNotes] = useState([{ id: 1, title: "Project Update", description: "Complete module 3 by Friday." },
        { id: 2, title: "Grocery List", description: "Buy milk, eggs, and bread." },
        { id: 3, title: "Meeting Notes", description: "Discuss client requirements." },
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
        { id: 16, title: "Learning Goals", description: "Master Redux and Context API." },


    ]);
    const searchQuery = useContext(SearchQuery);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await getNotesApiCall();
            console.log("Fetched notes:", response.data.data);
            setNotes(response.data.data || []);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleUpdateList = async (data, action) => {
        if (action === "trash" || action === "archive" || action === "color") {
            await fetchNotes(); 
        }
    };

    const handleAddNote = async () => {
        await fetchNotes(); 
    };

    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box className="note-container">
            <div className="sticky-add-note">
                <AddNote onAdd={handleAddNote} />
            </div>

            <div className="notes-wrapper">
                <Box className="notes-scroll">
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
            </div>
        </Box>
    );
};

export default NoteContainer;
