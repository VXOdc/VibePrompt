---
title: Build a Tiny Browser Music Machine
description: Create a playful musical instrument from a grid of notes, rhythms, and tactile visual feedback.
category: Creative Coding
tags: [music, creative coding, audio, interactive]
difficulty: advanced
agents: [Codex, Cursor, General]
technologies: [Web Audio API, TypeScript]
added: "10.16.26"
---

# Objective

Build a browser-based music toy that lets a curious beginner create a short looping pattern without needing music theory.

# Instrument

- Provide a small step sequencer with a clear beat grid and a few complementary sound choices.
- Let the player start, pause, clear, and change tempo.
- Give immediate visual feedback for the active beat and selected notes.
- Include a few playable presets that can be remixed.

# Interaction and accessibility

Start audio only after a user gesture. Show the current sound state and provide a master volume control. Support keyboard and pointer input, accessible labels for grid cells, and reduced motion. Keep controls stable in size while their states change.

# Art direction

Give the instrument a tactile identity inspired by [reference or mood]. Keep the sequencer central, the palette concise, and visual rhythm aligned with the sound. Avoid motion that distracts from timing.

# Acceptance criteria

- A first-time visitor can hear a preset and create a loop quickly.
- Tempo, volume, playback, and clearing behave predictably.
- The experience remains usable without relying on color alone.
