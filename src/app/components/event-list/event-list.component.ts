import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { EventStore } from '../../stories/events.store';
import { IEvent } from '../../interfaces/event.interface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

@Component({
  selector: 'app-event-list',
  imports: [TableModule, ButtonModule, EventDialogComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  private readonly store = inject(EventStore);

  readonly events = computed(() => this.store.events());
  readonly isLoading = computed(() => this.store.isLoading());
  readonly isError = computed(() => this.store.isError());

  readonly visibleEventDialog = signal(false);
  readonly editableEvent = signal<IEvent | undefined>(undefined);

  ngOnInit(): void {
    this.resetList();
  }

  resetList(): void {
    this.store.setDefaultState();
  }

  openDialog(event?: IEvent): void {
    this.editableEvent.set(event);
    this.visibleEventDialog.set(true);
  }

  closeDialog(): void {
    this.editableEvent.set(undefined);
    this.visibleEventDialog.set(false);
  }

  deleteEvent(id: string): void {
    this.store.deleteEvent(id);
  }
}
