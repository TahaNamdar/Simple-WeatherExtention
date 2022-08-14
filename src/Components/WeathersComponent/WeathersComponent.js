import React, { useEffect, useState } from "react";
import "./WeathersComponent.css";

export default function WeathersComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const actualData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=fc23c7530f93e9a5b87c232a3aff81df`
      ).then((response) => response.json());

      setData(actualData);
    }
    getData();
  }, []);

  function BtnAction() {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: () => alert("is Working "),
        // function: ()=>{document.body.innerHTML = "Hello World"}
      });
    });
  }

  console.log(data, "data!");

  return (
    <div className="Wrapper">
      <div className="Title">
        <h3>Weather extension</h3>
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
