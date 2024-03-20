import React from "react";
import Navbar from "./Navbar";
import Section from "./Section";
import Content from "./Content";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <div className="flex gap-20">
        <Section />
        <Content />
      </div>
    </main>
  );
}
