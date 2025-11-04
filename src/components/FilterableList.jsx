import React, { useMemo, useState } from 'react';
import PeopleList from './PeopleList.jsx';
import { people as seed } from '../data/people.js';

/**
 * FilterableList
 * Shows filtering via .filter() and rendering via .map().
 * Includes:
 * - search box
 * - add person form
 * - key strategy selector (id, index, random)
 * - shuffle & remove-first buttons to visualize key problems
 */
export default function FilterableList() {
  const [people, setPeople] = useState(seed);
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [keyStrategy, setKeyStrategy] = useState('id');

  const filteredPeople = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return people;
    return people.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.profession.toLowerCase().includes(q)
    );
  }, [people, query]);

  function addPerson(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedProfession = profession.trim();
    if (!trimmedName || !trimmedProfession) return;

    // Stable, unique key: increment based on current max ID
    const nextId = (people.reduce((m, p) => Math.max(m, p.id), -1) ?? -1) + 1;

    setPeople((prev) => [
      ...prev,
      { id: nextId, name: trimmedName, profession: trimmedProfession },
    ]);
    setName('');
    setProfession('');
  }

  function resetData() {
    setPeople(seed);
    setQuery('');
    setName('');
    setProfession('');
    setKeyStrategy('id');
  }

  function shuffleList() {
    // Fisher-Yates shuffle
    const arr = [...people];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setPeople(arr);
  }

  function removeFirst() {
    if (people.length === 0) return;
    setPeople((prev) => prev.slice(1));
  }

  return (
    <section className="card">
      <div className="toolbar col-wrap">
        <div className="row">
          <input
            className="input"
            placeholder="Search by name or profession…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search people"
          />
          <button className="btn" onClick={resetData} type="button">
            Reset
          </button>
        </div>

        <div className="row">
          <label className="field-inline">
            <span>Key strategy</span>
            <select
              className="select"
              value={keyStrategy}
              onChange={(e) => setKeyStrategy(e.target.value)}
              aria-label="Key strategy"
            >
              <option value="id">id (recommended)</option>
              <option value="index">index (problematic)</option>
              <option value="random">random (bad)</option>
            </select>
          </label>

          <button className="btn" onClick={shuffleList} type="button">
            Shuffle
          </button>
          <button className="btn btn--danger" onClick={removeFirst} type="button">
            Remove first
          </button>
        </div>
      </div>

      <PeopleList items={filteredPeople} keyStrategy={keyStrategy} />

      <hr className="divider" />

      <form className="add-form" onSubmit={addPerson}>
        <h3>Add a person</h3>
        <div className="grid">
          <label className="field">
            <span>Name</span>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Ada Lovelace"
              aria-label="Name"
            />
          </label>
          <label className="field">
            <span>Profession</span>
            <input
              className="input"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="e.g., Programmer"
              aria-label="Profession"
            />
          </label>
        </div>
        <button className="btn btn--primary" type="submit">
          Add
        </button>
      </form>

      <details className="note">
        <summary>Why keys matter</summary>
        <p>
          React needs a stable <code>key</code> for each list item to track
          changes efficiently. Using <code>id</code> is recommended.
          Using the array index or a random value can cause subtle UI bugs
          when items are added, removed, or reordered.
        </p>
      </details>
    </section>
  );
}
