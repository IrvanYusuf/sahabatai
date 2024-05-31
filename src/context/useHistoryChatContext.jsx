import { createContext, useContext, useState } from "react";

const UserHistoryChatContext = createContext();

export const HistoryChatsProvider = ({ children }) => {
  const [historyChats, setHistoryChats] = useState([]);

  return (
    <UserHistoryChatContext.Provider value={{ historyChats, setHistoryChats }}>
      {children}
    </UserHistoryChatContext.Provider>
  );
};

export const useHistoryChats = () => useContext(UserHistoryChatContext);
