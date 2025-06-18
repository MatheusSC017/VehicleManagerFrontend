import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ToggleService {
  activeSections: { [key: string]: boolean } = {};

  toggleSection(sectionId: string): void {
    this.activeSections[sectionId] = !this.activeSections[sectionId];
  }

  isActive(sectionId: string): boolean {
    return this.activeSections[sectionId];
  }

  getIconClass(sectionId: string): string {
    return this.isActive(sectionId) ? 'fa-chevron-up' : 'fa-chevron-down';
  }

}
