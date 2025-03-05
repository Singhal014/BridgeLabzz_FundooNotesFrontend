import React, { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  Delete as TrashIcon,
  Restore as RestoreIcon,
  MoreVert as MoreIcon,
  Group as CollabIcon,
  Palette as ColorIcon
} from "@mui/icons-material";
import {
  moveNoteToTrashApiCall,
  restoreNoteApiCall,
  archiveNoteApiCall,
  unarchiveNoteApiCall,
  deleteNotePermanentlyApiCall
} from "../../utils/Api";
import ColorPalette from "../ColorPalette/ColorPalette";
import "./NoteCard.scss";

const NoteCard = ({ data, container, updateList }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [noteColor, setNoteColor] = useState("#FFFFFF");

  useEffect(() => {
    const savedColor = localStorage.getItem(`note-color-${data.id}`);
    if (savedColor) {
      setNoteColor(savedColor);
    }
  }, [data.id]);

  const open = Boolean(anchorEl);
  const colorOpen = Boolean(colorAnchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleColorOpen = (event) => setColorAnchorEl(event.currentTarget);
  const handleColorClose = () => setColorAnchorEl(null);

  const handleColorChange = (color) => {
    setNoteColor(color);
    localStorage.setItem(`note-color-${data.id}`, color);
    handleColorClose();
  };

  const handleNoteAction = async (action) => {
    handleMenuClose();
    try {
      if (action === "trash") {
        await moveNoteToTrashApiCall(data.id);
        updateList(data.id, "trash");
      } else if (action === "restore") {
        await restoreNoteApiCall(data.id);
        updateList(data.id, "restore");
      } else if (action === "archive") {
        await archiveNoteApiCall(data.id);
        updateList(data.id, "archive");
      } else if (action === "unarchive") {
        await unarchiveNoteApiCall(data.id);
        updateList(data.id, "unarchive");
      } else if (action === "delete") {
        await deleteNotePermanentlyApiCall(data.id);
        updateList(data.id, "delete");
      }
    } catch (error) {
      console.error(`Error in ${action}:`, error);
    }
  };


  return (
    <div className="note-card" style={{ backgroundColor: noteColor }}>
      <h3 className="note-title">{data.title}</h3>
      <p className="note-description">{data.description}</p>

      <div className="note-actions">
        {(container === "notes" || container === "archive") && (
          <>
            <IconButton size="small" onClick={handleColorOpen}>
              <ColorIcon fontSize="small" />
            </IconButton>
            <Menu anchorEl={colorAnchorEl} open={colorOpen} onClose={handleColorClose}>
              <ColorPalette onColorSelect={handleColorChange} />
            </Menu>

            {container === "notes" ? (
              <IconButton size="small" onClick={() => handleNoteAction("archive")}>
                <ArchiveIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton size="small" onClick={() => handleNoteAction("unarchive")}>
                <UnarchiveIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small">
              <CollabIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreIcon fontSize="small" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleNoteAction("trash")}>Move to Trash</MenuItem>
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
  );
};

export default NoteCard;
