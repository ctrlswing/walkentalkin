import axios from 'axios';

// Text-to-speech function using ElevenLabs API for Christopher Walken's voice
export async function generateWalkenSpeech(text: string): Promise<string> {
  try {
    // Get API key and Voice ID from environment variables
    const API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
    const VOICE_ID = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;
    
    if (!API_KEY || !VOICE_ID) {
      console.error('Missing API key or Voice ID. Check your .env.local file.');
      throw new Error('Missing API credentials');
    }
    
    // Make the API call to ElevenLabs
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.4,  // Lower for more expressiveness like Walken
          similarity_boost: 0.8  // Higher to capture his unique cadence
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': API_KEY
        },
        responseType: 'arraybuffer'
      }
    );
    
    // Convert the audio buffer to a blob URL for playback
    const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    
    return audioUrl;
  } catch (error) {
    console.error('Error generating Walken speech:', error);
    throw new Error('Failed to generate Christopher Walken speech');
  }
} 