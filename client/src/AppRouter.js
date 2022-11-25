import React from "react";
import HomePage from "./components/Homepage";
import { Route, Routes } from "react-router-dom"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="*" element={<HomePage />} />
        </Routes>
    );
};
