// src/app/typing-effect.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typing-effect',
  template: '<span>{{ displayText }}</span>',
  styles: [],
})
export class TypingEffectComponent implements OnInit {
  @Input() text: string = '';
  displayText: string = '';

  ngOnInit(): void {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      this.displayText += this.text[currentIndex];
      currentIndex++;
      if (currentIndex === this.text.length) {
        clearInterval(intervalId);
      }
    }, 50);
  }
}
