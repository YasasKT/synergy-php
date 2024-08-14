import "../css/main.css";
import "../css/dashboard.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Project } from "../models/project";
import { Client } from "../models/client";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import ActionPopup from "../components/ActionPopup";
import useUser from "../hooks/useUser";

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [showLoadingError, setShowLoadingError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { user } = useUser();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showPopup) {
      setShowSuccessPopup(true);
      setPopupMessage(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    async function loadProjects() {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/projects", {
          method: "GET",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "An error occurred");
        }
        const projects = await response.json();
        setProjects(projects);
      } catch (error) {
        console.error("Error loading projects:", error);
        setErrorMessage(
          (error as { message: string }).message ||
            "An error occurred while loading projects."
        );
        setShowLoadingError(true);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/clients", {
          method: "GET",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "An error occurred");
        }
        const clients = await response.json();
        setClients(clients);
      } catch (error) {
        console.error("Error loading clients:", error);
        setErrorMessage(
          (error as { message: string }).message ||
            "An error occurred. Please try again."
        );
        setShowLoadingError(true);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  return (
    <>
      <Header />
      {loading && <Spinner fullPage color="var(--main-color)" />}
      {showLoadingError && (
        <ActionPopup
          message={errorMessage || "An error occurred. Please try again."}
          onClose={() => setErrorMessage(undefined)}
          type="error"
          position="top-right"
        />
      )}
      {showSuccessPopup && popupMessage && (
        <ActionPopup
          message={popupMessage}
          onClose={() => setShowSuccessPopup(false)}
          type="success"
          position="top-right"
        />
      )}
      {!loading && !errorMessage && (
        <section className="dashboard" id="section">
          <div className="left-column">
            <div className="welcome">Welcome, {user?.username}</div>
            {/* <div className="notification">You have received 5 messages.</div>
            <div className="link">
              <i className="ri-arrow-right-double-line"></i>See messages
            </div> */}
          </div>
          <div className="right-column">
            <div className="box-container">
              <Link to="/admin/projects/add">
                <div className="box">
                  <div className="box-icon">
                    <i className="ri-add-box-fill"></i>
                  </div>
                  <div className="text">New Project</div>
                </div>
              </Link>
              <div className="box">
                <div className="box-icon">
                  <i className="ri-news-fill"></i>
                </div>
                <div className="text">Manage Blogs</div>
              </div>
              <Link to="/admin/clients">
                <div className="box">
                  <div className="box-icon">
                    <i className="ri-shake-hands-fill"></i>
                  </div>
                  <div className="text">Manage Clients ({clients.length})</div>
                </div>
              </Link>
              <Link to="/admin/projects">
                <div className="box">
                  <div className="box-icon">
                    <i className="ri-bar-chart-box-fill"></i>
                  </div>
                  <div className="text">All Projects ({projects.length})</div>
                </div>
              </Link>
              <div className="box">
                <div className="box-icon">
                  <i className="ri-mail-fill"></i>
                </div>
                <div className="text">Messages</div>
              </div>
              <Link to="/admin/admins">
                <div className="box">
                  <div className="box-icon">
                    <i className="ri-shield-user-fill"></i>
                  </div>
                  <div className="text">Admins</div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Dashboard;
