import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

type ThemeType = 'islamic' | 'animals' | 'fruits';

interface Card {
  id: number;
  icon: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [NgFor],
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.scss'
})
export class MemoryGameComponent {
  currentTheme: ThemeType = 'islamic';

  themes: Record<ThemeType, { icon: string; label: string }[]> = {
    islamic: [
      { icon: '🕌', label: 'Masjid' },
      { icon: '🌙', label: 'Moon' },
      { icon: '📿', label: 'Tasbeeh' }
    ],
    animals: [
      { icon: '🐘', label: 'Elephant' },
      { icon: '🐪', label: 'Camel' },
      { icon: '🐤', label: 'Chick' }
    ],
    fruits: [
      { icon: '🍎', label: 'Apple' },
      { icon: '🍌', label: 'Banana' },
      { icon: '🍇', label: 'Grapes' }
    ]
  };

  cards: Card[] = [];
  flippedCards: Card[] = [];

  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    const selectedSet = this.themes[this.currentTheme]; // ✅ No TS error now
    const cardSet = selectedSet.flatMap((item, index) => [
      { id: index * 2, icon: item.icon, label: item.label, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, icon: item.icon, label: item.label, isFlipped: false, isMatched: false }
    ]);
    this.cards = this.shuffleArray(cardSet);
    this.flippedCards = [];
  }

  shuffleArray(array: Card[]): Card[] {
    return array.sort(() => Math.random() - 0.5);
  }

  flipCard(card: Card) {
    if (card.isFlipped || card.isMatched || this.flippedCards.length === 2) return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      setTimeout(() => {
        const [first, second] = this.flippedCards;
        if (first.label === second.label) {
          first.isMatched = true;
          second.isMatched = true;
        } else {
          first.isFlipped = false;
          second.isFlipped = false;
        }
        this.flippedCards = [];
      }, 1000);
    }
  }

  changeTheme(theme: ThemeType) {
    this.currentTheme = theme;
    this.initializeGame();
  }
}
