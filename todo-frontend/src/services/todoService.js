import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/todos';

class TodoService {
    // Get all todos
    getAllTodos(completed = null) {
        const url = completed !== null
            ? `${API_BASE_URL}?completed=${completed}`
            : API_BASE_URL;
        return axios.get(url);
    }

    // Get todo by ID
    getTodoById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    }

    // Create new todo
    createTodo(todo) {
        return axios.post(API_BASE_URL, todo);
    }

    // Update todo
    updateTodo(id, todo) {
        return axios.put(`${API_BASE_URL}/${id}`, todo);
    }

    // Toggle todo completion
    toggleTodoStatus(id) {
        return axios.patch(`${API_BASE_URL}/${id}/toggle`);
    }

    // Delete todo
    deleteTodo(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }
}

export default new TodoService();