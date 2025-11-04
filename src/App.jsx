import React from 'react';
import FilterableList from './components/FilterableList.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Lesson 7: Rendering Lists</h1>
        <p>Explore mapping, filtering, and keys by interacting with the list below.</p>
      </header>

      <main className="app__main">
        <FilterableList />
      </main>

      <footer className="app__footer">
        <small>
          Built with React 19 + Vite. Try adding new items, toggling key strategies,
          shuffling the list, and removing items to observe React's reconciliation.
        </small>
      </footer>
    </div>
  );
}
