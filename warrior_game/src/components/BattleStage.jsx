import { PlayerSprite, EnemySprite } from './Sprites.jsx';
import FloatingNumber from './FloatingNumber.jsx';

export default function BattleStage({
  enemyType,
  enemyIndex,
  totalEnemies,
  theme,
  playerAnim,
  enemyAnim,
  enemyDead,
  enemyEnter,
  shake,
  playerFloats,
  enemyFloats,
  removePlayerFloat,
  removeEnemyFloat
}) {
  const enemyCls = [
    'sprite-wrap',
    'enemy-wrap',
    enemyAnim,
    enemyDead  ? 'enemy-death' : '',
    enemyEnter ? 'enemy-enter' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={`panel stage-panel ${theme}`}>
      {/* progress pips */}
      <div className="wave-counter">
        {Array.from({ length: totalEnemies }, (_, i) => (
          <span
            key={i}
            className={`wave-pip ${i < enemyIndex ? 'done' : i === enemyIndex ? 'active' : ''}`}
            title={`Enemy ${i + 1} of ${totalEnemies}`}
          />
        ))}
      </div>

      <div className={`stage ${shake ? 'shake' : ''}`}>
        <div className={`sprite-wrap player-wrap ${playerAnim}`}>
          <PlayerSprite />
          {playerFloats.map(f => (
            <FloatingNumber key={f.id} text={f.text} cls={f.cls} onDone={() => removePlayerFloat(f.id)} />
          ))}
        </div>

        <div className={enemyCls}>
          <EnemySprite type={enemyType} />
          {enemyFloats.map(f => (
            <FloatingNumber key={f.id} text={f.text} cls={f.cls} onDone={() => removeEnemyFloat(f.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
