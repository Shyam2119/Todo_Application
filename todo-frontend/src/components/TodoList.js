import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, filter, setFilter, onToggle, onDelete, onUpdate, loading }) => {
    const completedCount = todos.filter(t => t.completed).length;

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'active') return !todo.completed;
        return true;
    });

    return (
        <>
            {/* Filter Tabs */}
            <div className="filter-section">
                <div className="tabs">
                    <button
                        onClick={() => setFilter('all')}
                        className={`tab ${filter === 'all' ? 'tab-active' : ''}`}
                    >
                        All <span className="badge">{todos.length}</span>
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`tab ${filter === 'active' ? 'tab-active' : ''}`}
                    >
                        Active <span className="badge">{todos.length - completedCount}</span>
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`tab ${filter === 'completed' ? 'tab-active' : ''}`}
                    >
                        Completed <span className="badge">{completedCount}</span>
                    </button>
                </div>

                <div className="completed-info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 12l2 2 4-4" />
                    </svg>
                    <span className="completed-text">{completedCount} completed</span>
                </div>
            </div>

            {/* Todo List */}
            <div className="todo-list">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : filteredTodos.length === 0 ? (
                    <div className="empty-state">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                        <p className="empty-text">No todos yet. Add one above!</p>
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default TodoList;