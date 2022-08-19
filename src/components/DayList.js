import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const schedule = props.days.map(dayObj => {

    return (
      <DayListItem
        key={dayObj.id}
        selected={dayObj.name === props.value}
        setDay={props.onChange}
        {...dayObj}
      />
    )
  })
  return (
    <ul>
      {schedule}
    </ul>
  );
}