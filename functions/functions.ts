export function timeCorrector(arg1: number, arg2: number): string {
  if (arg1 < 10 && arg2 < 10) {
    return `0${arg1}:0${arg2}`;
  }
  if (arg1 < 10 && arg2 >= 10) {
    return `0${arg1}:${arg2}`;
  }
  if (arg1 >= 10 && arg2 < 10) {
    return `${arg1}:0${arg2}`;
  }
  if (arg1 >= 10 && arg2 >= 10) {
    return `${arg1}:${arg2}`;
  } else {
    return "error";
  }
}

export async function onActionComplete(e: any) {
  if (e.requestType === "eventRemoved") {
    const response = await fetch(`/api/updateForm/${e.data[0].Id}`, {
      method: "DELETE",
    });
    await response.json();
    if (response.ok) {
      console.log("all ok");
    } else {
      console.error("Failed to update JSON file:", response.statusText);
    }
  }
  if (e.requestType === "eventCreated") {
    const newData = e.data[0];

    const { Id, Subject, Location, StartTime, EndTime } = newData;
    const id = Id;
    const title = Subject;
    const address = Location;
    const smonthFix = `0${(StartTime.getMonth() + 1).toString()}`;
    const emonthFix = `0${(EndTime.getMonth() + 1).toString()}`;
    const sdate = `${StartTime.getFullYear()}-${smonthFix}-${StartTime.getDate()}`;
    const edate = `${EndTime.getFullYear()}-${emonthFix}-${EndTime.getDate()}`;
    const startTime = timeCorrector(
      StartTime.getHours(),
      StartTime.getMinutes()
    );
    const endTime = timeCorrector(EndTime.getHours(), EndTime.getMinutes());
    const newEvent = {
      id,
      title,
      address,
      sdate,
      edate,
      startTime,
      endTime,
    };
    console.log(newEvent);

    const response = await fetch("/api/updateForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    await response.json();
    if (response.ok) {
      console.log("data added successfully");
    } else {
      console.error("Failed to update JSON file:", response.statusText);
    }
  }
  if (e.requestType === "eventChanged") {
    const newData = e.data[0];
    const { Id, Subject, Location, StartTime, EndTime } = newData;
    const id = Id;
    const title = Subject;
    const address = Location;
    const smonthFix = `0${(StartTime.getMonth() + 1).toString()}`;
    const emonthFix = `0${(EndTime.getMonth() + 1).toString()}`;
    const sdate = `${StartTime.getFullYear()}-${smonthFix}-${StartTime.getDate()}`;
    const edate = `${EndTime.getFullYear()}-${emonthFix}-${EndTime.getDate()}`;
    const startTime = timeCorrector(
      StartTime.getHours(),
      StartTime.getMinutes()
    );
    const endTime = timeCorrector(EndTime.getHours(), EndTime.getMinutes());
    const newEvent = {
      id,
      title,
      address,
      sdate,
      edate,
      startTime,
      endTime,
    };
    const response = await fetch("/api/updateForm", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    await response.json();
    if (response.ok) {
      console.log("data Updated successfully");
    } else {
      console.error("Failed to update JSON file:", response.statusText);
    }
  }
}
