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
  const [me, setMe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session_token")}`,
        Accept: "*/*",
      };

      const [usersRes, ngosRes, eventsRes, meRes] = await Promise.all([
        fetch("http://127.0.0.1:5000/get/users", { headers }),
        fetch("http://127.0.0.1:5000/get/ngos", { headers }),
        fetch("http://127.0.0.1:5000/get/events", { headers }),
        fetch("http://127.0.0.1:5000/auth/me", { headers }),
      ]);

      const [usersData, ngosData, eventsData, meData] = await Promise.all([
        usersRes.json(),
        ngosRes.json(),
        eventsRes.json(),
        meRes.json(),
      ]);

      setUsers(usersData);
      setNgos(ngosData);
      setEvents(eventsData);
      console.log(meData);
      setMe(meData);
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
        me,
        fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
