import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description || '');

    const handleUpdate = () => {
        if (!editTitle.trim()) return;

        onUpdate(todo.id, {
            title: editTitle.trim(),
            description: editDescription.trim(),
            completed: todo.completed
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(todo.title);
        setEditDescription(todo.description || '');
        setIsEditing(false);
    };

    const startEdit = () => {
        setEditTitle(todo.title);
        setEditDescription(todo.description || '');
        setIsEditing(true);
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
            {isEditing ? (
                /* Inline Edit Mode */
                <div className="edit-form">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="edit-input"
                        placeholder="Title"
                        autoFocus
                        onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="edit-textarea"
                        placeholder="Description (optional)"
                        rows="2"
                    />
                    <div className="edit-actions">
                        <button onClick={handleUpdate} className="save-button">
                            Save
                        </button>
                        <button onClick={handleCancel} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                /* Normal Display Mode */
                <>
                    <div className="todo-content">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                            className="todo-checkbox"
                        />
                        <div className="todo-text">
                            <div className={`todo-title ${todo.completed ? 'todo-title-completed' : ''}`}>
                                {todo.title}
                            </div>
                            {todo.description && (
                                <div className="todo-description">
                                    {todo.description}
                                </div>
                            )}
                            <div className="todo-date">
                                Created {new Date(todo.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })} • {new Date(todo.createdAt).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button
                            onClick={startEdit}
                            className="edit-button"
                            title="Edit"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDelete(todo.id)}
                            className="delete-button"
                            title="Delete"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;