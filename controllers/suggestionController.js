import fetch from 'node-fetch';

export const getAISuggestions = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const pythonRes = await fetch('http://localhost:5001/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!pythonRes.ok) throw new Error('Python service error');

    const data = await pythonRes.json();

    if (!data.suggestions || data.suggestions.length === 0) {
      return res.json({ suggestions: [], message: 'no_reviews' });
    }

    res.json({ suggestions: data.suggestions });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};