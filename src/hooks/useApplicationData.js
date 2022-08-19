import { useState, useEffect } from "react";
import axios from "axios";


//Hook for managin state of application
export default function useApplicationData() {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  //Book & edit an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state, appointments)
        });
      })

  }

  //Find days
  function findDay(day) {
    const days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return days[day]
  }


  //Cancel an interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const interviewDay = findDay(state.day)
    const day = {
      ...state.days[interviewDay],
      spots: state.days[interviewDay].spots + 1
    }

    let days = state.days
    days[interviewDay] = day;

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        setState({ ...state, appointments, days: updateSpots(state, appointments) })
        return res
      })
  }


  //Retrieving API data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  //For updating available spots when interview is book or canceled
  function updateSpots(state, appointments) {
    return state.days.map((elem) => {
      if (elem.name === state.day) {
        return {
          ...elem,
          spots: elem.appointments
            .map((appointment) => appointments[appointment])
            .filter(({ interview }) => !interview).length
        };
      }

      return elem;
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};