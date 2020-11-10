import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import logo from "./assets/logo.svg";
import * as S from "./styles";
import "./styles.css";

const App = () => {
  const [activities, setActivities] = useState<{ name: string; id: string }[]>(
    []
  );
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const getActivities = async () => {
    const { data } = await axios.get(
      `https://heidan-api.herokuapp.com/activities`
    );
    console.log({ data });
    setActivities(data);
  };

  useEffect(() => {
    getActivities();
  }, []);

  const submitActivity = async () => {
    try {
      const response = await axios.post(
        `https://heidan-api.herokuapp.com/activity`,

        {
          description,
          name,
          cost,
          complete: false,
          location: "England",
        }
      );
      console.log({ response });

      getActivities();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setCost("");
    setDescription("");
    setName("");

    submitActivity();
  };

  const handleDelete = (id: string) => async () => {
    try {
      const response = await axios.delete(
        `https://heidan-api.herokuapp.com/activity/${id}`
      );
      console.log({ response });

      getActivities();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <S.Wrapper>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Heidan</h1>

          <ul>
            {activities.map((activity) => (
              <div key={activity.name}>
                <li>{activity.name}</li>
                <button type="button" onClick={handleDelete(activity.id)}>
                  DELETE
                </button>
              </div>
            ))}
          </ul>

          <form onSubmit={handleSubmit}>
            <label>Description</label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />

            <label>Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <label>Cost</label>
            <input
              type="number"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
            />

            <button type="submit">Submit</button>
          </form>
        </S.Wrapper>
      </header>
    </div>
  );
};

export default App;
