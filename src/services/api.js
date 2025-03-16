import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7184",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApiCall = (payload) => api.post("/users/login", payload);
export const signApiCall = (payload) => api.post("/users", payload);
export const addNoteApiCall = (payload) => api.post("/notes", payload);
export const getNotesApiCall = () => api.get("/notes");

export const getTrashedNotesApiCall = () => api.get("/notes/trashed");
export const getArchivedNotesApiCall = () => api.get("/notes/archived");

export const moveNoteToTrashApiCall = (noteId) => api.put(`/notes/${noteId}/trash`);
export const restoreNoteApiCall = (noteId) => api.put(`/notes/${noteId}/restore`);
export const archiveNoteApiCall = (noteId) => api.put(`/notes/${noteId}/archive`);
export const unarchiveNoteApiCall = (noteId) => api.put(`/notes/${noteId}/unarchive`);
export const deleteNotePermanentlyApiCall = (noteId) => api.delete(`/notes/${noteId}`);


export default api;