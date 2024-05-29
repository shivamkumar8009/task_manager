import React from "react";
import { Provider } from "react-redux";
import store from "../../store/store";
import TaskCreation from "../../components/TaskCreation/TaskCreation";
import TaskViewingDashboard from "../../components/TaskViewingDashboard/TaskViewingDashboard";
import "./HomePage.css";

function HomePage() {
  return (
    <Provider store={store}>
      <div className="HomePage">
        <div className="nav">Task Management System</div>
        <div className="mainContainer">
          <TaskCreation />
          <TaskViewingDashboard />
        </div>
      </div>
    </Provider>
  );
}

export default HomePage;
