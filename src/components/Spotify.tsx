import React, { useState, useEffect, useCallback } from 'react';
import { Music, Disc, AlertCircle } from 'lucide-react';

const SPOTIFY_CLIENT_ID = '726d94c68c4f42b5a1c4167c9db6115d';
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/spotify-callback` : '';
const SCOPES = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state"
];

interface Track {
    name: string;
    artist: string;
    album: string;
    albumArt: string;
}

interface SpotifyToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    timestamp: number;
}

const Spotify: React.FC = () => {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [recentTracks, setRecentTracks] = useState<Track[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<SpotifyToken | null>(null);

    const refreshToken = useCallback(async (refreshToken: string) => {
        const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: SPOTIFY_CLIENT_ID,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        const newToken: SpotifyToken = {
            access_token: data.access_token,
            expires_in: data.expires_in,
            refresh_token: data.refresh_token || refreshToken,
            timestamp: Date.now(),
        };

        localStorage.setItem('spotifyToken', JSON.stringify(newToken));
        return newToken;
    }, []);

    const getValidToken = useCallback(async (): Promise<string | null> => {
        const storedToken = localStorage.getItem('spotifyToken');
        if (!storedToken) return null;

        const parsedToken: SpotifyToken = JSON.parse(storedToken);
        const now = Date.now();
        const expirationTime = parsedToken.timestamp + parsedToken.expires_in * 1000;

        if (now < expirationTime) {
            setToken(parsedToken);
            return parsedToken.access_token;
        }

        try {
            const newToken = await refreshToken(parsedToken.refresh_token);
            setToken(newToken);
            return newToken.access_token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            localStorage.removeItem('spotifyToken');
            setToken(null);
            return null;
        }
    }, [refreshToken]);

    useEffect(() => {
        const initializeToken = async () => {
            const validToken = await getValidToken();
            if (validToken) {
                fetchCurrentTrack(validToken);
                fetchRecentTracks(validToken);
            }
        };

        initializeToken();
    }, [getValidToken]);

    useEffect(() => {
        const handleCallback = async () => {
            const hash = window.location.hash;
            if (hash) {
                const params = new URLSearchParams(hash.substring(1));
                const accessToken = params.get("access_token");
                const expiresIn = params.get("expires_in");
                const error = params.get("error");

                if (accessToken && expiresIn) {
                    const newToken: SpotifyToken = {
                        access_token: accessToken,
                        expires_in: parseInt(expiresIn, 10),
                        refresh_token: '', // We don't get a refresh token in implicit grant
                        timestamp: Date.now(),
                    };
                    localStorage.setItem('spotifyToken', JSON.stringify(newToken));
                    setToken(newToken);
                    window.history.replaceState(null, '', window.location.pathname);
                } else if (error) {
                    setError(`Spotify Auth Error: ${error}`);
                }
            }
        };

        handleCallback();
    }, []);

    const fetchCurrentTrack = async (accessToken: string) => {
        try {
            const currentResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (currentResponse.status === 200) {
                const currentData = await currentResponse.json();
                setCurrentTrack({
                    name: currentData.item.name,
                    artist: currentData.item.artists[0].name,
                    album: currentData.item.album.name,
                    albumArt: currentData.item.album.images[0]?.url || '/api/placeholder/96/96'
                });
                setIsPlaying(currentData.is_playing);
            }
        } catch (err: unknown) {
            console.error('Error fetching current track:', err);
        }
    };

    const fetchRecentTracks = async (accessToken: string) => {
        try {
            const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=3', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (recentResponse.ok) {
                const recentData = await recentResponse.json();
                setRecentTracks(recentData.items.map((item: any) => ({
                    name: item.track.name,
                    artist: item.track.artists[0].name,
                    album: item.track.album.name,
                    albumArt: item.track.album.images[0]?.url || '/api/placeholder/48/48'
                })));
            } else {
                const errorData = await recentResponse.json();
                setError(`API Error: ${errorData.error?.message || 'Unknown error'}`);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError('Error fetching Spotify data: ' + err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    useEffect(() => {
        if (token?.access_token) {
            fetchCurrentTrack(token.access_token);
            fetchRecentTracks(token.access_token);

            const currentTrackInterval = setInterval(() => fetchCurrentTrack(token.access_token), 5000); // Refresh every 5 seconds
            const recentTracksInterval = setInterval(() => fetchRecentTracks(token.access_token), 10000); // Refresh every 10 seconds

            return () => {
                clearInterval(currentTrackInterval);
                clearInterval(recentTracksInterval);
            };
        }
    }, [token]);

    const login = () => {
        window.location.href = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(" "))}&response_type=token&show_dialog=true`;
    };

    const RecentTrackItem: React.FC<{ track: Track }> = ({ track }) => (
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700">
            <img src={track.albumArt} alt={track.album} className="w-12 h-12 rounded" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{track.name}</p>
                <p className="text-xs text-gray-400 truncate">{track.artist}</p>
            </div>
        </div>
    );

    if (error) {
        return (
            <div className="col-span-4 bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 text-red-400 mb-4">
                    <AlertCircle className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">Error</h2>
                </div>
                <p className="text-gray-300 mb-4">{error}</p>
                {error.includes('invalid_client') && (
                    <div className="bg-gray-700 p-4 rounded-lg text-sm text-gray-300">
                        <p className="mb-2">This error might be due to an invalid client configuration. Please ensure:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>The Spotify Client ID is correct</li>
                            <li>The Redirect URI is properly set in your Spotify Developer Dashboard</li>
                            <li>Your app is properly configured to handle the redirect</li>
                        </ul>
                    </div>
                )}
                <button
                    onClick={() => {
                        setError(null);
                        login();
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="col-span-4 bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center min-h-64">
                <Music className="w-12 h-12 text-gray-400 mb-4" />
                <button
                    onClick={login}
                    className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-500 font-semibold"
                >
                    Connect with Spotify
                </button>
            </div>
        );
    }

    return (
        <div className="col-span-4 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-300 flex items-center">
                <Music className="w-6 h-6 mr-2" />
                Spotify
            </h2>

            {currentTrack ? (
                <div className="flex items-center">
                    <div className="w-24 h-24 bg-gray-700 rounded-lg mr-4 overflow-hidden">
                        {currentTrack.albumArt ? (
                            <img
                                src={currentTrack.albumArt}
                                alt={currentTrack.album}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Disc className="w-12 h-12 text-gray-500" />
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-xl font-bold text-gray-200">{currentTrack.name}</p>
                        <p className="text-lg text-gray-400">{currentTrack.artist}</p>
                        <p className="text-sm text-gray-500">{currentTrack.album}</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-24">
                    <p className="text-gray-400">No track currently playing</p>
                </div>
            )}

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Recently Played</h3>
                <div className="space-y-2">
                    {recentTracks.map((track, index) => (
                        <RecentTrackItem key={index} track={track} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Spotify;

