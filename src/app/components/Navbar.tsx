import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-slate-900 p-5 pt-11 mt-4 justify-center">
      <section className="  ">
        <Link className=" text-3xl text-slate-100" href={"/"}>
          Event Scheduler
        </Link>
      </section>
    </nav>
  );
};
