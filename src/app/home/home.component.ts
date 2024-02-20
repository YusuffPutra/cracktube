import { Component, OnInit } from '@angular/core';
import { YoutubeserviceService } from '../youtubeservice.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularVideos: any[] = [];

  constructor(private youtubeService: YoutubeserviceService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.fetchPopularVideos(21);
  }

  fetchPopularVideos(maxResults: number) {
    this.youtubeService.getPopularVideos(maxResults)
      .subscribe(
        (response: any) => {
          this.popularVideos = response.items;
          this.popularVideos.forEach(video => {
            video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.id}`);
          });
        },
        error => {
          console.error('Error:', error);
        }
      );
  }
}