import axios from 'axios';

export const getAISuggestions = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    // Just send userId — Python handles everything else
    const pythonRes = await axios.post('http://localhost:5001/recommend', {
      userId: userId
    });

    const data = pythonRes.data;

    if (!data.suggestions || data.suggestions.length === 0) {
      return res.json({ suggestions: [], message: 'no_reviews' });
    }

    res.json({ suggestions: data.suggestions });

  } catch (err) {
    console.error('Suggestion error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};