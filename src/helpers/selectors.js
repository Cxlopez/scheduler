/* eslint-disable array-callback-return */
export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const apptArr = [];

  days.map((dayObj) => {
    if (dayObj.name === day) {
      dayObj.appointments.map((appt) => apptArr.push(appointments[appt]));
    }
  })
  return apptArr;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerData = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerData
  }
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const interArr = [];

  days.map((dayObj) => {
    if (dayObj.name === day) {
      dayObj.interviewers.forEach((inter) => interArr.push(interviewers[inter]));
    }
  })
  return interArr;
}