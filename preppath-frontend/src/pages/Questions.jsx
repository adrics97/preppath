import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [filterCategory, setFilterCategory] = useState('ALL');
    const [filterDifficulty, setFilterDifficulty] = useState('ALL');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'ALGORITHMS',
        difficulty: 'MEDIUM',
        answer: '',
        hints: '',
        notes: '',
        sourceUrl: '',
        isFavorite: false,
    });

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await api.get('/questions');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/questions', formData);
            setShowModal(false);
            resetForm();
            fetchQuestions();
        } catch (error) {
            console.error('Error creating question:', error);
            alert('Error creating question. Please try again.');
        }
    };

    const handleToggleFavorite = async (id) => {
        try {
            await api.patch(`/questions/${id}/favorite`);
            fetchQuestions();
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;

        try {
            await api.delete(`/questions/${id}`);
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('Error deleting question.');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: 'ALGORITHMS',
            difficulty: 'MEDIUM',
            answer: '',
            hints: '',
            notes: '',
            sourceUrl: '',
            isFavorite: false,
        });
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            EASY: 'bg-green-100 text-green-800',
            MEDIUM: 'bg-yellow-100 text-yellow-800',
            HARD: 'bg-red-100 text-red-800',
        };
        return colors[difficulty] || 'bg-gray-100 text-gray-800';
    };

    const getCategoryIcon = (category) => {
        const icons = {
            ALGORITHMS: '🧮',
            DATA_STRUCTURES: '📊',
            SYSTEM_DESIGN: '🏗️',
            BEHAVIORAL: '💬',
            JAVASCRIPT: '🟨',
            JAVA: '☕',
            PYTHON: '🐍',
            SQL: '🗄️',
            REACT: '⚛️',
            SPRING: '🍃',
            OTHER: '📝',
        };
        return icons[category] || '📝';
    };

    const filteredQuestions = questions.filter(q => {
        const categoryMatch = filterCategory === 'ALL' || q.category === filterCategory;
        const difficultyMatch = filterDifficulty === 'ALL' || q.difficulty === filterDifficulty;
        const favoriteMatch = !showFavoritesOnly || q.isFavorite;
        return categoryMatch && difficultyMatch && favoriteMatch;
    });

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-xl text-gray-600">Loading questions...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Question Bank</h1>
                            <p className="text-gray-600 mt-1">Build your interview prep library</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center space-x-2"
                        >
                            <span>➕</span>
                            <span>New Question</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="space-y-4">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {['ALL', 'ALGORITHMS', 'DATA_STRUCTURES', 'SYSTEM_DESIGN', 'BEHAVIORAL',
                                        'JAVASCRIPT', 'JAVA', 'PYTHON', 'SQL', 'REACT', 'SPRING'].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setFilterCategory(cat)}
                                                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${filterCategory === cat
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {cat === 'ALL' ? 'All' : cat.replace('_', ' ')}
                                            </button>
                                        ))}
                                </div>
                            </div>

                            {/* Difficulty & Favorites Filter */}
                            <div className="flex flex-wrap gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                                    <div className="flex gap-2">
                                        {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((diff) => (
                                            <button
                                                key={diff}
                                                onClick={() => setFilterDifficulty(diff)}
                                                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${filterDifficulty === diff
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {diff}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Show</label>
                                    <button
                                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                        className={`px-4 py-1 rounded-lg text-sm font-medium transition ${showFavoritesOnly
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {showFavoritesOnly ? '⭐ Favorites Only' : 'Show All'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Questions List */}
                    {filteredQuestions.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <p className="text-gray-500 text-lg mb-4">No questions found</p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                            >
                                Add Your First Question
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredQuestions.map((question) => (
                                <div
                                    key={question.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="text-2xl">{getCategoryIcon(question.category)}</span>
                                                <h3 className="text-xl font-semibold text-gray-800">{question.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                                                    {question.difficulty}
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {question.category.replace('_', ' ')}
                                                </span>
                                            </div>

                                            {question.description && (
                                                <p className="text-gray-600 text-sm mb-3">{question.description}</p>
                                            )}

                                            {question.answer && (
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                                    <p className="text-xs font-semibold text-green-800 mb-1">Solution:</p>
                                                    <p className="text-sm text-gray-700">{question.answer}</p>
                                                </div>
                                            )}

                                            {question.hints && (
                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                                                    <p className="text-xs font-semibold text-yellow-800 mb-1">Hints:</p>
                                                    <p className="text-sm text-gray-700">{question.hints}</p>
                                                </div>
                                            )}

                                            {question.notes && (
                                                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg mb-3">
                                                    📝 {question.notes}
                                                </p>
                                            )}

                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                <span>🎯 Practiced: {question.timesPracticed} times</span>
                                                {question.sourceUrl && (
                                                    <a
                                                        href={question.sourceUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        🔗 Source
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex space-x-2 ml-4">
                                            <button
                                                onClick={() => handleToggleFavorite(question.id)}
                                                className={`text-2xl transition ${question.isFavorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'
                                                    }`}
                                                title={question.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                            >
                                                {question.isFavorite ? '⭐' : '☆'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(question.id)}
                                                className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div >

            {/* Create Question Modal */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">New Question</h2>
                                    <button
                                        onClick={() => {
                                            setShowModal(false);
                                            resetForm();
                                        }}
                                        className="text-gray-400 hover:text-gray-600 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Question Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., Two Sum Problem"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows="3"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Detailed problem description..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category *
                                            </label>
                                            <select
                                                required
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="ALGORITHMS">Algorithms</option>
                                                <option value="DATA_STRUCTURES">Data Structures</option>
                                                <option value="SYSTEM_DESIGN">System Design</option>
                                                <option value="BEHAVIORAL">Behavioral</option>
                                                <option value="JAVASCRIPT">JavaScript</option>
                                                <option value="JAVA">Java</option>
                                                <option value="PYTHON">Python</option>
                                                <option value="SQL">SQL</option>
                                                <option value="REACT">React</option>
                                                <option value="SPRING">Spring</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Difficulty
                                            </label>
                                            <select
                                                value={formData.difficulty}
                                                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="EASY">Easy</option>
                                                <option value="MEDIUM">Medium</option>
                                                <option value="HARD">Hard</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Solution
                                        </label>
                                        <textarea
                                            value={formData.answer}
                                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                            rows="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Your approach to solve this problem..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Hints
                                        </label>
                                        <textarea
                                            value={formData.hints}
                                            onChange={(e) => setFormData({ ...formData, hints: e.target.value })}
                                            rows="2"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Helpful hints for solving..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Notes
                                        </label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            rows="2"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Personal notes, patterns to remember..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Source URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.sourceUrl}
                                            onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="https://leetcode.com/problems/..."
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isFavorite"
                                            checked={formData.isFavorite}
                                            onChange={(e) => setFormData({ ...formData, isFavorite: e.target.checked })}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="isFavorite" className="ml-2 text-sm text-gray-700">
                                            ⭐ Mark as favorite
                                        </label>
                                    </div>

                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                                        >
                                            Create Question
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowModal(false);
                                                resetForm();
                                            }}
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Questions;