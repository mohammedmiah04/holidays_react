import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true); // 1 State message until api data recieved
  const [tours, setTours] = useState([]); // 2. Api data stored in state

  const removeTour = (id) => {
    // renive tour
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    // 4. fetch data async/await
    setLoading(true); // 4b toggle loading state to true first for default message
    try {
      //4c place fetch request in try catch
      let response = await fetch(url); // 4d get response from api
      let tours = await response.json(); // 4eparse the data into json
      setLoading(false); //4f set Loading to false once data us recieved
      setTours(tours); // 4g store api data into tours
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours(); //5. run fetchTours at the start once
  }, []);

  // conditionals
  if (loading) {
    // 3. If loading state is true === loading message comp will load
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    // once all tours cards are removed and length is 0
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <button className="btn" onClick={fetchTours}>
            refresh
          </button>
        </div>
      </main> // ^^ press the refresh btn to fetch array of tours back
    );
  }

  return (
    //6 if everything is loaded tours will load
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main> // ^^ pass down
  );
}

export default App;
