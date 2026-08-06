# The Door to Our Story

A premium cinematic birthday web experience built with static HTML, CSS, and vanilla JavaScript.

## Run Locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
npx serve .
```

## Personalization

Edit `js/config.js` to configure:

- WhatsApp clue phone number
- WhatsApp clue message
- Accepted PINs
- Secret letter text

## Audio Assets

The app includes an audio manager and looks for optional files in:

- `assets/music/ambient.mp3`
- `assets/music/happy-birthday-instrumental.mp3`

If those files are absent, generated Web Audio tones still provide interaction feedback for knocks, unlocks, paper turns, typing, and celebration moments.

## Deployment

The project is static and Netlify-ready. Drag the project folder into Netlify Drop, or connect this directory to a Netlify site.
