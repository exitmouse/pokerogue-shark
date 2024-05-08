// ==UserScript==
// @name        Pokerogue trainer
// @namespace   Violentmonkey Scripts
// @match       http://localhost:8000
// @grant       none
// @version     1.0
// @author      https://github.com/exitmouse
// @description 5/8/2024, 12:57:30 PM
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/shortcut@1
// ==/UserScript==
const { register, reprShortcut } = VM.shortcut;

// Greasemonkey script
function inject_game() {
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import { Phase } from './src/phase.ts';

    Phase.prototype.start = function() {
          console.log(\`%cStart Injected Phase \${this.constructor.name}\`, "color:green;");
          if (this.scene.abilityBar.shown)
             this.scene.abilityBar.resetAutoHideTimer();
          window.currentScene = this.scene;
    }
  `;
  document.body.appendChild(script);
}

inject_game();

function give_vouchers() {
  window.console.log("Adding 5 premium vouchers");
  window.currentScene.gameData.voucherCounts[3] += 5;
}

function give_money() {
  window.console.log("Adding 2000 money");
  window.currentScene.addMoney(2000);
}

function poke_center() {
  window.currentScene.getParty().forEach((poke) => {
    poke.resetStatus();
    poke.hp = poke.getMaxHp();
    poke.moveset.forEach((move) => { move.ppUsed = 0; });
  });
}

register('g m', give_money);
register('g v', give_vouchers);
register('g p', poke_center);
