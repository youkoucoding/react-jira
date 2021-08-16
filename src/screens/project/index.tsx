import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"/kanban"}>kanban</Link>
      <Link to={"/epic"}>Task-list</Link>
      <Routes>
        <Route path={"kanban"} element={<KanbanScreen />} />
        <Route path={"epic"} element={<EpicScreen />} />
        {/* default Route */}
        <Navigate to={window.location.pathname + "/kanban"} replace={true} />
      </Routes>
    </div>
  );
};
