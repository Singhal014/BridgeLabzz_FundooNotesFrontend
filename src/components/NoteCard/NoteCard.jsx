import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
    Archive as ArchiveIcon,
    Unarchive as UnarchiveIcon,
    Delete as TrashIcon,
    Restore as RestoreIcon,
    MoreVert as MoreIcon,
    Group as CollabIcon,
    Palette as ColorIcon,
} from "@mui/icons-material";
import {
    moveNoteToTrashApiCall,
    restoreNoteApiCall,
    archiveNoteApiCall,
    unarchiveNoteApiCall,
    deleteNotePermanentlyApiCall,
} from "../../services/api";
import ColorPalette from "../ColorPalette/ColorPalette";
import EditNote from "../EditNote/EditNote";
import "./NoteCard.scss";

const NoteCard = ({ data, container, updateList }) => {
    const [noteColor, setNoteColor] = useState(data.color || "#FFFFFF");
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [colorMenuAnchor, setColorMenuAnchor] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const openMenu = (event) => setMenuAnchor(event.currentTarget);
    const closeMenu = () => setMenuAnchor(null);

    const openColorMenu = (event) => setColorMenuAnchor(event.currentTarget);
    const closeColorMenu = () => setColorMenuAnchor(null);

    const handleNoteAction = async (action, value = "#FFFFFF") => {
        closeMenu();
        try {
            if (action === "trash") await moveNoteToTrashApiCall(data.id);
            if (action === "restore") await restoreNoteApiCall(data.id);
            if (action === "archive") await archiveNoteApiCall(data.id);
            if (action === "unarchive") await unarchiveNoteApiCall(data.id);
            if (action === "delete") await deleteNotePermanentlyApiCall(data.id);
            if (action === "color") setNoteColor(value);

            updateList(action === "color" ? { ...data, color: value } : data, action);
        } catch (error) {
            console.error(`Error in ${action}:`, error);
        }
    };

    return (
        <>
            <div
                className="note-card"
                style={{ backgroundColor: noteColor }}
            >
                <div
                    className="note-content"
                    onClick={() => setIsEditOpen(true)}
                >
                    <h3 className="note-title">{data.title}</h3>
                    <p className="note-description">{data.description}</p>
                </div>

                <div className="note-actions" onClick={(e) => e.stopPropagation()}>
                    {container !== "trash" && (
                        <>
                            <IconButton size="small" onClick={openColorMenu}>
                                <ColorIcon fontSize="small" />
                            </IconButton>
                            <Menu
                                anchorEl={colorMenuAnchor}
                                open={Boolean(colorMenuAnchor)}
                                onClose={closeColorMenu}
                            >
                                <ColorPalette
                                    onColorSelect={(color) => handleNoteAction("color", color)}
                                />
                            </Menu>

                            {container === "notes" ? (
                                <IconButton size="small" onClick={() => handleNoteAction("archive")}>
                                    <ArchiveIcon fontSize="small" />
                                </IconButton>
                            ) : container === "archive" ? (
                                <IconButton size="small" onClick={() => handleNoteAction("unarchive")}>
                                    <UnarchiveIcon fontSize="small" />
                                </IconButton>
                            ) : null}

                            <IconButton size="small">
                                <CollabIcon fontSize="small" />
                            </IconButton>

                            <IconButton size="small" onClick={openMenu}>
                                <MoreIcon fontSize="small" />
                            </IconButton>
                            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
                                <MenuItem onClick={() => handleNoteAction("trash")}>
                                    Move to Trash
                                </MenuItem>
                            </Menu>
                        </>
                    )}

                    {container === "trash" && (
                        <>
                            <IconButton size="small" onClick={() => handleNoteAction("restore")}>
                                <RestoreIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleNoteAction("delete")}>
                                <TrashIcon fontSize="small" />
                            </IconButton>
                        </>
                    )}
                </div>
            </div>

            <EditNote
                open={isEditOpen}
                handleClose={() => setIsEditOpen(false)}
                noteData={data}
                updateList={updateList}
            />
        </>
    );
};

export default NoteCard;
