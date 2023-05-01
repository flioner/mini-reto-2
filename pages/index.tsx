import Layout from "../components/layout/layout";
import s from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { Modal } from "../components/ui/modal/modal";
import axios from "axios";

export default function Home() {
  const [tareasPendientes, setTareasPendientes] = useState([]);
  const [tareasCompletas, setTareasCompletas] = useState([]);
  const [selectedPendientes, setSelectedPendientes] = useState([]);
  const [selectedCompletas, setSelectedCompletas] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(1);

  const editTarea = (id) => {
    setEditId(id);
    setOpenEdit(true);
  };
  const togglePendientes = (taskId) => {
    setSelectedPendientes((prevSelected) => {
      // Check if task already exists in selectedPendientes
      const taskIndex = prevSelected.indexOf(taskId);
      if (taskIndex === -1) {
        // Add task to selectedPendientes
        return [...prevSelected, taskId];
      } else {
        // Remove task from selectedPendientes
        const newSelected = [...prevSelected];
        newSelected.splice(taskIndex, 1);
        return newSelected;
      }
    });
    console.log(selectedPendientes.length);
  };

  const toggleCompletas = (taskId) => {
    setSelectedCompletas((prevSelected) => {
      // Check if task already exists in selectedPendientes
      const taskIndex = prevSelected.indexOf(taskId);
      if (taskIndex === -1) {
        // Add task to selectedPendientes
        return [...prevSelected, taskId];
      } else {
        // Remove task from selectedPendientes
        const newSelected = [...prevSelected];
        newSelected.splice(taskIndex, 1);
        return newSelected;
      }
    });
  };

  const borrarTarea = (id) => {
    axios
      .delete(`https://mini-reto-delta.vercel.app/tareas/${id}`)
      .then(() => {
        setTareasPendientes((prevTareas) =>
          prevTareas.filter((tarea) => tarea.id !== id)
        );
        setTareasCompletas((prevTareas) =>
          prevTareas.filter((tarea) => tarea.id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get("https://mini-reto-delta.vercel.app/tareas/pendientes")
      .then((response) => setTareasPendientes(response.data))
      .catch((error) => console.error(error));

    axios
      .get("https://mini-reto-delta.vercel.app/tareas/completadas")
      .then((response) => setTareasCompletas(response.data))
      .catch((error) => console.error(error));
  }, []);

  console.log(tareasPendientes);

  return (
    <Layout>
      <div className={s.mainCont}>
        <div className={s.contCont}>
          <div className={s.tareasCont}>
            <div className={s.title}>Pendientes</div>
            <button
              className={
                selectedPendientes.length != 0
                  ? s.borrarSelected
                  : s.borrarSelectedH
              }
            >
              Borrar tareas seleccionadas
            </button>
            <ul>
              {tareasPendientes.map((tarea) => (
                <li className={s.li} key={tarea.id}>
                  <input
                    onChange={() => togglePendientes(tarea.id)}
                    type="checkbox"
                  />
                  <div className={s.liTitle}> {tarea.titulo} </div>
                  <div className={s.liTxt}> {tarea.descripcion} </div>

                  <button
                    onClick={() => editTarea(tarea.id)}
                    className={s.btn2}
                  >
                    editar
                  </button>
                  <button
                    className={s.btn}
                    onClick={() => borrarTarea(tarea.id)}
                  >
                    borrar
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.together}>
            <div className={s.compCont}>
              <div className={s.title}>Completadas</div>
              <ul>
                {tareasCompletas.map((tarea) => (
                  <li className={s.li} key={tarea.id}>
                    <input type="checkbox" />
                    <div className={s.liTitle}> {tarea.titulo} </div>
                    <div className={s.liTxt}> {tarea.descripcion} </div>

                    <button
                      className={s.btn}
                      onClick={() => borrarTarea(tarea.id)}
                    >
                      borrar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.nuevaCont}>
              <button onClick={() => setOpenCreate(true)} className={s.nueva}>
                Nueva Tarea
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={openCreate} setOpen={() => setOpenCreate(true)} float>
        <div className={s.modalCont}>
          <div className={s.modalContCont}>
            <div className={s.modalText}>
              Titulo:
              <input className={s.modalInput} type="text" />
            </div>
            <div className={s.modalText}>
              Descripción: <input className={s.modalInput} type="text" />
            </div>

            <div className={s.btnModalCont}>
              <button className={s.btnModal}>Crear Tarea</button>
              <button
                className={s.btnModal2}
                onClick={() => setOpenCreate(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openEdit} setOpen={() => setOpenEdit(true)} float>
        <div className={s.modalCont}>
          <div className={s.modalContCont}>
            <div className={s.modalText}>
              Titulo:
              <input
                className={s.modalInput}
                type="text"
                placeholder={
                  editId &&
                  tareasPendientes.find((tarea) => tarea.id === editId)?.titulo
                }
              />
            </div>
            <div className={s.modalText}>
              Descripción:{" "}
              <input
                className={s.modalInput}
                type="text"
                placeholder={
                  editId &&
                  tareasPendientes.find((tarea) => tarea.id === editId)
                    ?.descripcion
                }
              />
            </div>

            <div className={s.btnModalCont}>
              <button className={s.btnModal}>Editar Tarea</button>
              <button
                className={s.btnModal2}
                onClick={() => setOpenEdit(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
