import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { Image } from 'src/app/shared/models/Image';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryObject?: Array<Image>;
  chosenImage?: Image;

  constructor(private galleryService: GalleryService) { 
    
  }

  ngOnInit(): void {
    this.galleryService.loadImageMeta('__credits.json').subscribe((data: Array<Image>) => {
      this.galleryObject = data;
    })
  }

  loadImage(imageObject: any){
    this.chosenImage = imageObject;
  }

}
