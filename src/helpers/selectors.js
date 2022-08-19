/* eslint-disable array-callback-return */
//Returns an array of appointments for the day
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

// Returns the interviewer from the interview object
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

//Returns an array of interviewers for the day
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