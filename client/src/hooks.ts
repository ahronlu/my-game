import { useEffect } from "react";
import { GAME_STATE, MESSAGE_TYPE } from "./const";
import { randomIntFromInterval } from "./utils";

export const useEffectGameLevelAndTimer = ({
  gameState,
  gameWidth,
  handleSetGameOver,
  setLeftPosition,
}: {
  gameState: string;
  gameWidth: number;
  handleSetGameOver: (message?: string) => void;
  setLeftPosition: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    if (gameState !== GAME_STATE.playing) {
      return;
    }

    const leftOrRight = randomIntFromInterval(0, 1);
    if (leftOrRight === 0) {
      // generate left position
      setLeftPosition(randomIntFromInterval(0, gameWidth / 2 - 220));
    } else {
      // generate right position
      setLeftPosition(randomIntFromInterval(gameWidth / 2 + 200, gameWidth - 20));
    }

    const gameOverTimer = setTimeout(handleSetGameOver, 1000);

    return () => {
      clearTimeout(gameOverTimer);
    };
  }, [gameWidth, handleSetGameOver, gameState, setLeftPosition]);
};

export const useEffectHandleKeyboardInput = ({
  name,
  level,
  gameState,
  handleSetGameOver,
  timer,
  gameWidth,
  leftPosition,
  setFeedback,
  setLevel,
}: {
  name: string;
  level: number;
  gameState: string;
  handleSetGameOver: (message?: string) => void;
  timer: any;
  gameWidth: number;
  leftPosition: number;
  setFeedback: React.Dispatch<React.SetStateAction<{ message: string; type: string } | null>>;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    if (gameState !== GAME_STATE.playing && gameState !== GAME_STATE.loading) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState === GAME_STATE.loading) {
        handleSetGameOver("Too soon");
        clearTimeout(timer);
        return;
      }
      if (["l", "a"].includes(event.key)) {
        if (leftPosition < gameWidth / 2 && event.key === "a") {
          setLevel((prevLevel) => prevLevel + 1);
          setFeedback({
            message: "Success",
            type: MESSAGE_TYPE.success,
          });
        } else if (leftPosition > gameWidth / 2 && event.key === "l") {
          setLevel((prevLevel) => prevLevel + 1);
          setFeedback({
            message: "Success",
            type: MESSAGE_TYPE.success,
          });
        } else {
          handleSetGameOver(`Wrong key, you've reached level ${level - 1}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState, leftPosition, gameWidth, level, name, handleSetGameOver, setFeedback, setLevel, timer]);
};

export const useEffectInitializeGameWidth = ({
  gameRef,
  setGameWidth,
}: {
  gameRef: React.MutableRefObject<HTMLDivElement | null>;
  setGameWidth: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    if (gameRef.current) {
      setGameWidth(gameRef.current.offsetWidth);
    }
  }, [gameRef, setGameWidth]);
};
