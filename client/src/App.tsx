import React, { useState, useRef } from "react";

import { Loader, Form, Indicator, Feedback } from "./components";
import { GAME_STATE } from "./const";
import { useHandlers } from "./useHandlers";
import {
  useEffectHandleKeyboardInput,
  useEffectGameLevelAndTimer,
  useEffectInitializeGameWidth,
} from "./hooks";

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<string>(GAME_STATE.waiting);
  const [feedback, setFeedback] = useState<{ message: string; type: string } | null>(null);
  const [level, setLevel] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [leftPosition, setLeftPosition] = useState<number>(0);
  const [gameWidth, setGameWidth] = useState<number>(0);
  const gameRef = useRef<HTMLDivElement | null>(null);

  let timer: any;

  const { handleSetGameOver, handleStartGame } = useHandlers({
    timer,
    name,
    gameState,
    setGameState,
    level,
    setLevel,
    setFeedback,
  });

  useEffectHandleKeyboardInput({
    name,
    level,
    gameState,
    handleSetGameOver,
    timer,
    gameWidth,
    leftPosition,
    setFeedback,
    setLevel,
  });

  useEffectInitializeGameWidth({ gameRef, setGameWidth });

  useEffectGameLevelAndTimer({ gameState, gameWidth, handleSetGameOver, setLeftPosition });

  return (
    <div className="game" ref={gameRef}>
      {gameState === GAME_STATE.waiting && (
        <Form onStartGame={handleStartGame} name={name} setName={setName} />
      )}
      {gameState === GAME_STATE.loading && <Loader />}
      {gameState === GAME_STATE.playing && <Indicator leftPosition={leftPosition} />}
      {feedback && <Feedback feedback={feedback} setFeedback={setFeedback} />}
    </div>
  );
};
