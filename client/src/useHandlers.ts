import { useCallback } from "react";
import { GAME_STATE, MESSAGE_TYPE } from "./const";

interface UseHandlersProps {
  name: string;
  gameState: string;
  setGameState: React.Dispatch<React.SetStateAction<string>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  setFeedback: React.Dispatch<React.SetStateAction<{ message: string; type: string } | null>>;
  timer: any;
}

export const useHandlers = ({
  name,
  gameState,
  setGameState,
  level,
  setLevel,
  setFeedback,
  timer,
}: UseHandlersProps) => {
  const handleSetGamePlaying = useCallback(
    (gameTimer: any) => {
      if (gameState === GAME_STATE.over) {
        clearTimeout(gameTimer);
        return;
      }
      setGameState(GAME_STATE.playing);
      setLevel(1);
    },
    [gameState, setGameState, setLevel]
  );

  const handleStartGame = () => {
    if (!name) {
      alert("Please enter your name");
      return;
    }
    setGameState(GAME_STATE.loading);

    timer = setTimeout(() => {
      handleSetGamePlaying(timer);
    }, 1000);
  };

  const handleSetGameOver = useCallback(
    async (message?: string) => {
      setGameState(GAME_STATE.over);
      setFeedback({
        message: message || `Too late, you've reached level ${level - 1}`,
        type: MESSAGE_TYPE.mistake,
      });

      try {
        const genderResponse = await fetch(`https://api.genderize.io/?name=${name}`);
        const genderData = await genderResponse.json();

        const additionalDataResponse = await fetch(`https://randomuser.me/api/?gender=${genderData?.gender}`);
        const additionalData = await additionalDataResponse.json();

        const response = await fetch("http://localhost:5000/api/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            level,
            gender: genderData?.gender,
            additionalData: additionalData?.results[0],
          }),
        });

        const data = await response.json();

        if (response.status === 201) {
          console.log(data);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [name, level, setFeedback, setGameState]
  );

  return {
    handleSetGameOver,
    handleSetGamePlaying,
    handleStartGame,
  };
};
