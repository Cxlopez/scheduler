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
import Error from "./Error";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (name && interviewer) {
      transition(SAVING)
    }

    const interview = {
      student: name,
      interviewer
    };


    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
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
    <article className="appointment" data-testid="appointment">

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
      {mode === CREATE && <Form
        name={props.name}
        value={props.value}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={(name, interviewer) => save(name, interviewer)}

      />
      }
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
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
      {mode === ERROR_SAVE &&
        <Error
          message="Could not create appointment"
          onClose={back}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message="Could not delete appointment"
          onClose={back}
        />
      }
    </article>
  );
};