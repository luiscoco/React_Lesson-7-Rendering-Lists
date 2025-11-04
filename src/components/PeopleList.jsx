import React from 'react';

/**
 * PeopleList
 * Renders a list of people with a selectable key strategy:
 *  - 'id' (correct, stable)
 *  - 'index' (incorrect, unstable when items change order/are removed)
 *  - 'random' (very bad; changes each render)
 */
export default function PeopleList({ items, keyStrategy = 'id' }) {
  if (!items.length) {
    return <p className="empty">No results. Try another filter.</p>;
  }

  const getKey = (person, index) => {
    switch (keyStrategy) {
      case 'index':
        return index;
      case 'random':
        return Math.random().toString(36).slice(2);
      case 'id':
      default:
        return person.id;
    }
  };

  return (
    <ul className="people-list">
      {items.map((person, index) => (
        <li key={getKey(person, index)} className="people-list__item">
          <span className="people-list__name">{person.name}</span>
          <span className="people-list__dot">•</span>
          <span className="people-list__profession">{person.profession}</span>
        </li>
      ))}
    </ul>
  );
}
