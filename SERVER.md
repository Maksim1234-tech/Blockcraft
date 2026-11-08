# Keeping a room open 24/7

A browser game can't run after its tab is closed, so a room normally dies with its host. Two things keep it alive:

1. **Host takeover (automatic).** If the host leaves while other players are in the room, the player with the lowest id becomes the new host with the same room code, saves the world on their computer, and everyone else reconnects by themselves.
2. **Bot host.** Run `server-bot.js` on a computer that stays on: it opens the game in a hidden browser, creates (or reloads) a world for the room code, and stays in it as a player called "Server".

```
npm install playwright
npx playwright install chromium
node server-bot.js https://YOUR-SITE.vercel.app ABCDE
```

Friends join with *Multiplayer* and the code. The world is stored in `./bot-data` (keep that folder to keep the world).
