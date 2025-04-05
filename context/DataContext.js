"use client"; // Add this line at the very top

import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext({
  users: [],
  ngos: [],
  events: [],
  loading: false,
  error: null,
  refreshData: async () => {},
});

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const [usersRes, ngosRes, eventsRes] = await Promise.all([
        fetch("http://localhost:5000/get/users", { headers }),
        fetch("http://localhost:5000/get/ngos", { headers }),
        fetch("http://localhost:5000/get/events", { headers }),
      ]);

      const [usersData, ngosData, eventsData] = await Promise.all([
        usersRes.json(),
        ngosRes.json(),
        eventsRes.json(),
      ]);

      setUsers(usersData);
      setNgos(ngosData);
      setEvents(eventsData);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        users,
        ngos,
        events,
        loading,
        error,
        refreshData: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
