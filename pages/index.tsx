import Layout from "../components/layout/layout";
import s from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [tareasPendientes, setTareasPendientes] = useState([]);
  const [tareasCompletas, setTareasCompletas] = useState([]);

  useEffect(() => {
    fetch("https://mini-reto-delta.vercel.app/tareas/pendientes")
      .then((response) => response.json())
      .then((data) => setTareasPendientes(data))
      .catch((error) => console.error(error));

    fetch("https://mini-reto-delta.vercel.app/tareas/completas")
      .then((response) => response.json())
      .then((data) => setTareasCompletas(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Layout>
      <div className={s.mainCont}>
        <div className={s.tareasCont}>
          <h2>Pendientes</h2>
          <ul>
            {tareasPendientes.map((tarea) => (
              <li key={tarea.id}>{tarea.descripcion}</li>
            ))}
          </ul>
        </div>

        <div className={s.together}>
          <div className={s.compCont}>
            <h2>Completas</h2>
            <ul>
              {tareasCompletas.map((tarea) => (
                <li key={tarea.id}>{tarea.descripcion}</li>
              ))}
            </ul>
          </div>
          <div className={s.nuevaCont}>
            <button className={s.nueva}> Nueva Tarea</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
