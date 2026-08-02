import { useState, useRef, useCallback, useEffect } from 'react';
import { INITIAL_ENEMIES, INITIAL_PLAYER, rand, isCrit, chance } from './data/enemies.js';
import BattleStage from './components/BattleStage.jsx';
import { EnemyStatus, PlayerStatus } from './components/StatusPanel.jsx';
import { ActionButtons, Roster, CombatLog, EndScreen, VictoryPopup } from './components/GameUI.jsx';

const TURN_DELAY  = 700;
const LUNGE_DELAY = 180;
const DEATH_DELAY = 620;

function cloneEnemies() {
  return INITIAL_ENEMIES.map(e => ({ ...e }));
}

export default function App() {
  const [player,      setPlayer]      = useState({ ...INITIAL_PLAYER });
  const [enemies,     setEnemies]     = useState(cloneEnemies());
  const [enemyIndex,  setEnemyIndex]  = useState(0);
  const [log,         setLog]         = useState([
    { text: `⚔ ${INITIAL_ENEMIES[0].name} — "${INITIAL_ENEMIES[0].title}" — enters the arena!`, cls: 'system' }
  ]);
  const [gameOver,    setGameOver]    = useState(null);
  const [busy,        setBusy]        = useState(false);
  const [popup,       setPopup]       = useState(null);

  // animations
  const [playerAnim,  setPlayerAnim]  = useState('');
  const [enemyAnim,   setEnemyAnim]   = useState('');
  const [shake,       setShake]       = useState(false);
  const [enemyDead,   setEnemyDead]   = useState(false);
  const [enemyEnter,  setEnemyEnter]  = useState(false);
  const [arenaFlash,  setArenaFlash]  = useState(''); // 'crit-flash' | 'fire-flash' | ''

  // floating numbers
  const [playerFloats, setPlayerFloats] = useState([]);
  const [enemyFloats,  setEnemyFloats]  = useState([]);
  const floatId = useRef(0);

  // one-time emergency heal (50 HP, once per full run)
  const [emergencyUsed, setEmergencyUsed] = useState(false);

  // enemy-level state (curse, rage stack)
  const [enemyAtkMod,   setEnemyAtkMod]   = useState(0);  // rage bonus
  const [playerAtkMod,  setPlayerAtkMod]  = useState(0);  // curse penalty (negative)

  // run-wide statistics
  const [stats, setStats] = useState({
    kills: 0,
    critsLanded: 0,
    totalDmgDealt: 0,
    totalDmgTaken: 0,
    specialsTriggered: 0
  });

  // background theme per enemy type
  const bgTheme = {
    'goblin':        'theme-goblin',
    'goblin-shaman': 'theme-shaman',
    'orc':           'theme-orc',
    'orc-warlord':   'theme-warlord',
    'dragon':        'theme-dragon'
  };

  const addLog = useCallback((text, cls) => {
    setLog(prev => {
      const next = [...prev, { text, cls }];
      return next.length > 80 ? next.slice(next.length - 80) : next;
    });
  }, []);

  const addPlayerFloat = (text, cls) => {
    const id = floatId.current++;
    setPlayerFloats(prev => [...prev, { id, text, cls }]);
  };
  const addEnemyFloat = (text, cls) => {
    const id = floatId.current++;
    setEnemyFloats(prev => [...prev, { id, text, cls }]);
  };
  const removePlayerFloat = id => setPlayerFloats(prev => prev.filter(f => f.id !== id));
  const removeEnemyFloat  = id => setEnemyFloats (prev => prev.filter(f => f.id !== id));

  const currentEnemy = enemies[enemyIndex];

  /* ── helpers ── */
  const triggerFlash = (type) => {
    setArenaFlash(type);
    setTimeout(() => setArenaFlash(''), 500);
  };

  const clearAnims = () => { setPlayerAnim(''); setEnemyAnim(''); };

  const animatePlayerAttack = (dmg, crit) => {
    setPlayerAnim('lunge-right');
    if (crit) triggerFlash('crit-flash');
    setTimeout(() => {
      setEnemyAnim('hit-flash');
      setShake(true);
      addEnemyFloat((crit ? '💥 ' : '') + '-' + dmg, crit ? 'crit' : 'dmg');
      setTimeout(() => setShake(false), 350);
    }, LUNGE_DELAY);
  };

  const animateEnemyAttack = (dmg, crit, fire) => {
    setEnemyAnim('lunge-left');
    if (fire) triggerFlash('fire-flash');
    else if (crit) triggerFlash('crit-flash');
    setTimeout(() => {
      setPlayerAnim('hit-flash');
      setShake(true);
      addPlayerFloat((fire ? '🔥 ' : crit ? '💥 ' : '') + '-' + dmg, fire ? 'fire' : crit ? 'crit' : 'dmg');
      setTimeout(() => setShake(false), 350);
    }, LUNGE_DELAY);
  };

  const animateHeal = amt => {
    setPlayerAnim('heal-glow');
    addPlayerFloat('+' + amt, 'heal-num');
  };

  /* ── single enemy hit on player (returns nextHp) ── */
  const applyEnemyHit = useCallback((enemySnap, playerPrev, fire = false) => {
    const crit    = !fire && isCrit();
    const base    = rand(5, enemySnap.attack + enemyAtkMod);
    const dmg     = fire ? Math.floor(base * 1.5) : crit ? Math.floor(base * 1.6) : base;
    const nextHp  = Math.max(0, playerPrev.hp - dmg);
    const label   = fire
      ? `🔥 Fire Breath! ${enemySnap.name} scorched you for ${dmg} damage!`
      : crit
        ? `💥 CRITICAL! ${enemySnap.name} struck you for ${dmg} damage!`
        : `${enemySnap.name} struck you for ${dmg} damage.`;
    const cls = fire ? 'fire-line' : crit ? 'crit-line' : 'hit';
    return { dmg, nextHp, label, cls, crit };
  }, [enemyAtkMod]);

  /* ── enemy turn (handles specials) ── */
  const runEnemyTurn = useCallback((enemySnap, currentPlayerState, onComplete) => {
    if (!enemySnap || enemySnap.hp <= 0) { onComplete(); return; }

    const special = INITIAL_ENEMIES[enemyIndex]?.special;
    const specialFired = special && chance(special.chance);

    // Pre-turn special effects
    if (specialFired) {
      setStats(s => ({ ...s, specialsTriggered: s.specialsTriggered + 1 }));

      if (special.id === 'rage') {
        setEnemyAtkMod(prev => prev + 4);
        addLog(`😤 ${enemySnap.name} enters a rage! +4 ATK`, 'special');
        addEnemyFloat('+4 ATK', 'special-float');
      }
      if (special.id === 'curse') {
        setPlayerAtkMod(prev => prev - 3);
        addLog(`🔮 ${enemySnap.name} curses you! -3 ATK`, 'special');
        addPlayerFloat('-3 ATK', 'curse-float');
      }
    }

    const isFireBreath = specialFired && special.id === 'firebreath';
    const isDouble     = specialFired && special.id === 'doublestrike';

    if (isFireBreath) {
      addLog(`🔥 ${enemySnap.name} unleashes Fire Breath!`, 'fire-line');
    }
    if (isDouble) {
      addLog(`⚡ ${enemySnap.name} attacks twice!`, 'special');
    }

    // First hit
    const hit1 = applyEnemyHit(enemySnap, currentPlayerState, isFireBreath);
    animateEnemyAttack(hit1.dmg, hit1.crit, isFireBreath);

    setTimeout(() => {
      clearAnims();
      const afterHit1Hp = Math.max(0, currentPlayerState.hp - hit1.dmg);
      addLog(hit1.label, hit1.cls);
      setStats(s => ({ ...s, totalDmgTaken: s.totalDmgTaken + hit1.dmg }));

      if (afterHit1Hp <= 0) {
        setPlayer(prev => ({ ...prev, hp: 0 }));
        addLog('☠ You have fallen in battle.', 'system');
        setGameOver('defeat');
        onComplete();
        return;
      }

      setPlayer(prev => ({ ...prev, hp: afterHit1Hp }));

      // Second hit from doublestrike
      if (isDouble) {
        setTimeout(() => {
          const hit2 = applyEnemyHit(enemySnap, { hp: afterHit1Hp }, false);
          animateEnemyAttack(hit2.dmg, hit2.crit, false);
          setTimeout(() => {
            clearAnims();
            const afterHit2Hp = Math.max(0, afterHit1Hp - hit2.dmg);
            addLog(hit2.label, hit2.cls);
            setStats(s => ({ ...s, totalDmgTaken: s.totalDmgTaken + hit2.dmg }));
            if (afterHit2Hp <= 0) {
              setPlayer(prev => ({ ...prev, hp: 0 }));
              addLog('☠ You have fallen in battle.', 'system');
              setGameOver('defeat');
            } else {
              setPlayer(prev => ({ ...prev, hp: afterHit2Hp }));
            }
            onComplete();
          }, TURN_DELAY);
        }, TURN_DELAY);
      } else {
        onComplete();
      }
    }, TURN_DELAY);
  }, [enemyIndex, applyEnemyHit, addLog]);

  /* ── popup continue ── */
  const handleContinueAfterPopup = () => {
    const nextIndex = enemyIndex + 1;
    if (nextIndex >= enemies.length) {
      setPopup(null);
      setGameOver('victory');
      return;
    }
    const nextEnemy = enemies[nextIndex];
    setPopup(null);
    setEnemyDead(false);
    setEnemyAtkMod(0);    // reset enemy modifiers for new enemy
    setPlayerAtkMod(0);   // reset curse when new enemy appears
    setEnemyIndex(nextIndex);
    setEnemyEnter(true);
    setTimeout(() => setEnemyEnter(false), 600);
    addLog(`⚔ ${nextEnemy.name} — "${nextEnemy.title}" — enters the arena!`, 'system');
    setBusy(false);
  };

  /* ── attack ── */
  const doAttack = useCallback(() => {
    if (gameOver || busy || popup) return;
    setBusy(true);

    const special = INITIAL_ENEMIES[enemyIndex]?.special;
    // goblin dodge check
    const dodged = special?.id === 'dodge' && chance(special.chance);

    if (dodged) {
      setStats(s => ({ ...s, specialsTriggered: s.specialsTriggered + 1 }));
      addLog(`🌀 ${currentEnemy.name} dodged your attack!`, 'special');
      addEnemyFloat('Dodge!', 'dodge-float');
      runEnemyTurn({ ...currentEnemy }, player, () => setBusy(false));
      return;
    }

    const crit    = isCrit();
    const base    = rand(15, Math.max(15, player.attack + playerAtkMod));
    const dmg     = crit ? Math.floor(base * 1.75) : base;

    const enemySnapshot = { ...currentEnemy, hp: Math.max(0, currentEnemy.hp - dmg) };
    setEnemies(prev => prev.map((e, i) => i === enemyIndex ? enemySnapshot : e));

    setStats(s => ({
      ...s,
      totalDmgDealt: s.totalDmgDealt + dmg,
      critsLanded: crit ? s.critsLanded + 1 : s.critsLanded
    }));

    addLog(
      crit
        ? `💥 CRITICAL HIT! You struck ${currentEnemy.name} for ${dmg} damage!`
        : `You attacked ${currentEnemy.name} for ${dmg} damage.`,
      crit ? 'crit-line' : 'hit'
    );
    animatePlayerAttack(dmg, crit);

    setTimeout(() => {
      clearAnims();
      if (enemySnapshot.hp <= 0) {
        addLog(`☠ ${currentEnemy.name} has been defeated!`, 'system');
        setStats(s => ({ ...s, kills: s.kills + 1 }));

        const defeated = INITIAL_ENEMIES[enemyIndex];
        if (defeated.atkBoost > 0) {
          setPlayer(prev => ({ ...prev, attack: prev.attack + defeated.atkBoost }));
          addLog(`✦ ${defeated.reward}`, 'reward');
          addPlayerFloat(`+${defeated.atkBoost} ATK`, 'reward-float');
        }

        setEnemyDead(true);
        setTimeout(() => {
          const nextIndex = enemyIndex + 1;
          const nextEnemy = nextIndex < enemies.length ? enemies[nextIndex] : null;
          setPopup({
            defeatedEnemy: { ...currentEnemy, ...enemySnapshot },
            nextEnemy,
            reward: defeated.reward,
            atkBoost: defeated.atkBoost
          });
        }, DEATH_DELAY);
      } else {
        runEnemyTurn(enemySnapshot, player, () => setBusy(false));
      }
    }, TURN_DELAY);
  }, [gameOver, busy, popup, enemyIndex, currentEnemy, player, playerAtkMod, enemies, runEnemyTurn, addLog]);

  /* ── heal ── */
  const doHeal = useCallback(() => {
    if (gameOver || busy || popup) return;
    setBusy(true);

    if (player.potions <= 0) {
      addLog('No potions left!', 'system');
      runEnemyTurn({ ...currentEnemy }, player, () => setBusy(false));
      return;
    }

    const amt = rand(30, 50);
    setPlayer(prev => ({
      ...prev,
      hp: Math.min(prev.maxHp, prev.hp + amt),
      potions: prev.potions - 1
    }));
    addLog(`✦ You drank a potion and healed ${amt} HP.`, 'heal-line');
    animateHeal(amt);

    setTimeout(() => {
      clearAnims();
      runEnemyTurn({ ...currentEnemy }, { ...player, hp: Math.min(player.maxHp, player.hp + amt) }, () => setBusy(false));
    }, TURN_DELAY);
  }, [gameOver, busy, popup, player, currentEnemy, runEnemyTurn, addLog]);

  /* ── emergency heal (once per game, +50 HP) ── */
  const doEmergencyHeal = useCallback(() => {
    if (gameOver || busy || popup || emergencyUsed) return;
    setBusy(true);
    setEmergencyUsed(true);

    const amt = 50;
    setPlayer(prev => ({
      ...prev,
      hp: Math.min(prev.maxHp, prev.hp + amt)
    }));
    addLog(`🆘 EMERGENCY HEAL! You restored ${amt} HP!`, 'emergency');
    triggerFlash('heal-flash');
    setPlayerAnim('heal-glow');
    addPlayerFloat(`+${amt}`, 'heal-num');

    setTimeout(() => {
      clearAnims();
      runEnemyTurn({ ...currentEnemy }, { ...player, hp: Math.min(player.maxHp, player.hp + amt) }, () => setBusy(false));
    }, TURN_DELAY);
  }, [gameOver, busy, popup, emergencyUsed, player, currentEnemy, runEnemyTurn, addLog]);

  /* ── keyboard shortcuts ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver || busy || popup) {
        if ((e.key === 'Enter' || e.key === ' ') && popup) handleContinueAfterPopup();
        return;
      }
      if (e.key === 'a' || e.key === 'A') doAttack();
      if (e.key === 'h' || e.key === 'H') doHeal();
      if (e.key === 'e' || e.key === 'E') doEmergencyHeal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver, busy, popup, doAttack, doHeal, doEmergencyHeal]);

  /* ── reset ── */
  const resetGame = () => {
    setPlayer({ ...INITIAL_PLAYER });
    setEnemies(cloneEnemies());
    setEnemyIndex(0);
    setLog([{ text: `⚔ ${INITIAL_ENEMIES[0].name} — "${INITIAL_ENEMIES[0].title}" — enters the arena!`, cls: 'system' }]);
    setGameOver(null);
    setPopup(null);
    setBusy(false);
    setPlayerAnim('');
    setEnemyAnim('');
    setShake(false);
    setEnemyDead(false);
    setEnemyEnter(false);
    setArenaFlash('');
    setEmergencyUsed(false);
    setEnemyAtkMod(0);
    setPlayerAtkMod(0);
    setPlayerFloats([]);
    setEnemyFloats([]);
    setStats({ kills: 0, critsLanded: 0, totalDmgDealt: 0, totalDmgTaken: 0, specialsTriggered: 0 });
  };

  const playerLow = player.hp / player.maxHp <= 0.25;
  const currentTheme = bgTheme[currentEnemy?.type] || '';

  return (
    <div className={`arena ${arenaFlash}`}>
      <div className="title">⚔ Warrior ⚔</div>
      <div className="subtitle">Turn-based battle for the kingdom</div>

      <Roster enemies={enemies} enemyIndex={enemyIndex} gameOver={gameOver} />

      {popup && (
        <VictoryPopup
          enemy={popup.defeatedEnemy}
          nextEnemy={popup.nextEnemy}
          reward={popup.reward}
          atkBoost={popup.atkBoost}
          onContinue={handleContinueAfterPopup}
        />
      )}

      {gameOver ? (
        <EndScreen result={gameOver} player={player} stats={stats} onRestart={resetGame} />
      ) : (
        <>
          <BattleStage
            enemyType={currentEnemy.type}
            enemyIndex={enemyIndex}
            totalEnemies={enemies.length}
            theme={currentTheme}
            playerAnim={playerAnim}
            enemyAnim={enemyAnim}
            enemyDead={enemyDead}
            enemyEnter={enemyEnter}
            shake={shake}
            playerFloats={playerFloats}
            enemyFloats={enemyFloats}
            removePlayerFloat={removePlayerFloat}
            removeEnemyFloat={removeEnemyFloat}
          />
          <EnemyStatus enemy={currentEnemy} atkMod={enemyAtkMod} />
          <PlayerStatus player={player} lowHp={playerLow} atkMod={playerAtkMod} />
          <ActionButtons
            onAttack={doAttack}
            onHeal={doHeal}
            onEmergency={doEmergencyHeal}
            disabled={busy || !!popup}
            healDisabled={player.potions <= 0}
            emergencyUsed={emergencyUsed}
          />
          <CombatLog log={log} />
        </>
      )}
    </div>
  );
}
