"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@nextui-org/react";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";
import "echarts/theme/dark"; // 导入暗主题

// 自定义 Hook 检测暗模式
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    setIsDark(query.matches);

    const listener = (event: MediaQueryListEvent) => {
      setIsDark(event.matches);
    };

    query.addEventListener("change", listener);

    return () => {
      query.removeEventListener("change", listener);
    };
  }, []);

  return isDark;
}

const KeyboardCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  // Category counters
  const [letterCount, setLetterCount] = useState(0);
  const [numberCount, setNumberCount] = useState(0);
  const [functionKeyCount, setFunctionKeyCount] = useState(0);
  const [otherKeyCount, setOtherKeyCount] = useState(0);

  const [countChange, setCountChange] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // KPS-related state and refs
  const [kps, setKPS] = useState(0); // Keys per second
  const totalActiveTimeRef = useRef(0); // Total active time in milliseconds
  const activePeriodStartTimeRef = useRef<number | null>(null); // Start time of current active period
  const lastKeyPressTimeRef = useRef<number | null>(null); // Time of last key press
  const kpsTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Timer to detect end of active session

  // Use refs to store the latest count values
  const countRef = useRef(0);
  const letterCountRef = useRef(0);
  const numberCountRef = useRef(0);
  const functionKeyCountRef = useRef(0);
  const otherKeyCountRef = useRef(0);

  // Chart data state
  const [chartData, setChartData] = useState<{ time: number; value: number }[]>(
    []
  );

  // 检测是否为暗模式
  const isDarkMode = useDarkMode();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      let isInput = false;

      if (activeElement instanceof HTMLElement) {
        isInput =
          activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable;
      }

      if (!isInput) {
        const key = event.key;
        const code = event.code;

        // Determine key type
        if (/^[a-zA-Z]$/.test(key)) {
          setLetterCount((prev) => prev + 1);
          letterCountRef.current += 1;
        } else if (/^[0-9]$/.test(key)) {
          setNumberCount((prev) => prev + 1);
          numberCountRef.current += 1;
        } else if (/^F[1-9]|F1[0-2]$/.test(code)) {
          setFunctionKeyCount((prev) => prev + 1);
          functionKeyCountRef.current += 1;
        } else {
          setOtherKeyCount((prev) => prev + 1);
          otherKeyCountRef.current += 1;
        }

        setCount((prevCount) => prevCount + 1);
        countRef.current += 1;

        setCountChange(true);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => setCountChange(false), 300); // Animation duration

        // KPS calculation logic
        const now = Date.now();

        if (
          lastKeyPressTimeRef.current === null ||
          now - (lastKeyPressTimeRef.current ?? 0) >= 500
        ) {
          // New active session starts

          // If there was a previous active session, accumulate its duration
          if (
            activePeriodStartTimeRef.current !== null &&
            lastKeyPressTimeRef.current !== null
          ) {
            totalActiveTimeRef.current +=
              lastKeyPressTimeRef.current - activePeriodStartTimeRef.current;
          }

          // Start new active session
          activePeriodStartTimeRef.current = now;
        }

        // Update last key press time
        lastKeyPressTimeRef.current = now;

        // Update KPS
        const activeTime =
          totalActiveTimeRef.current +
          (now - (activePeriodStartTimeRef.current ?? now));

        if (activeTime > 0) {
          const newKPS = countRef.current / (activeTime / 1000);
          setKPS(newKPS);

          // Update chart data
          setChartData((prevData) => {
            const newData = [...prevData, { time: now, value: newKPS }];
            if (newData.length > 60) {
              newData.shift(); // Keep array length within 60
            }
            return newData;
          });
        }

        // Reset active session end timer
        if (kpsTimeoutRef.current) {
          clearTimeout(kpsTimeoutRef.current);
        }

        kpsTimeoutRef.current = setTimeout(() => {
          // Active session ends, accumulate duration
          if (
            activePeriodStartTimeRef.current !== null &&
            lastKeyPressTimeRef.current !== null
          ) {
            totalActiveTimeRef.current +=
              lastKeyPressTimeRef.current - activePeriodStartTimeRef.current;
          }

          activePeriodStartTimeRef.current = null;
        }, 500);
      }
    },
    [] // Removed count dependency, since we use countRef
  );

  const resetCounter = () => {
    setCount(0);
    setLetterCount(0);
    setNumberCount(0);
    setFunctionKeyCount(0);
    setOtherKeyCount(0);
    setKPS(0);
    countRef.current = 0;
    letterCountRef.current = 0;
    numberCountRef.current = 0;
    functionKeyCountRef.current = 0;
    otherKeyCountRef.current = 0;
    totalActiveTimeRef.current = 0;
    activePeriodStartTimeRef.current = null;
    lastKeyPressTimeRef.current = null;
    if (kpsTimeoutRef.current) {
      clearTimeout(kpsTimeoutRef.current);
      kpsTimeoutRef.current = null;
    }
    localStorage.removeItem("keyboardCount");
    localStorage.removeItem("letterCount");
    localStorage.removeItem("numberCount");
    localStorage.removeItem("functionKeyCount");
    localStorage.removeItem("otherKeyCount");
    setChartData([]); // Reset chart data
    (document.activeElement as HTMLElement)?.blur(); // Remove focus from button
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    // Read stored counts from local storage
    const storedCount = localStorage.getItem("keyboardCount");

    if (storedCount) {
      const parsedCount = Number(storedCount);

      setCount(parsedCount);
      countRef.current = parsedCount;
    }
    const storedLetterCount = localStorage.getItem("letterCount");

    if (storedLetterCount) {
      const parsedLetterCount = Number(storedLetterCount);

      setLetterCount(parsedLetterCount);
      letterCountRef.current = parsedLetterCount;
    }
    const storedNumberCount = localStorage.getItem("numberCount");

    if (storedNumberCount) {
      const parsedNumberCount = Number(storedNumberCount);

      setNumberCount(parsedNumberCount);
      numberCountRef.current = parsedNumberCount;
    }
    const storedFunctionKeyCount = localStorage.getItem("functionKeyCount");

    if (storedFunctionKeyCount) {
      const parsedFunctionKeyCount = Number(storedFunctionKeyCount);

      setFunctionKeyCount(parsedFunctionKeyCount);
      functionKeyCountRef.current = parsedFunctionKeyCount;
    }
    const storedOtherKeyCount = localStorage.getItem("otherKeyCount");

    if (storedOtherKeyCount) {
      const parsedOtherKeyCount = Number(storedOtherKeyCount);

      setOtherKeyCount(parsedOtherKeyCount);
      otherKeyCountRef.current = parsedOtherKeyCount;
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (kpsTimeoutRef.current) {
        clearTimeout(kpsTimeoutRef.current);
      }
    };
  }, [handleKeyPress]);

  // Update local storage
  useEffect(() => {
    localStorage.setItem("keyboardCount", count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem("letterCount", letterCount.toString());
  }, [letterCount]);

  useEffect(() => {
    localStorage.setItem("numberCount", numberCount.toString());
  }, [numberCount]);

  useEffect(() => {
    localStorage.setItem("functionKeyCount", functionKeyCount.toString());
  }, [functionKeyCount]);

  useEffect(() => {
    localStorage.setItem("otherKeyCount", otherKeyCount.toString());
  }, [otherKeyCount]);

  // Chart configuration
  const chartOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    xAxis: {
      type: "category",
      data: chartData.map((point) => new Date(point.time).toLocaleTimeString()),
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: isDarkMode ? "#ccc" : "#999",
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: isDarkMode ? "#ccc" : "#999",
      },
      splitLine: {
        show: false, // Removed grid lines
      },
    },
    series: [
      {
        name: "KPS",
        data: chartData.map((point) => point.value),
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#5B8FF9",
          width: 2,
        },
        areaStyle: {
          color: "rgba(91, 143, 249, 0.1)",
        },
      },
    ],
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "10%",
      containLabel: true,
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-gray-900">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-center w-full mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Keyboard Counter
          </h1>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center w-full mb-8">
          {/* Counter */}
          <div className="flex flex-col items-center mb-8">
            <p
              className={`text-9xl font-bold mb-2 transition-transform duration-150 ${
                countChange ? "scale-125" : "scale-100"
              } text-red-500`}
            >
              {count}
            </p>
            <p className="text-2xl text-gray-700 dark:text-gray-300">
              Total Keypresses
            </p>
            <p className="text-3xl text-gray-700 dark:text-gray-300 mt-4">
              {kps.toFixed(2)} keys/sec
            </p>
          </div>

          {/* Chart */}
          <div className="w-full max-w-xl mb-8">
            <EChartsReact
              echarts={echarts}
              option={chartOptions}
              theme={isDarkMode ? "dark" : undefined}
              style={{ height: "200px", width: "100%" }} // Made the chart flatter
            />
          </div>
        </div>

        {/* Category counts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold text-blue-500 mb-2">
              {letterCount}
            </p>
            <p className="text-gray-700 dark:text-gray-300">Letter Keys</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold text-green-500 mb-2">
              {numberCount}
            </p>
            <p className="text-gray-700 dark:text-gray-300">Number Keys</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold text-purple-500 mb-2">
              {functionKeyCount}
            </p>
            <p className="text-gray-700 dark:text-gray-300">Function Keys</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold text-yellow-500 mb-2">
              {otherKeyCount}
            </p>
            <p className="text-gray-700 dark:text-gray-300">Other Keys</p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Button color="success" onClick={resetCounter}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeyboardCounter;
