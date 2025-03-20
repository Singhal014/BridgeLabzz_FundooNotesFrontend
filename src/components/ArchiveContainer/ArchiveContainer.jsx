import React, { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import NoteCard from "../NoteCard/NoteCard";
import { getArchivedNotesApiCall } from "../../services/api";
import "./ArchiveContainer.scss";
import { SearchQuery } from "../../App";

const ArchiveContainer = () => {
    const [archivedNotes, setArchivedNotes] = useState([]);
    const searchQuery = useContext(SearchQuery);

    const fetchArchivedNotes = async () => {
        try {
            const response = await getArchivedNotesApiCall();
            console.log("Fetched archived notes:", response.data.data);
            setArchivedNotes(response.data.data || []);
        } catch (error) {
            console.error("Error fetching archived notes:", error);
        }
    };

    useEffect(() => {
        fetchArchivedNotes();
    }, []);

    const handleUpdateList = async (data, action) => {
        if (action === "unarchive" || action === "trash" || action === "color") {
            await fetchArchivedNotes();
        }
    };

    const filteredArchiveNotes = archivedNotes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box className="note-container">

            <Box className="notes-wrapper">
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
        </Box>
    );
};

export default ArchiveContainer;
