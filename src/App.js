import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./styles.css";
import {
  defaultWeatherData,
  conditionIconMapping,
  times,
  days,
  timePeriodLabelMapping,
  timePeriodMapping,
} from "./utils.js";
import { Line } from "react-chartjs-2";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import Chart from "chart.js/auto";

export default function App() {
  // function classNames(...classes) {
  //   return classes.filter(Boolean).join(" ");
  // }

  const [weatherData, setWeatherData] = useState(defaultWeatherData);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterTime, setFilterTime] = useState("Afternoon");
  const [filterDay, setFilterDay] = useState("Fridays");
  const [filterCity, setFilterCity] = useState("London");
  const [value, setValue] = useState("");
  const [filteredForecastData, setFilteredForecastData] = useState(
    weatherData.forecast.forecastday.filter(
      (data) => filterDay === format(new Date(data.date), "EEEE") + "s"
    )
  );
  const [filteredHourlyWeatherData, setFilteredHourlyWeatherData] = useState(
    weatherData.forecast.forecastday.map((data) =>
      data.hour.filter((hour) =>
        timePeriodMapping[filterTime].includes(
          parseInt(format(new Date(hour.time), "k"))
        )
      )
    )
  );

  // useEffect(async () => {
  //   const response = await fetch(
  //     "https://api.weatherapi.com/v1/forecast.json?key=f766429b4b73486f8df223400230804&q=" +
  //       filterCity +
  //       "&days=20&aqi=no&alerts=no"
  //   );
  //   setWeatherData(response.json());
  // }, []);

  useEffect(() => {
    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=f766429b4b73486f8df223400230804&q=" +
        filterCity +
        "&days=20&aqi=no&alerts=no"
    )
      .then((response) => (response.ok ? response.json() : defaultWeatherData))
      .then((data) => {
        setWeatherData(data);
        setFilterCity(data.location.name);
      });

    setFilteredForecastData(
      weatherData.forecast.forecastday.filter(
        (data) => filterDay === format(new Date(data.date), "EEEE") + "s"
      )
    );
    setFilteredHourlyWeatherData(
      weatherData.forecast.forecastday.map((data) =>
        data.hour.filter((hour) =>
          timePeriodMapping[filterTime].includes(
            parseInt(format(new Date(hour.time), "k"))
          )
        )
      )
    );
  }, [filterCity]);

  useEffect(() => {
    setFilteredForecastData(
      weatherData.forecast.forecastday.filter(
        (data) => filterDay === format(new Date(data.date), "EEEE") + "s"
      )
    );
    setFilteredHourlyWeatherData(
      weatherData.forecast.forecastday.map((data) =>
        data.hour.filter((hour) =>
          timePeriodMapping[filterTime].includes(
            parseInt(format(new Date(hour.time), "k"))
          )
        )
      )
    );
  }, [filterDay, filterTime]);

  return (
    <div className="grid">
      {/* Header */}
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <span className="">Weather.io</span>
            {/* <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Weather.io</span>
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
            {/* </a>  */}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 pr-6"
            >
              Help
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="">Weather.io</span>
                {/* <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                /> */}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Help
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log out
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      {/* Inputs */}
      <div className="place-self-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* City picker */}
          <div className="place-self-start">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFilterCity(e.target.value);
                  }
                }}
                placeholder={filterCity}
                className="w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              />
            </form>
          </div>
          <div>
            {/* Day of week picker */}
            <Popover className="inline px-8">
              <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <span>{filterDay}</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 ">
                  <div className="w-full max-w-xs flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {days.map((day) => (
                        <button
                          key={day.name}
                          className="w-full group relative flex gap-x-6 rounded-lg py-4 pl-4 pr-8 hover:bg-zinc-100"
                          onClick={() => setFilterDay(day.name)}
                        >
                          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                            <img src={day.icon} />
                          </div>
                          <div>
                            <a
                              href={day.href}
                              className="font-semibold text-gray-900"
                            >
                              {day.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">
                              {day.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            {/* Time of day picker */}
            <Popover className="inline">
              <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <span>{filterTime}</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 ">
                  <div className="w-full max-w-xs flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {times.map((time) => (
                        <button
                          key={time.name}
                          className="w-full group relative flex gap-x-6 rounded-lg py-4 pl-4 pr-8 hover:bg-zinc-100"
                          onClick={() => setFilterTime(time.name)}
                        >
                          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                            <img src={time.icon} />
                          </div>
                          <div>
                            <a
                              href={time.href}
                              className="font-semibold text-gray-900"
                            >
                              {time.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">
                              {time.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
      </div>
      {/* Weather Cards */}
      <div className="h-[500px] overflow-y-auto p-8 flex-auto sm:px-16 sm:py-8 lg:px-32 lg:py-8">
        <dl className="grid grid-cols-1 gap-5 lg:grid-cols-2 ">
          {filteredForecastData.map((dayData) => (
            <div
              key={dayData.date}
              className="w-full overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                <div className="col-span-2">
                  <dt className="text-md font-medium text-zinc-900">
                    {format(new Date(dayData.date), "PPPP")}
                  </dt>
                  <img
                    className="truncate inline pr-8 pb-4"
                    src={conditionIconMapping[dayData.day.condition.code]}
                  />
                  <dd className="inline mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-gray-900">
                    {dayData.day.condition.text} {dayData.day.avgtemp_f} &deg;F
                  </dd>
                </div>
                <div className="align-self-end">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {dayData.day.daily_chance_of_rain > 0
                      ? dayData.day.daily_chance_of_rain + "% "
                      : "No "}{" "}
                    chance of rain
                  </dt>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Winds {dayData.day.maxwind_mph} mph
                  </dt>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {dayData.day.avghumidity}% humidity
                  </dt>
                </div>
              </div>
              <Line
                className=""
                data={{
                  labels: timePeriodLabelMapping[filterTime],
                  datasets: [
                    {
                      label: "Temperature (F)",
                      data: filteredHourlyWeatherData
                        .filter(
                          (hourlyData) =>
                            hourlyData[0].time.split(" ")[0] === dayData.date
                        )
                        .map((hourlyData) =>
                          hourlyData.map((hourData) => hourData.temp_f)
                        )[0],
                      fill: false,
                      borderColor: "#008800",
                    },
                    {
                      label: "Chance of rain (%)",
                      data: filteredHourlyWeatherData
                        .filter(
                          (hourlyData) =>
                            hourlyData[0].time.split(" ")[0] === dayData.date
                        )
                        .map((hourlyData) =>
                          hourlyData.map((hourData) => hourData.chance_of_rain)
                        )[0],
                      fill: false,
                      borderColor: "#5BCDFA",
                    },
                    {
                      label: "Humidity (%)",
                      data: filteredHourlyWeatherData
                        .filter(
                          (hourlyData) =>
                            hourlyData[0].time.split(" ")[0] === dayData.date
                        )
                        .map((hourlyData) =>
                          hourlyData.map((hourData) => hourData.humidity)
                        )[0],
                      fill: false,
                      borderColor: "#FF0040",
                    },
                  ],
                }}
              />
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
