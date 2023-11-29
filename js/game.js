'use strict';

(() => {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const game = (language = 'ru') => {
    let lang;
    try {
      lang = Intl.DisplayNames(['en'], {
        type: language}).of(language).slice(0, 2).toLowerCase();
    } catch (err) {
      lang = 'ru';
    }

    const result = {
      player: 0,
      computer: 0,
    };

    const languages = {
      ru: {
        figures: ['камень', 'ножницы', 'бумага'],
        isGoOut: 'Вы точно хотите покинуть игру?',
        isContinue: 'Еще?',
        result: 'Результат',
        computer: 'Компьютер',
        player: 'Игрок',
        you: 'Вы',
        draw: 'Ничья',
        youWon: 'Вы выйграли',
        computerWon: 'Компьютер выйграл',
      },
      en: {
        figures: ['rock', 'scissors', 'paper'],
        isGoOut: 'Are you sure you want to leave the game?',
        isContinue: 'More?',
        result: 'Result',
        computer: 'Computer',
        player: 'Player',
        you: 'You',
        draw: 'Draw',
        youWon: 'You won',
        computerWon: 'Computer won',
      },
    };

    const indexOfFirstElem =
      languages[lang].figures.indexOf(languages[lang].figures[0]);
    const indexOfLastElem = languages[lang].figures.indexOf(
        languages[lang].figures[languages[lang].figures.length - 1]);

    return function start() {
      const computer = languages[lang].figures[
          getRandomIntInclusive(indexOfFirstElem, indexOfLastElem)];

      let player = prompt(languages[lang].figures.join(', '));
      let resOfGame;

      if (player === '') {
        return start();
      }

      if (player === null) {
        const isGoOut = confirm(languages[lang].isGoOut);

        if (isGoOut) {
          alert(`
        ${languages[lang].result}:
          ${languages[lang].computer} ${result.computer}
          ${languages[lang].player} ${result.player}`);
          return;
        } else {
          return start();
        }
      }

      player = languages[lang].figures.find(item =>
        item.startsWith(player.toLowerCase()));

      if (!player) {
        return start();
      }

      if (player[0] === computer[0]) {
        resOfGame = languages[lang].draw;
      } else if (player[0] && computer[1] ||
        player[1] && computer[2] ||
        player[2] && computer[0]) {
        result.player++;
        resOfGame = languages[lang].youWon;
      } else {
        result.computer++;
        resOfGame = languages[lang].computerWon;
      }

      alert(`
        ${languages[lang].computer}: ${computer}
        ${languages[lang].you}: ${player}
        ${resOfGame}`);

      if (resOfGame === languages[lang].draw) {
        return start();
      }

      const isContinue = confirm(languages[lang].isContinue);

      if (isContinue) {
        return start();
      } else {
        alert(`
        ${languages[lang].result}:
          ${languages[lang].computer} ${result.computer}
          ${languages[lang].player} ${result.player}`);
      }
    };
  };

  window.rps = game;
})();
