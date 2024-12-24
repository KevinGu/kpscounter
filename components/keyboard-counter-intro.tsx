import React from "react";
import Head from "next/head";

const KeyboardCounterIntroduction: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          Keyboard Counter - Track Your Typing Activity in Real-Time
        </title>
        <meta
          name="description"
          content="Keyboard Counter is an innovative tool that monitors and displays your typing statistics in real-time. Track your keypresses, categorize them, calculate your keys per second (KPS), and visualize your performance with an interactive chart."
        />
        <meta
          name="keywords"
          content="Keyboard Counter, typing activity, real-time typing statistics, keys per second, KPS, typing speed, keyboard usage"
        />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Keyboard Counter
        </h1>
        <h2 className="text-2xl text-gray-800 dark:text-gray-200 mb-8 text-center">
          Track Your Typing Activity in Real-Time
        </h2>

        {/* Content Section */}
        <div className="w-full max-w-4xl">
          {/* Introduction */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            The <span className="font-semibold">Keyboard Counter</span> is an
            innovative tool designed to monitor and display your typing
            statistics as they happen. This application counts each keypress,
            categorizes them, calculates your keys per second (
            <span className="font-mono">KPS</span>), and presents the data
            through an interactive chart. With seamless dark mode integration,
            the Keyboard Counter adapts to your system settings for an optimal
            viewing experience.
          </p>

          {/* Key Features */}
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Key Features
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">
                Real-Time Keypress Counting:
              </span>{" "}
              The Keyboard Counter tallies every key you press, providing an
              accurate and up-to-date count of your total typing activity.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Detailed Categorization:</span> It
              distinguishes between letter keys, number keys, function keys, and
              other keys, giving you deeper insights into your typing habits.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">KPS Calculation:</span> The
              application computes your typing speed by measuring the number of
              keys pressed per second, allowing you to track and improve your
              efficiency.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">
                Interactive Chart Visualization:
              </span>{" "}
              An integrated chart displays your KPS over time, helping you
              visualize your performance and identify trends.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">
                Automatic Dark Mode Support:
              </span>{" "}
              The Keyboard Counter automatically adjusts its appearance based on
              your system&apos;s theme, ensuring comfort during day or night
              use.
            </li>
          </ul>

          {/* How to Use */}
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            How to Use the Keyboard Counter
          </h2>
          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Access the Application:</span>{" "}
              Open the Keyboard Counter in your web browser or integrate it into
              your project as a component.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Start Typing:</span> Begin typing
              anywhere outside of input fields. The Keyboard Counter will start
              tracking your keypresses immediately.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">
                Monitor Real-Time Statistics:
              </span>{" "}
              Watch as the total keypress count updates live. Your KPS and the
              interactive chart will dynamically reflect your typing speed.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">View Categorized Counts:</span>{" "}
              Check the breakdown of your keypresses into letters, numbers,
              function keys, and others to understand your typing patterns
              better.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Reset When Needed:</span> Use the
              reset button to clear all counts and start fresh whenever you
              wish.
            </li>
          </ol>

          {/* Benefits */}
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Benefits of Using the Keyboard Counter
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Improve Typing Speed:</span> By
              monitoring your KPS, you can set goals and work towards increasing
              your typing speed over time.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Understand Typing Habits:</span>{" "}
              The categorization feature helps you see which types of keys you
              use most frequently.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Enhance Productivity:</span>{" "}
              Keeping track of your typing activity can motivate you to maintain
              focus and reduce distractions.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Seamless Integration:</span> With
              dark mode support and a user-friendly interface, the Keyboard
              Counter fits effortlessly into your workflow.
            </li>
          </ul>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Whether you&apos;re a developer aiming to code faster, a writer
              looking to boost productivity, or a gamer interested in your
              keystroke frequency, the{" "}
              <span className="font-semibold">Keyboard Counter</span> offers
              valuable insights in an easy-to-understand format.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Experience the efficiency of real-time typing statistics with the
              Keyboard Counter and take control of your keyboard usage today.
            </p>
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">
              Try the Keyboard Counter Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyboardCounterIntroduction;
