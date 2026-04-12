
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '7138b5fd52c24d948b663502b210b592';
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || ''; // User will paste this

export interface SpotifyTrack {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
    preview_url: string | null;
    external_urls: { spotify: string };
}

class SpotifyService {
    private accessToken: string | null = null;
    private tokenExpiry: number = 0;

    async getAccessToken(): Promise<string> {
        if (this.accessToken && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }

        if (!CLIENT_SECRET) {
            throw new Error('Spotify Client Secret is missing. Please add it to your .env file.');
        }

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            },
            body: 'grant_type=client_credentials'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Spotify token error response:', errorText);

            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(errorJson.error_description || errorJson.error || `Token error: ${response.status}`);
            } catch (e) {
                throw new Error(errorText || `Token error: ${response.status} ${response.statusText}`);
            }
        }

        const data = await response.json();
        this.accessToken = data.access_token;
        this.tokenExpiry = Date.now() + (data.expires_in * 1000);
        return this.accessToken!;
    }

    async searchTracks(query: string): Promise<SpotifyTrack[]> {
        const token = await this.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Spotify search error response:', errorText);

            // Try to parse as JSON if possible, otherwise use raw text
            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(errorJson.error?.message || `Spotify search error: ${response.status}`);
            } catch (e) {
                throw new Error(errorText || `Spotify search error: ${response.status} ${response.statusText}`);
            }
        }

        const data = await response.json();
        return data.tracks.items;
    }

    async getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
        const token = await this.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data.items.map((item: any) => item.track);
    }
}

export const spotifyService = new SpotifyService();
