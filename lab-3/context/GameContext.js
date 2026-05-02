import React, { createContext, useState } from 'react';
import { Vibration } from 'react-native';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  
  // Додаємо нові поля, щоб вони були ініціалізовані за замовчуванням
  const [stats, setStats] = useState({
    clicks: 0,
    doubleClicks: 0,
    longPresses: 0,
    swipesLeft: 0,  // Додано
    swipesRight: 0, // Додано
    pinches: 0,
    pans: 0,        // Додано для завдання "Перетягнути"
  });

  const [settings, setSettings] = useState({
    vibration: true,
    darkTheme: false,
  });

  const addPoints = (amount, actionType) => {
    setScore(prev => prev + amount);
    
    if (actionType) {
      setStats(prev => ({
        ...prev,
        // Використовуємо (prev[actionType] || 0), щоб уникнути NaN, 
        // якщо ключ раптом не знайдено
        [actionType]: (prev[actionType] || 0) + 1
      }));
    }

    if (settings.vibration) {
      Vibration.vibrate(50);
    }
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetGame = () => {
    setScore(0);
    setStats({ 
      clicks: 0, 
      doubleClicks: 0, 
      longPresses: 0, 
      swipesLeft: 0, 
      swipesRight: 0, 
      pinches: 0, 
      pans: 0 
    });
  };

  return (
    <GameContext.Provider value={{ score, stats, settings, addPoints, toggleSetting, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};