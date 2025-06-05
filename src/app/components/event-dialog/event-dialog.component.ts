import {
  Component,
  inject,
  input,
  OnChanges,
  output,
} from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { IEvent } from '../../interfaces/event.interface';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventType } from '../../constants/event-type.contant';
import { EventStore } from '../../stories/events.store';

@Component({
  selector: 'app-event-dialog',
  imports: [
    Dialog,
    Select,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
  ],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.scss',
})
export class EventDialogComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(EventStore);

  readonly visible = input.required<boolean>();
  readonly editableEvent = input.required<IEvent | undefined>();
  readonly closeDialog = output<void>();

  readonly types = [
    { label: 'Sport', value: EventType.Sport },
    { label: 'Music', value: EventType.Music },
  ];

  readonly form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    description: [''],
    place: [''],
    type: [EventType.Sport as EventType, [Validators.required]],
    genre: ['', [Validators.required]],
    amount: [1, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    this.form.controls.genre.disable();

    this.form.controls.type.valueChanges.subscribe((type) => {
      if (type === 'sport') {
        this.form.controls.genre.disable();
        this.form.controls.amount.enable();
      }

      if (type === 'music') {
        this.form.controls.genre.enable();
        this.form.controls.amount.disable();
      }
    });
  }

  ngOnChanges(): void {
    const event = this.editableEvent();
    if (event) {
      this.form.patchValue(event);
    } else {
      this.form.reset();
    }
  }

  onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.onClose();
    }
  }

  onSave(): void {
    const payload = this.form.value;

    if (this.editableEvent()) {
      this.store.editEvent(payload.id, payload);
    } else {
      this.store.addEvent(payload);
    }

    this.onClose();
  }

  onClose(): void {
    this.closeDialog.emit();
  }
}
