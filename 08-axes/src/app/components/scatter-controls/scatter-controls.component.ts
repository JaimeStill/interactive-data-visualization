import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'scatter-controls',
  templateUrl: 'scatter-controls.component.html'
})
export class ScatterControlsComponent {
  @Input() width = 1700;
  @Input() height = 300;
  @Input() xPadding = 20;
  @Input() yPadding = 20;
  @Input() xTicks = 16;
  @Input() yTicks = 6;
  @Input() points = 50;
  @Input() fillColor = 'salmon';

  @Output() widthChange = new EventEmitter<number>();
  @Output() heightChange = new EventEmitter<number>();
  @Output() xPaddingChange = new EventEmitter<number>();
  @Output() yPaddingChange = new EventEmitter<number>();
  @Output() xTicksChange = new EventEmitter<number>();
  @Output() yTicksChange = new EventEmitter<number>();
  @Output() pointsChange = new EventEmitter<number>();
  @Output() fillColorChange = new EventEmitter<string>();
}
