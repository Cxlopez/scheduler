/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";


export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    });
  }
  
  function deleteInterview() {
    if (mode === CONFIRM) {
      transition(DELETING, true)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
    } else {
      transition(CONFIRM);
    }
  }



  return (
    <article className="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => deleteInterview()}
          onEdit={() => transition(EDIT)}
        />
      )} 
      { mode === CREATE && <Form
       name={props.name}
       value={props.value}
       interviewers={props.interviewers}
       onCancel={() => back()}
       onSave={(name, interviewer) => save(name, interviewer)}

       /> 
       }
       {mode === SAVING && <Status/>}
       {mode === DELETING && <Status  message={"Deleting"}/>}
       {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete this interview?"}
          onCancel={() => back()}
          onConfirm={() => deleteInterview()}
        />
      )}
      {mode === EDIT && (
        <Form
          onCancel={() => back()}
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
    </article>
  );
};