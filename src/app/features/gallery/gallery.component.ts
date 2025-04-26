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
    { url: 'assets/gallery/IMG_2513.jpg', alt: 'Photo 2', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2514.jpg', alt: 'Photo 3', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2515.jpg', alt: 'Photo 4', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2516.jpg', alt: 'Photo 5', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2517.jpg', alt: 'Photo 6', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2518.jpg', alt: 'Photo 7', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2519.jpg', alt: 'Photo 8', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2520.jpg', alt: 'Photo 9', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2521.jpg', alt: 'Photo 10', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2522.jpg', alt: 'Photo 11', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2523.jpg', alt: 'Photo 12', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2524.jpg', alt: 'Photo 13', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2525.jpg', alt: 'Photo 14', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2526.jpg', alt: 'Photo 15', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2527.jpg', alt: 'Photo 16', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2528.jpg', alt: 'Photo 17', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2529.jpg', alt: 'Photo 18', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2530.jpg', alt: 'Photo 19', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2531.jpg', alt: 'Photo 20', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2532.jpg', alt: 'Photo 21', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2533.jpg', alt: 'Photo 22', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2534.jpg', alt: 'Photo 23', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2535.jpg', alt: 'Photo 24', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2536.jpg', alt: 'Photo 25', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2537.jpg', alt: 'Photo 26', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2538.jpg', alt: 'Photo 27', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2539.jpg', alt: 'Photo 28', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2540.jpg', alt: 'Photo 29', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2542.jpg', alt: 'Photo 30', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2543.jpg', alt: 'Photo 31', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2544.jpg', alt: 'Photo 32', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2545.jpg', alt: 'Photo 33', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2546.jpg', alt: 'Photo 34', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2547.jpg', alt: 'Photo 35', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2549.jpg', alt: 'Photo 36', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2550.jpg', alt: 'Photo 37', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2551.jpg', alt: 'Photo 38', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2594.jpg', alt: 'Photo 39', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_2595.jpg', alt: 'Photo 40', caption: 'Annual Function 2025 🎈' },
    { url: 'assets/gallery/IMG_1156.jpg', alt: 'Photo 1', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1157.jpg', alt: 'Photo 2', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1158.jpg', alt: 'Photo 3', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1162.jpg', alt: 'Photo 4', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1163.jpg', alt: 'Photo 5', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1166.jpg', alt: 'Photo 6', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1167.jpg', alt: 'Photo 7', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1168.jpg', alt: 'Photo 8', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1171.jpg', alt: 'Photo 9', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1174.jpg', alt: 'Photo 10', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1192.jpg', alt: 'Photo 11', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1193.jpg', alt: 'Photo 12', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1200.jpg', alt: 'Photo 13', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1207.jpg', alt: 'Photo 14', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1209.jpg', alt: 'Photo 15', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1211.jpg', alt: 'Photo 16', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1213.jpg', alt: 'Photo 17', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1219.jpg', alt: 'Photo 18', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1221.jpg', alt: 'Photo 19', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1224.jpg', alt: 'Photo 20', caption: 'Annual Function 2024 🎈' },
    { url: 'assets/gallery/IMG_1231.jpg', alt: 'Photo 21', caption: 'Annual Function 2024 🎈' }
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
