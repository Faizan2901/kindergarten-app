import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [NgFor,NgIf],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  galleryImages = [
    { url: 'assets/gallery/IMG_2552.jpg', alt: 'Photo 1', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2549.jpg', alt: 'Photo 2', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2516.jpg', alt: 'Photo 3', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2518.jpg', alt: 'Photo 4', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2519.jpg', alt: 'Photo 5', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2525.jpg', alt: 'Photo 6', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2526.jpg', alt: 'Photo 7', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2529.jpg', alt: 'Photo 8', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2534.jpg', alt: 'Photo 9', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2537.jpg', alt: 'Photo 10', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2538.jpg', alt: 'Photo 11', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2544.jpg', alt: 'Photo 12', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2547.jpg', alt: 'Photo 13', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2594.jpg', alt: 'Photo 14', caption: 'Annual Function 2025 🎈' },


    { url: 'assets/gallery/IMG_1156.jpg', alt: 'Photo 1', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1162.jpg', alt: 'Photo 2', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1166.jpg', alt: 'Photo 3', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1167.jpg', alt: 'Photo 4', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1168.jpg', alt: 'Photo 5', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1171.jpg', alt: 'Photo 6', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1174.jpg', alt: 'Photo 7', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1192.jpg', alt: 'Photo 8', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1193.jpg', alt: 'Photo 9', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1200.jpg', alt: 'Photo 10', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1207.jpg', alt: 'Photo 11', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1209.jpg', alt: 'Photo 12', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1213.jpg', alt: 'Photo 13', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1219.jpg', alt: 'Photo 14', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1221.jpg', alt: 'Photo 15', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1224.jpg', alt: 'Photo 16', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1231.jpg', alt: 'Photo 17', caption: 'Annual Function 2024 🎈' }
  ];


  selectedImageIndex: number | null = null;

  openImage(index: number) {
    this.selectedImageIndex = index;
  }

  closeImage() {
    this.selectedImageIndex = null;
  }

  prevImage(event: Event) {
    event.stopPropagation();
    if (this.selectedImageIndex !== null && this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    }
  }

  nextImage(event: Event) {
    event.stopPropagation();
    if (
      this.selectedImageIndex !== null &&
      this.selectedImageIndex < this.galleryImages.length - 1
    ) {
      this.selectedImageIndex++;
    }
  }
}
