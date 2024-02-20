import { Component } from '@angular/core';
import { YoutubeserviceService } from '../youtubeservice.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm = '';
  videos: any[] = [];

  constructor(private youtubeService: YoutubeserviceService, private sanitizer: DomSanitizer) { }

  search() {
    this.youtubeService.searchVideos(this.searchTerm, 12)
      .subscribe((response: any) => {
        this.videos = response.items.map((video: { id: { videoId: any; }; }) => ({
          ...video,
          safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.id.videoId}`)
        }));
      });
  }
}