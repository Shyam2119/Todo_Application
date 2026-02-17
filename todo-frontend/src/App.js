import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoService from './services/todoService';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await todoService.getAllTodos();
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todoData) => {
        try {
            const response = await todoService.createTodo(todoData);
            setTodos([response.data, ...todos]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleTodo = async (id) => {
        try {
            const response = await todoService.toggleTodoStatus(id);
            setTodos(todos.map(todo =>
                todo.id === id ? response.data : todo
            ));
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await todoService.deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const updateTodo = async (id, todoData) => {
        try {
            const response = await todoService.updateTodo(id, todoData);
            setTodos(todos.map(t =>
                t.id === id ? response.data : t
            ));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className="app-container">
            <div className="app-card">
                {/* Header */}
                <div className="app-header">
                    <div className="icon-container">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                    </div>
                    <h1 className="app-title">Todo App</h1>
                    <p className="app-subtitle">Stay organized, get things done</p>
                </div>

                {/* Add Todo Form */}
                <TodoForm onAdd={addTodo} />

                {/* Todo List with Filters */}
                <TodoList
                    todos={todos}
                    filter={filter}
                    setFilter={setFilter}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default App;