import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Container, Button } from "react-bootstrap";
import { getData } from "../../../helpers/getData";
import { CreateTaskModal } from "../../tasks/CreateTaskModal";

// const itemsFromBackend = [
//   {
//     id: "task1",
//     content: "Task 1",
//     status: "column0",
//   },
//   {
//     id: "task2",
//     content: "Task 2",
//     status: "column2",
//   },
//   {
//     id: "task3",
//     content: "Task 3",
//     status: "column0",
//   },
//   {
//     id: "task4",
//     content: "Task 4",
//     status: "column3",
//   },
//   {
//     id: "task5",
//     content: "Task 5",
//     status: "column2",
//   },
// ];

// const columnsFromBackend = {
//   ["column0"]: {
//     name: "Requested",
//     items: [],
//   },
//   ["column1"]: {
//     name: "To do",
//     items: [],
//   },
//   ["column2"]: {
//     name: "In Progress",
//     items: [],
//   },
//   ["column3"]: {
//     name: "Done",
//     items: [],
//   },
// };

// itemsFromBackend.map((task) => {
//   if (task.status === "column0") {
//     columnsFromBackend["column0"].items.push(task);
//   } else if (task.status === "column1") {
//     columnsFromBackend["column1"].items.push(task);
//   } else if (task.status === "column2") {
//     columnsFromBackend["column2"].items.push(task);
//   } else {
//     columnsFromBackend["column3"].items.push(task);
//   }
// });

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export const Board = ({ project }) => {
  const [columns, setColumns] = useState({});
  const [lists, setLists] = useState([]);

  console.log(columns);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    //Buscando las listas del proyecto con sus respectivas tareas
    getData(`https://workzone-backend-mdb.herokuapp.com/api/lists/from/${project._id}`)
    .then( r => {
        console.log('me respondio' + r);
        if (r.ok) {
          console.log(r.data);
          setLists(r.data);
            // setColumns(r.data);
          const c = {}
          r.data.forEach(col => {
            c[col._id] = col;
          });

          console.log(c);
          setColumns(c);

        } else {
            console.log('error');
        }
    });
}, [modalShow]);

  return (
    <Container className="componentContainer">
      <h1>Tasks</h1>

      <button className="btn-create" onClick={ () => setModalShow(true)}>+ Crear Tarea</button>

      {lists.length > 0 && <CreateTaskModal
        project={project}
        show={modalShow}
        onHide={() => setModalShow(false)}
        columns={columns}
        lists={lists}
        setcolumns={setColumns}
      />}

      <div className="task_container">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className="column_container" key={columnId}>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          className="column"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#6487A5"
                              : "#3B566E",
                          }}
                        >
                          <h2>{column.nombre}</h2>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className="card"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {item.nombre}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </Container>
  );
};
