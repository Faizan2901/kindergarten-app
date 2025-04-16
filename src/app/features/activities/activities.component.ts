import { Component } from '@angular/core';
import { MemoryGameComponent } from '../memory-game.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activities',
  imports: [RouterLink],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {

}
