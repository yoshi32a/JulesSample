import { useState, useEffect } from 'react';
import './App.css';
import type { Journal } from './types';
import { fetchJournals, createJournal, updateJournal, deleteJournal } from './api';

function App() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadJournals();
  }, []);

  const loadJournals = async () => {
    const data = await fetchJournals();
    // Sort by date desc
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setJournals(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateJournal(editingId, { title, content });
      setEditingId(null);
    } else {
      await createJournal({ title, content });
    }
    setTitle('');
    setContent('');
    loadJournals();
  };

  const handleEdit = (journal: Journal) => {
    setTitle(journal.title);
    setContent(journal.content);
    setEditingId(journal.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this journal?')) {
      await deleteJournal(id);
      loadJournals();
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  return (
    <div className="container">
      <h1>My Journal</h1>

      <div className="form-container">
        <h2>{editingId ? 'Edit Journal' : 'New Entry'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
          />
          <div className="form-actions">
            <button type="submit">{editingId ? 'Update' : 'Post'}</button>
            {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="journal-list">
        {journals.map((journal) => (
          <div key={journal.id} className="journal-card">
            <div className="journal-header">
              <h3>{journal.title}</h3>
              <span className="date">{new Date(journal.date).toLocaleString()}</span>
            </div>
            <p className="journal-content">{journal.content}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(journal)}>Edit</button>
              <button onClick={() => handleDelete(journal.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
