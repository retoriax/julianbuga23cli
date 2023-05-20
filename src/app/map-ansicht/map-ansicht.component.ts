import { Component, EventEmitter, Output, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-map-ansicht',
  templateUrl: './map-ansicht.component.html',
  styleUrls: ['./map-ansicht.component.css']
})
export class MapAnsichtComponent {
  // Output event emitter for selected option
  @Output() ansichtOptionSelected = new EventEmitter<string>();

  // Default selected option
  selectedAnsichtOption = 'Freie Bewegung';

  // Flag to show/hide popup
  showPopupFlag = false;

  // Inject the element reference of this component
  constructor(private elementRef: ElementRef, private snackBar: MatSnackBar) { }

  // Show/hide popup when button is clicked
  showPopup() {
    // Toggle popup flag
    this.showPopupFlag = !this.showPopupFlag;

    if (this.showPopupFlag) {
      // Add click event listener to document to close popup if clicked outside of it
      document.addEventListener('click', this.closePopup.bind(this));
    } else {
      // Remove click event listener from document if popup is closed
      document.removeEventListener('click', this.closePopup.bind(this));
    }
  }

  // Close popup if clicked outside of it
  closePopup(event: MouseEvent) {
    // Check if clicked element is outside of the popup container
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Hide popup
      this.showPopupFlag = false;
      // Remove click event listener from document after closing popup
      document.removeEventListener('click', this.closePopup.bind(this));
    }
  }

  // Emit selected option when radio button is changed
  onAnsichtOptionSelected(selectedOption: string) {
    this.selectedAnsichtOption = selectedOption;
    this.ansichtOptionSelected.emit(selectedOption);

    // Show a notification based on the selected option
    switch (selectedOption) {
      case 'Freie Bewegung':
        this.showNotification('Jetzt kannst du dich frei auf der Karte bewegen.');
        break;
      case 'Luisenpark':
        this.showNotification('Jetzt bist du auf dem Luisenpark festgelegt.');
        break;
      case 'Spinellipark':
        this.showNotification('Jetzt bist du auf dem Spinelli festgelegt.');
        break;
      default:
        break;
    }
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Schließen', {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'top' // Position the notification at the top
    });
  }

  // Add event listeners for radio buttons on component initialization
  ngOnInit() {
    const luisenparkRadioBtn = document.getElementById('Luisenpark') as HTMLInputElement;
    if (luisenparkRadioBtn) {
      luisenparkRadioBtn.addEventListener('change', () => {
        this.onAnsichtOptionSelected('Luisenpark');
      });
    }

    const spinelliparkRadioBtn = document.getElementById('Spinellipark') as HTMLInputElement;
    if (spinelliparkRadioBtn) {
      spinelliparkRadioBtn.addEventListener('change', () => {
        this.onAnsichtOptionSelected('Spinellipark');
      });
    }
  }

}
