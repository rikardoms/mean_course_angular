import { Component } from '@angular/core';
import { MediaItemService } from './media-item.service';

@Component({
  selector: 'mw-media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.css']
})

export class MediaItemListComponent { 
  
  medium='';
  mediaItems=[];

  constructor(private mediaItemService: MediaItemService){

  }

  ngOnInit(){
    this.getMediaItem(this.medium);
  }

  onMediaItemDelete(mediaItem){
     
     this.mediaItemService.delete(mediaItem).subscribe(() => {
       this.getMediaItem(this.medium);
     });
  
  }

  getMediaItem(medium){
    this.medium = medium;
    this.mediaItemService.get(medium)
        .subscribe(mediaItems => {
            this.mediaItems = mediaItems;
        })
}
  
}