import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView, Directions } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { GameContext } from '../context/GameContext'; 

export default function GameScreen() {
  const { score, addPoints, settings } = useContext(GameContext);

  const handleAction = (points, type) => {
    addPoints(points, type);
  };

  const handleRandomSwipe = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    addPoints(random, 'swipes');
  };

  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => { offset.value = { x: e.translationX + start.value.x, y: e.translationY + start.value.y }; })
    .onEnd(() => { start.value = { x: offset.value.x, y: offset.value.y }; });

  const flingGesture = Gesture.Fling().direction(Directions.RIGHT | Directions.LEFT)
    .onEnd(() => { runOnJS(handleRandomSwipe)(); });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => { scale.value = savedScale.value * e.scale; })
    .onEnd(() => { runOnJS(handleAction)(5, 'pinches'); scale.value = withSpring(1); savedScale.value = 1; });

  const singleTap = Gesture.Tap().onEnd((_, success) => { if (success) runOnJS(handleAction)(1, 'clicks'); });
  const doubleTap = Gesture.Tap().numberOfTaps(2).onEnd((_, success) => { if (success) runOnJS(handleAction)(10, 'doubleClicks'); });
  const longPress = Gesture.LongPress().minDuration(800).onEnd((_, success) => { if (success) runOnJS(handleAction)(50, 'longPresses'); });

  const composedGesture = Gesture.Race(flingGesture, panGesture, pinchGesture, Gesture.Exclusive(doubleTap, singleTap, longPress));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value.x }, { translateY: offset.value.y }, { scale: scale.value }],
  }));

  const bgColor = settings.darkTheme ? '#1e272e' : '#f5f7fa';
  const textColor = settings.darkTheme ? '#fff' : '#888';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View style={[styles.scoreBadge, {backgroundColor: bgColor}]}><Text style={styles.scoreText}>Очки: {score}</Text></View>

        <View style={styles.gameBox}>
          <GestureDetector gesture={composedGesture}>
            <Animated.View style={[styles.target, animatedStyle]}><Text style={styles.targetText}>ABOBA</Text></Animated.View>
          </GestureDetector>
        </View>
        <Text style={[styles.hint, {color: textColor}]}>Тикни - матимеш очко{"\n"}Двічі тикни - 10 очок{"\n"}Притисни - 50 очок{"\n"}Свайпни - ??? очок{"\n"}Розтягни - 5 очок</Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', alignItems: 'center' },
  scoreBadge: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
    elevation: 4,
  },
  scoreText: { fontSize: 24, fontWeight: 'bold', color: '#4a90e2' },
  gameBox: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  target: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  targetText: { color: '#fff', fontWeight: '900', fontSize: 20 },
  hint: { marginBottom: 100, color: '#888', fontStyle: 'italic', textAlign: 'center' }
});