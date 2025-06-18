import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ImagePreviewService { 
    imagePreviews: string[] = [];

    onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    this.imagePreviews = [];

    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.imagePreviews.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }
}
