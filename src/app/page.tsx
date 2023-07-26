import Calender from "./components/Calender";
import { Form } from "./components/Form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5 px-10 bg-gradient-to-l from-lime-50 to-amber-50">
      <h2 className=" text-4xl">Now Schedule Your Events with ease</h2>
      <h3 className=" text-lg p-3">Flexible and Adaptive</h3>

      <Form />
      <div className=" mt-5">
        <Calender />
      </div>
    </main>
  );
}
