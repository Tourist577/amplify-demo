import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../graphql/queries';

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleAddTodo = async () => {
    const text = prompt('Enter todo text');
    if (text) {
      await addTodo({
        variables: { text },
        refetchQueries: [{ query: GET_TODOS }],
      });
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {data.getTodos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo({ variables: { id: todo.id }, refetchQueries: [{ query: GET_TODOS }] })}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo({ variables: { id: todo.id }, refetchQueries: [{ query: GET_TODOS }] })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoList;
