/* eslint-disable array-callback-return */
export function getAppointmentsForDay(state, day) {
  const {days, appointments} = state;
  const apptArr = [];

  days.map((dayObj) => {
    if (dayObj.name === day) {
      dayObj.appointments.map((appt) => apptArr.push(appointments[appt]));
    }
  })
  return apptArr;
}