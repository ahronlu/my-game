import React from "react";

interface FormProps {
  onStartGame: (e: React.FormEvent) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const Form: React.FC<FormProps> = ({ onStartGame, name, setName }) => {
  return (
    <form className="form" onSubmit={onStartGame}>
      <input
        type="text"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">START</button>
    </form>
  );
};
