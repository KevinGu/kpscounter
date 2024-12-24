import { Metadata } from "next";

import KeyboardCounter from "@/components/keyboard-counter";
import KeyboardCounterIntroduction from "@/components/keyboard-counter-intro";

export const metadata: Metadata = {
  title: "Keyboard Counter - Track Your Typing Activity in Real-Time",
  description:
    "Keyboard Counter is an innovative tool that monitors and displays your typing statistics in real-time. Track your keypresses, calculate your keys per second (KPS), and visualize your performance with an interactive chart.",
};

export default async function Home() {
  return (
    <>
      <KeyboardCounter />
      <KeyboardCounterIntroduction />
    </>
  );
}
