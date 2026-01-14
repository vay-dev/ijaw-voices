import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg',
  standalone: false,
  templateUrl: './svg.html',
  styleUrl: './svg.scss',
})
export class Svg {
  name = input<string>('');
}
