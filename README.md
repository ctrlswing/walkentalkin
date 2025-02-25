# Walkin Talkin

A text-to-speech web application that generates audio in the style of Christopher Walken's distinctive voice.

## Features

- Type or select text to be spoken in Christopher Walken's style
- Sample phrases to get started quickly
- Audio playback controls
- Modern, responsive UI built with Next.js and Tailwind CSS
- Toast notifications for user feedback

## Getting Started

### Prerequisites

- Node.js (version 18.x or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd walkentalk
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Implementation Details

### Demo Mode

This application currently runs in demo mode and returns a placeholder audio file. To integrate with a real text-to-speech API that can mimic Christopher Walken's voice, you would need to:

1. Set up an account with a TTS provider that supports voice cloning/voice styles (e.g., ElevenLabs, Play.ht, etc.)
2. Update the `generateWalkenSpeech` function in `src/lib/tts.ts` to use your API credentials
3. Create environment variables for your API keys (see `.env.example`)

### Example Integration with ElevenLabs

To integrate with ElevenLabs:

1. Create a `.env.local` file with your API key:
```
ELEVENLABS_API_KEY=your_api_key_here
ELEVENLABS_VOICE_ID=your_voice_id_here
```

2. Update the `generateWalkenSpeech` function in `src/lib/tts.ts` to make real API calls (uncomment the commented code and modify as needed)

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [use-sound](https://github.com/joshwcomeau/use-sound) - Sound playback

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for demonstration purposes. It does not use actual Christopher Walken voice data, and in a production environment, you would need to ensure you have the appropriate rights to create and use a voice that mimics a celebrity.
