import "./styles.css";

import React, { useEffect, useState } from "react";

import api from "./services/api.js";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS - ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    const newRepository = response.data;

    setRepositories(repositoryOld => [
      ...repositoryOld,
      newRepository,
    ]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(
        repository => repository.id === id
      );

      setRepositories(repositoriesOld => repositoriesOld.filter(
        repository => repository.id !== id
      ));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({id, title}) => (
          <li key={id}>
            {title}

            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
