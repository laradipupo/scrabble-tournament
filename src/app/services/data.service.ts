import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MappedData } from '../interfaces/result';
import { player } from '../interfaces/player';
import { result } from '../interfaces/result';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/db.json';

  constructor(private http: HttpClient) { }

getMappedData(): Observable<MappedData[]> {
  return this.http.get<{ players: player[]; results: result[] }>(this.dataUrl)
      .pipe(
          map(data => {
              // Check if data needs to be parsed
              const responseData = typeof data === 'string' ? JSON.parse(data) : data;
              
              const players = responseData.players || [];
              const results = responseData.results || [];

              return results.map((result: result) => {
                  const player = players.find((p: player) => p.playerId=== result.playerId);
                  const mappedEntry = {
                      name: player?.name || 'Unknown',
                      totalScore: result.totalScore,
                      gamesPlayed: result.gamesPlayed,
                  };
                  return mappedEntry;
              }).sort((a: MappedData, b: MappedData) => b.totalScore - a.totalScore);
          }),
      );
}


    }
