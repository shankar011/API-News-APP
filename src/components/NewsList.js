import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchNews();
    }, [searchTerm, page]);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/news?q=${searchTerm}&page=${page}`);
            setNews(response.data.articles);
        } catch (error) {
            console.error('Error fetching news', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchNews();
    };

    const handlePageChange = (direction) => {
        setPage((prev) => (direction === 'next' ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="container my-5">
            <h1>ACONEWS</h1>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary my-3">Search</button>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {news.map((article, index) => (
                        <div className="card mb-3" key={index}>
                            <img src={article.image} className="card-img-top" alt={article.title} />
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={() => handlePageChange('prev')}>
                            Previous
                        </button>
                        <button className="btn btn-secondary" onClick={() => handlePageChange('next')}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsList;
