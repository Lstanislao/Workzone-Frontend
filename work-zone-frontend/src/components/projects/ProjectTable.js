import React, { useContext, useEffect, useState } from "react";
import {
  FaTag,
  FaThList,
  FaUsers,
  FaChartLine,
  FaArchive,
  FaArrowCircleRight,
} from "react-icons/fa";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";
import { getData } from "../../helpers/getData";
import ProjectCard from "./ProjectCard";

export const ProjectTable = ({ show }) => {
  const { setUser, user } = useContext(AppContext);
  const history = useHistory();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //Una vez que se tenga el id del usuario, se buscan los proyectos donde participa
    if (user?.id) {
      getData(
        `https://workzone-backend-mdb.herokuapp.com/api/projects/by/${user.id}`
      ).then((r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          setProjects(r.data);
        } else {
          console.log("error");
        }
      });
    }
  }, [user, show]);

  return (
    <div>
      {/* Los style estan en _preview.scss */}
      <div className="Preview__container">
        <ul className="Preview__responsive-table">
          <li className="Preview__table-header">
            <div className="column column-4 ">
              <FaTag /> Nombre
            </div>
            <div className="column column-3 ">
              <FaThList /> Tareas
            </div>
            <div className="column column-3">
              <FaChartLine /> Progreso
            </div>
            <div className="column column-3">
              <FaArchive /> {show ? "Devolver" : "Archivar"}{" "}
            </div>
            <div className="column column-2 ">
              <FaArrowCircleRight /> Detalles
            </div>
          </li>

          {projects.map((project) => {
            if (!show && !project.archivado) {
              return (
                <li className="Preview__table-row" key={project._id}>
                  <ProjectCard project={project} />
                </li>
              );
            }
            if (show && project.archivado) {
              return (
                <li className="Preview__table-row" key={project._id}>
                  <ProjectCard project={project} setProjects={setProjects} />
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
