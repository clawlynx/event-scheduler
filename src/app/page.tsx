import Calender from "./components/Calender";
import { Form } from "./components/Form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h2 className=" text-4xl">Now Schedule Your Events with ease...</h2>

      <Form />
      <div className=" mt-5">
        <Calender />
      </div>
    </main>
  );
}
