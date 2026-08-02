export function EnemyStatus({ enemy, atkMod }) {
  const pct      = Math.round((enemy.hp / enemy.maxHp) * 100);
  const barClass = pct > 60 ? 'enemy-high' : pct > 25 ? 'enemy-mid' : 'enemy-low';
  const effectiveAtk = enemy.attack + (atkMod || 0);

  return (
    <div className="panel">
      <div className="combatant-row">
        <div>
          <span className="combatant-name enemy-name">{enemy.name}</span>
          <div className="combatant-subtitle">"{enemy.title}"</div>
        </div>
        <span className="hp-text">{enemy.hp} / {enemy.maxHp}</span>
      </div>

      {/* HP bar with 25% tick marks */}
      <div className="bar-track">
        <div className={`bar-fill ${barClass}`} style={{ width: `${pct}%` }} />
        <div className="bar-tick" style={{ left: '25%' }} />
        <div className="bar-tick" style={{ left: '50%' }} />
        <div className="bar-tick" style={{ left: '75%' }} />
      </div>

      <div className="stats-strip">
        <span>
          ⚔ ATK: {effectiveAtk}
          {atkMod > 0 && <span className="mod-badge rage-mod"> +{atkMod} 😤</span>}
        </span>
        <span className={pct <= 25 ? 'pct-warn' : ''}>{pct}% HP</span>
      </div>
    </div>
  );
}

export function PlayerStatus({ player, lowHp, atkMod }) {
  const pct          = Math.round((player.hp / player.maxHp) * 100);
  const effectiveAtk = Math.max(15, player.attack + (atkMod || 0));

  return (
    <div className={`panel ${lowHp ? 'low-hp-panel' : ''}`}>
      <div className="combatant-row">
        <div>
          <span className="combatant-name player-name">Warrior</span>
          {lowHp && <span className="low-hp-badge">⚠ Low HP</span>}
        </div>
        <span className="hp-text">{player.hp} / {player.maxHp}</span>
      </div>

      <div className="bar-track">
        <div
          className={`bar-fill player ${lowHp ? 'bar-low' : ''}`}
          style={{ width: `${pct}%` }}
        />
        <div className="bar-tick" style={{ left: '25%' }} />
        <div className="bar-tick" style={{ left: '50%' }} />
        <div className="bar-tick" style={{ left: '75%' }} />
      </div>

      <div className="stats-strip">
        <span>
          ⚔ ATK: 15–{effectiveAtk}
          {atkMod < 0 && <span className="mod-badge curse-mod"> {atkMod} 🔮</span>}
        </span>
        <span className="gold">🧪 Potions: {player.potions}</span>
      </div>
    </div>
  );
}
