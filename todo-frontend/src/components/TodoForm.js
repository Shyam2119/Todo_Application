import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showDescription, setShowDescription] = useState(false);

    const handleSubmit = () => {
        if (!title.trim()) return;

        onAdd({
            title: title.trim(),
            description: description.trim(),
            completed: false
        });

        setTitle('');
        setDescription('');
        setShowDescription(false);
    };

    return (
        <div className="input-section">
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    className="todo-input"
                />
                <button onClick={handleSubmit} className="add-button">
                    <span className="plus-icon">+</span> Add
                </button>
            </div>

            {showDescription ? (
                <textarea
                    placeholder="Add description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="todo-textarea"
                    rows="2"
                />
            ) : (
                <button
                    onClick={() => setShowDescription(true)}
                    className="description-toggle"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                    <span>Add description</span>
                </button>
            )}
        </div>
    );
};

export default TodoForm;