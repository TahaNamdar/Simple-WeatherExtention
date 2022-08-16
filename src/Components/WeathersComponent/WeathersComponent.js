import React, { useEffect, useState } from "react";
import "./WeathersComponent.css";

export default function WeathersComponent() {
  const [data, setData] = useState(null);
  const [state, setState] = useState({ urlTarget: "", titleTarget: "" });

  useEffect(() => {
    async function getData() {
      const actualData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=fc23c7530f93e9a5b87c232a3aff81df`
      ).then((response) => response.json());

      setData(actualData);
    }
    getData();
  }, []);

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    /* eslint-disable no-undef */
    chrome.tabs.query(queryInfo, (tabs) => {
      const urlTarget = tabs[0].url;
      const titleTarget = tabs[0].title;
      setState({ urlTarget, titleTarget });
    });
  }, []);

  function BtnAction() {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: () => {
          let test = document.createElement("div");
          test.textContent = "Hello from test";
          test.setAttribute("class", "domStyle");
          document.body.insertBefore(test, document.body.firstChild);
        },
      });
    });
  }

  console.log(data, "data!");

  return (
    <div className="Wrapper">
      <div className="Title">
        <h2>Weather extension</h2>
        <h3 style={{ color: "yellow" }}>{state.titleTarget}</h3>
        <h4>{state.urlTarget}</h4>
      </div>
      <div className="Content">
        <p>
          <span>city name</span> : {data && data.name}
        </p>
        <p>
          <span>Temp</span> :{" "}
          {data && Math.round(Number(data.main.temp) - 273.15)} C
        </p>
        {data &&
          data.weather.map((item) => {
            return (
              <div>
                <p>
                  <span>weather</span> : {item.main}
                </p>
                <p>
                  <span>description</span> : {item.description}
                </p>
              </div>
            );
          })}
      </div>
      <button onClick={BtnAction}>Inject</button>
    </div>
  );
}
