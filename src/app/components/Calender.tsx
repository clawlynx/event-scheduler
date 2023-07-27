"use client";
// Since we are using syncfusion scheduler library for setting up the calender the imports related to the library are imported
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  ScheduleComponent,
  Week,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";

import React, { useEffect, useRef, useState } from "react";
import { onActionComplete } from "../../../functions/functions";
// type of data coming from json file
type fetcheventsType = {
  id: number;
  title: string;
  address: string;
  sdate: string;
  edate: string;
  startTime: string;
  endTime: string;
};
// type of data to the scheduler library
type eventsType = {
  Id: number;
  Subject: string;
  Location: string;
  StartTime: Date;
  EndTime: Date;
};

const Calender = () => {
  const [events, setEvents] = useState([{}]); //for storing data coming from the json initially when page loads up

  const scheduleObj = useRef<ScheduleComponent>(null);

  // function to fetch data from json file during initial render
  async function fetchData() {
    const response = await fetch("/api/updateForm");

    const data: [] = await response.json();

    if (response.ok) {
      console.log("all ok");
    }
    if (!data || data === null) {
      return;
    }
    if (data?.length > 0) {
      // mapping data from json to the required format of the library
      const newdata = data.map((element: fetcheventsType) => {
        // converting the variables as required by the librarys datasource
        const syear = element.sdate.substring(0, 4);
        const eyear = element.edate.substring(0, 4);
        const smonthstr = element.sdate.substring(5, 7);
        const smonth = parseInt(smonthstr) - 1;
        const emonthstr = element.edate.substring(5, 7);
        const emonth = parseInt(emonthstr) - 1;
        const sday = element.sdate.substring(8, 10);
        const eday = element.edate.substring(8, 10);
        const shour = element.startTime.substring(0, 3);
        const ehour = element.endTime.substring(0, 3);
        const smin = element.startTime.substring(4, 6);
        const emin = element.endTime.substring(4, 6);

        return {
          Id: element.id,
          Subject: element.title,
          Location: element.address,
          StartTime: new Date(
            parseInt(syear),
            smonth,
            parseInt(sday),
            parseInt(shour),
            parseInt(smin)
          ),
          EndTime: new Date(
            parseInt(eyear),
            emonth,
            parseInt(eday),
            parseInt(ehour),
            parseInt(emin)
          ),
        };
      });
      setEvents(newdata);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  // the different fields on the scheduler
  const fieldsData = {
    id: "Id",
    subject: { name: "Subject", validation: { required: true } },
    location: { name: "Location", validation: { required: true } },
    startTime: { name: "StartTime", validation: { required: true } },
    endTime: { name: "EndTime", validation: { required: true } },
  };

  const eventSettings = { dataSource: events, fields: fieldsData };

  // customised editor template for the scheduler
  function editorWindowTemplate(props: any): JSX.Element {
    return (
      <table className="custom-event-editor">
        <tbody className="">
          <tr>
            <td className=" text-lg">Title</td>
            <td colSpan={4}>
              <input
                className="e-field e-input grow"
                style={{ width: "100%" }}
                id="title"
                name="Subject"
                type="text"
              ></input>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel text-lg">Address</td>
            <td colSpan={4}>
              <input
                className="e-field e-input"
                style={{ width: "100%" }}
                id="address"
                name="Location"
                type="text"
              ></input>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel text-lg">Start Time</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="yy/MM/dd hh:mm"
                className="e-field"
                id="StartTime"
                data-name="StartTime"
                value={props.startTime || props.StartTime}
              ></DateTimePickerComponent>{" "}
            </td>
          </tr>
          <tr>
            <td className="e-textlabel text-lg">End Time</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="yy/MM/dd hh:mm"
                className="e-field"
                id="EndTime"
                data-name="EndTime"
                value={props.endTime || props.EndTime}
              ></DateTimePickerComponent>{" "}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <>
      <ScheduleComponent
        ref={scheduleObj}
        eventSettings={eventSettings}
        allowDragAndDrop={true}
        allowResizing={true}
        cssClass="schedule-cell-dimension"
        actionComplete={onActionComplete.bind(events)}
        editorTemplate={editorWindowTemplate.bind(events)}
      >
        <ViewsDirective>
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Week, Month, Agenda, DragAndDrop, Resize]} />
      </ScheduleComponent>
    </>
  );
};
export default Calender;
