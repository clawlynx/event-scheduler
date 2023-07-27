import Calender from "./components/Calender";
import { Form } from "./components/Form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5 px-10 bg-gradient-to-l from-lime-50 to-amber-50">
      <h2 className=" text-4xl p-3">
        Missed an <span className="text-red-700 ">Appointment?</span>
      </h2>
      <h2 className="text-4xl p-3">
        Forgot an <span className=" text-red-700">Event??</span>
      </h2>
      <div className="imageanim drop-shadow-xl  ">
        <img src="../../img1.png" className=" rounded-full" alt="img1" />
      </div>
      <h2 className=" text-2xl p-3">
        No More.... Schedule Your Event with
        <span className="text-4xl ps-4 text-slate-900 font-bold opaqanim">
          One Click
        </span>
      </h2>

      <Form />
      <div className=" mt-5">
        <Calender />
      </div>
    </main>
  );
}
