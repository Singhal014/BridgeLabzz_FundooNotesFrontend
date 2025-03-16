import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import DashBoard from './components/DashBoard/DashBoard';
import NoteContainer from './components/NoteContainer/NoteContainer';
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer';
import TrashContainer from './components/TrashContainer/TrashContainer';


const routes = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signUp", element: <SignUp /> },

    {
        path: "/dashboard",
        element: <DashBoard />,
        children: [
            { index: true, element: <Navigate to="notes" replace /> },
            { path: "notes", element: <NoteContainer /> },
            { path: "archive", element: <ArchiveContainer /> },
            { path: "trash", element: <TrashContainer /> },
        ],
    },
]);

const RoutingModule = () => <RouterProvider router={routes} />;

export default RoutingModule;
