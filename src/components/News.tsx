import React, { useState, useEffect, useCallback } from 'react';
import { Newspaper, AlertTriangle } from 'lucide-react';

interface NewsItem {
    title: string;
    published_at: string;
}

const News: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Fetching news...');
            const response = await fetch(
                'https://api.thenewsapi.com/v1/news/all?api_token=dQ0kDulHSHQdwrsWJm9texESCFgO4oCSracfmyfQ&language=pt&domains=observador.pt&categories=politics,general&sort=published_at&limit=3'
            );
            console.log('Response status:', response.status);
            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Error response body:', errorBody);
                throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Received data:', data);
            if (data.data && Array.isArray(data.data)) {
                const filteredNews = data.data.filter((item: { title: string; }) => !item.title.startsWith("As notícias da"));
                setNews(filteredNews);
            } else {
                throw new Error('Invalid data structure received from API');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(`Error fetching news: ${errorMessage}`);
            console.error('Error details:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews(); // Fetch news immediately when the component mounts

        // Set up an interval to fetch news every 15 minutes
        const intervalId = setInterval(fetchNews, 15 * 60 * 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [fetchNews]);

    return (
        <div className="col-span-4 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-gray-300 flex items-center">
                <Newspaper className="w-6 h-6 mr-2 mb-4" />
                Observador News
            </h2>
            {loading && <p className="text-gray-400">Loading news...</p>}
            {error && (
                <div className="text-red-500 flex items-start">
                    <AlertTriangle className="w-6 h-6 mr-2 flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold">{error}</p>
                        <p className="text-sm mt-2">
                            An error occurred while fetching the news. Please try again later.
                        </p>
                    </div>
                </div>
            )}
            {!loading && !error && news.length === 0 && (
                <p className="text-gray-400">No news articles available at the moment.</p>
            )}
            {!loading && !error && news.length > 0 && (
                <div className="grid grid-cols-1 gap-6 overflow-y-auto ">
                    {news.map((item, index) => (
                        <div key={index} className="border-b border-gray-700 pb-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-300">{item.title}</h3>
                            <div className="text-sm text-gray-500">
                                {new Date(item.published_at).toLocaleString(undefined, {
                                    dateStyle: 'short',
                                    timeStyle: 'short'
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default News;