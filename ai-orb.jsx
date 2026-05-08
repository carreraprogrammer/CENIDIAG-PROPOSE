import React from 'react';

export function AIOrb({ label = 'Asistente IA', compact = false, dark = false, onClick }) {
  return (
    <button
      type="button"
      className={`ai-orb ${compact ? 'ai-orb--compact' : ''} ${dark ? 'ai-orb--dark' : ''}`}
      aria-label={label}
      onClick={onClick}
    >
      <span className="ai-orb__hint">{label}</span>
      <span className="ai-orb__core" aria-hidden="true">
        <span className="ai-orb__nostril ai-orb__nostril--left" />
        <span className="ai-orb__nostril ai-orb__nostril--right" />
        <span className="ai-orb__spark ai-orb__spark--one" />
        <span className="ai-orb__spark ai-orb__spark--two" />
      </span>
    </button>
  );
}
