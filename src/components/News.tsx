import React, { useState, useEffect } from 'react'
import { Newspaper, ExternalLink, AlertTriangle } from 'lucide-react'

interface NewsItem {
    title: string;
    description: string;
    url: string;
    source: string;
    published_at: string;
    categories: string[];
}

const News: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log('Fetching news...');
                const response = await fetch(
                    'https://api.thenewsapi.com/v1/news/all?api_token=dQ0kDulHSHQdwrsWJm9texESCFgO4oCSracfmyfQ&language=pt&domains=observador.pt&categories=politics,general&sort=published_at&limit=20'
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
        };

        fetchNews();
    }, []);

    return (
        <div className="col-span-8 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-300 flex items-center">
                <Newspaper className="w-6 h-6 mr-2" />
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
                <div className="grid grid-cols-2 gap-6 overflow-y-auto max-h-[600px]">
                    {news.map((item, index) => (
                        <div key={index} className="border-b border-gray-700 pb-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-300">{item.title}</h3>
                            <p className="text-gray-400 mb-2">{item.description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>{item.source}</span>
                                <span>{new Date(item.published_at).toLocaleString()}</span>
                            </div>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center text-blue-400 hover:text-blue-300"
                            >
                                Read more <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default News

