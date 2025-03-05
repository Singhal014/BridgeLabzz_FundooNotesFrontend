import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import NoteContainer from "./NoteContainer/NoteContainer";
import Dashboard from "./Dashboard/Dashboard";
import TrashContainer from "./TrashContainer/TrashContainer";
import ArchiveContainer from "./ArchiveContainer/ArchiveContainer";

function RoutingModule() {
  const routes = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        { index: true, element: <Navigate to="notes" replace /> }, 
        { path: "notes", element: <NoteContainer /> },
        { path: "trash", element: <TrashContainer /> },
        { path: "archive", element: <ArchiveContainer /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default RoutingModule;
