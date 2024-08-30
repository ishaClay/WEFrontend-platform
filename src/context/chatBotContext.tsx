import { createContext, useContext, useState } from "react";

type ChatBotContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ChatBotContext = createContext<ChatBotContextType>({
  open: false,
  setOpen: () => {},
});

export const ChatBotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <ChatBotContext.Provider value={{ open, setOpen }}>
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBotContext = () => {
  return useContext(ChatBotContext);
};
