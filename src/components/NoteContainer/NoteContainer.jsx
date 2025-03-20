import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AddNote from "../AddNote/AddNote";
import NoteCard from "../NoteCard/NoteCard";
import { getNotesApiCall } from "../../services/api"; 
import "./NoteContainer.scss";
import { SearchQuery } from "../../App";

const NoteContainer = () => {
    const [notes, setNotes] = useState([]);
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
