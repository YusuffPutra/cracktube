import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeserviceService {
  private apiKey = 'AIzaSyDT3UgVMqj9-4gN6STdjYsd4t8ezJo4nhY';
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) { }

  searchVideos(searchTerm: string, maxResults: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('type', 'video')
      .set('q', searchTerm)
      .set('maxResults', maxResults.toString())
      .set('key', this.apiKey);

    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  getPopularVideos(maxResults: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('chart', 'mostPopular')
      .set('regionCode', 'US')
      .set('maxResults', maxResults.toString())
      .set('key', this.apiKey);

    return this.http.get(`${this.apiUrl}/videos`, { params });
  }
}