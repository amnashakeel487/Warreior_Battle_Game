import { useEffect, useRef } from 'react';

export function ActionButtons({ onAttack, onHeal, onEmergency, disabled, healDisabled, emergencyUsed }) {
  return (
    <div className="actions">
      <button className="action-btn attack" disabled={disabled} onClick={onAttack} title="[A] Attack">
        ⚔ Attack
        <span className="key-hint">A</span>
      </button>
      <button
        className="action-btn heal"
        disabled={disabled || healDisabled}
        onClick={onHeal}
        title={healDisabled ? 'No potions left' : '[H] Drink a potion'}
      >
        🧪 Heal
        <span className="key-hint">H</span>
      </button>
      <button
        className={`action-btn emergency ${emergencyUsed ? 'used' : ''}`}
        disabled={disabled || emergencyUsed}
        onClick={onEmergency}
        title={emergencyUsed ? 'Already used this run' : '[E] One-time emergency heal — +50 HP'}
      >
        {emergencyUsed ? '🚫 Used' : '🆘 +50 HP'}
        <span className="key-hint">{emergencyUsed ? '—' : 'E'}</span>
      </button>
    </div>
  );
}

export function Roster({ enemies, enemyIndex, gameOver }) {
  return (
    <div className="roster">
      {enemies.map((e, i) => {
        let cls = 'roster-item';
        if (i === enemyIndex && !gameOver) cls += ' current';
        if (i < enemyIndex || (i === enemyIndex && e.hp <= 0)) cls += ' defeated';
        return (
          <div key={e.name} className={cls} title={e.title}>
            {e.name}
          </div>
        );
      })}
    </div>
  );
}

export function CombatLog({ log }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [log]);

  return (
    <div className="log-panel" ref={ref} aria-live="polite" aria-label="Combat log">
      {log.map((l, i) => (
        <p key={i} className={`log-entry ${l.cls}`}>{l.text}</p>
      ))}
    </div>
  );
}

/** Per-enemy defeat popup */
export function VictoryPopup({ enemy, nextEnemy, reward, atkBoost, onContinue }) {
  const isFinalVictory = !nextEnemy;

  // allow Enter/Space to continue
  useEffect(() => {
    const fn = e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onContinue(); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onContinue]);

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Victory">
      <div className="popup-box">
        <div className="popup-icon">{isFinalVictory ? '🏆' : '💀'}</div>

        <div className="popup-title victory">
          {isFinalVictory ? 'All Enemies Slain!' : 'Enemy Defeated!'}
        </div>

        <div className="popup-enemy-name">{enemy.name}</div>
        <div className="popup-enemy-title">"{enemy.title}"</div>

        <div className="popup-divider" />

        {atkBoost > 0 && reward && (
          <div className="popup-reward">
            <span className="popup-reward-icon">⬆</span>
            {reward}
          </div>
        )}

        {isFinalVictory ? (
          <p className="popup-body">
            You have vanquished every foe.<br />The kingdom is at peace.
          </p>
        ) : (
          <p className="popup-body">
            A new challenger emerges from the shadows…<br />
            <span className="popup-next-name">{nextEnemy.name}</span>
            <span className="popup-next-title"> — {nextEnemy.title}</span>
          </p>
        )}

        <button className="popup-btn" onClick={onContinue} autoFocus>
          {isFinalVictory ? '✦ Claim Victory ✦' : '⚔ Face Next Enemy ⚔'}
          <span className="key-hint-popup">Enter</span>
        </button>
      </div>
    </div>
  );
}

export function EndScreen({ result, player, stats, onRestart }) {
  const victory = result === 'victory';
  return (
    <div className="panel end-screen">
      <div className="end-icon">{victory ? '🏆' : '💀'}</div>
      <div className={`end-title ${victory ? 'victory' : 'defeat'}`}>
        {victory ? 'Kingdom Saved!' : 'You Have Fallen'}
      </div>
      <div className="end-sub">
        {victory
          ? `All ${stats.kills} enemies vanquished. Final ATK: ${player.attack}.`
          : `You fell with ${player.hp} HP remaining.`}
      </div>

      {/* Battle stats grid */}
      <div className="stats-grid">
        <div className="stat-cell">
          <div className="stat-value">{stats.kills}</div>
          <div className="stat-label">Kills</div>
        </div>
        <div className="stat-cell">
          <div className="stat-value">{stats.critsLanded}</div>
          <div className="stat-label">Crits</div>
        </div>
        <div className="stat-cell">
          <div className="stat-value">{stats.totalDmgDealt}</div>
          <div className="stat-label">DMG Dealt</div>
        </div>
        <div className="stat-cell">
          <div className="stat-value">{stats.totalDmgTaken}</div>
          <div className="stat-label">DMG Taken</div>
        </div>
        <div className="stat-cell">
          <div className="stat-value">{stats.specialsTriggered}</div>
          <div className="stat-label">Specials</div>
        </div>
        <div className="stat-cell">
          <div className="stat-value">{player.potions}</div>
          <div className="stat-label">Potions Left</div>
        </div>
      </div>

      <div className="end-flavour">
        {victory
          ? 'The warrior rests as a legend of the kingdom.'
          : "Darkness reclaims the kingdom. Rise again, warrior."}
      </div>

      <button className="restart-btn" onClick={onRestart}>
        {victory ? '✦ Fight Again ✦' : '⚔ Try Again ⚔'}
      </button>
    </div>
  );
}
