import React from "react";
import { Modal, Button, Form, Col, ProgressBar } from "react-bootstrap";
import Swal from "sweetalert2";
import { postData } from "../../helpers/postData";
import { useForm } from "../../hooks/useForm";
import { FaEdit, FaChartLine, FaUsers, FaTag, FaThList, FaFile } from "react-icons/fa";

export const TaskDeetsModal = (props) => {
  const [formValues, handleInputChange, reset] = useForm({
    task_name: props.task.nombre,
    task_content: props.task.descripcion,
    task_member: props.task.miembro,
    task_status: props.task.lista,
  });

  const { task_name, task_content, task_member, task_status } = formValues;

  const [editName, setEditName] = React.useState(false);

  const subtasks = ['Subtask #1', 'Subtask #2', 'Subtask #3'];

  const [newSubtaskFormValue, handleNewSubtask, resetST] = useForm('');

  const {newSubtask} = newSubtaskFormValue;

  const handleAddNewSubtask = (e) => {
    e.preventDefault();
    subtasks.push(newSubtask);
  }

  const progressPercentage = () => {
      // const progess = checked*100/subtasks.length
      return (20);
  }

  const handleCreate = (e) => {
      /*
    console.log(task_name, task_content, task_status);
    e.preventDefault();
    const newColumns = props.columns;
    const newTask = {
      id_proyecto: props.project._id,
      nombre: task_name,
      descripcion: task_content,
      lista: task_status,
    };

    if (task_member) {
      newTask["miembro"] = task_member;
    }

    console.log("creando");
    console.log(newTask);

    if (task_name && task_content) {
      //Creando la tarea en la base de datos
      postData(
        "https://workzone-backend-mdb.herokuapp.com/api/tasks/create",
        newTask
      ).then((r) => {
        console.log("me respondio" + r);
        if (r.ok) {
          console.log("todo bien. CREE TAREAAAAAA");
          console.log(r.data);
          console.log(newColumns);
          // newColumns[task_status].items.push(r.data);
          // props.setcolumns(newColumns);
          reset();
          // Swal.fire({
          //   icon: "success",
          //   title: "Tarea creada",
          //   text: "La tarea fue creada de forma exitosa",
          //   confirmButtonColor: "#22B4DE",
          // });
          props.onHide();
        } else {
          console.log("error");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Se produjo un error, intenta de nuevo",
            confirmButtonColor: "#22B4DE",
          });
          props.onHide();
        }
      });
    }
    */
  };



  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Form className="login_form" onSubmit={handleCreate}>
      <Modal.Header closeButton onClick={props.onHide} />
      <Modal.Body className="deets-container">
        <div className="header-container">
            <div className="title-container">
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>{task_name}</span>
                </Modal.Title>
                <p className="description">
                    {task_content}
                </p>
            </div>
            <p className="p-column">
                en 
                {props.lists.map((column) => {
                    if (column._id === task_status) {
                        return (<span> "{column.nombre}"</span>)
                    }
                    return null;
                })}
                
            </p>
            
            

        </div>
        <div className="info-container">
            

            <div id="subtasks">
                <div className="sectionTitle mt-3">
                    <FaThList />
                    <span>Subtareas</span>
                </div>
                <div className="subtasks-checkboxes">
                    {subtasks.map((st) => (
                        <div key={st} className="mb-1">
                        <Form.Check 
                            type={'checkbox'}
                            id={`default-checkbox`}
                            label={st}
                        />
                        </div>
                    ))}
                </div>
                {/* 
                <div>
                    <Form className="subtasks-form" onSubmit={handleAddNewSubtask} >
                        <Form.Control
                            className="input"
                            type="text"
                            name="newSubtask"
                            autoComplete="off"
                            value={newSubtask}
                            onChange={handleNewSubtask}
                            placeholder="Nueva subtarea"
                        />
                        <div className="button p-3 mx-5 mb-5">
                            <Button className="auth_button" type="submit">
                                + Agregar Subtarea
                            </Button>
                        </div>
                    </Form>
                </div>
                */}
                
            </div>
            <div className="info-subcontainer">
                <div className="subsubcontainer">
                    <div className="subcont-item" id="owners">
                        <div className="sectionTitle mt-3">
                            <FaUsers />
                            <span>Encargados</span>
                        </div>

                    </div>
                    <div className="subcont-item" id="archivos">
                        <div className="sectionTitle mt-3">
                            <FaFile />
                            <span>Archivos</span>
                        </div>

                    </div>
                </div>
                <div id="labels">
                    <div className="sectionTitle mt-3">
                        <FaTag />
                        <span>Etiquetas</span>
                    </div>
                </div>
                <div id="progress">
                    <div className="sectionTitle mt-3">
                        <FaChartLine />
                        <span>Progreso</span>
                    </div>
                    <ProgressBar now={progressPercentage()} />
                </div>
            </div>
        </div>
      </Modal.Body>
      </Form>
    </Modal>
  );
};



/*
 <button ><FaEdit /></button>
            <Form.Control
                className="input"
                type="text"
                name="task_name"
                autoComplete="off"
                placeholder={task_name}
                value={task_name}
                onChange={handleInputChange}
                required
              />
*/


/*
<Form className="login_form" onSubmit={handleCreate}>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="task_name"
                autoComplete="off"
                value={task_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                className="input"
                type="text"
                autoComplete="off"
                name="task_content"
                value={task_content}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Asignar a miembro</Form.Label>

              <Form.Control
                as="select"
                className="input"
                type="text"
                name="task_member"
                onChange={handleInputChange}
              >
                <option value="">Ninguno</option>
                {props.project.miembros.map((column) => (
                  <option value={column._id} key={column._id}>
                    {column.nombre} {column.apellido}
                  </option>
                ))}
              </Form.Control>
              {props.project.miembros.length == 0 && (
                <Form.Text className="text-muted">
                  Agrega miembros en la configuración general del proyecto para
                  asignarles una tarea.
                </Form.Text>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex align-items-center justify-content-start my-3 mx-5 px-5">
            <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>

              <Form.Control
                as="select"
                className="input"
                type="text"
                name="task_status"
                onChange={handleInputChange}
              >
                {props.lists.map((column) => (
                  <option value={column._id} key={column._id}>
                    {column.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <div className="button p-3 mx-5 mb-5">
            <Button className="auth_button" type="submit">
                {/* OJO, ESTE BOTóN DEBE BORRAR LA TAREA }
                Eliminar Tarea
                </Button>
              </div>
            </Form>
*/