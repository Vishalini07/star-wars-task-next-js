import Image from "next/image";
import { getPeopleList } from "./services/starWar.service";
import HomePage from "./(pages)/home/page";

export default async function Home() {

  return (
    <main className="">
      <div className="">
        <HomePage />
      </div>
    </main>
  );
}
