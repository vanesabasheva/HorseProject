import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Horse} from '../dto/horse';

const baseUri = environment.backendUrl + '/horses';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Get all horses stored in the system
   *
   * @return observable list of found horses.
   */
  getAll(): Observable<Horse[]> {
    return this.http.get<Horse[]>(baseUri);
  }


  /**
   * Create a new horse in the system.
   *
   * @param horse the data for the horse that should be created
   * @return an Observable for the created horse
   */
  create(horse: Horse): Observable<Horse> {
    return this.http.post<Horse>(
      baseUri,
      horse
    );
  }

  /**
   * Edit exisisting horse in the system.
   *
   * @param id the id of the horse that should be updated
   * @param horse the data for the horse that should be updated
   * @return an Observable for the updated horse
   */
  edit(id: number, horse: Horse): Observable<Horse> {
    return this.http.put<Horse>(
      baseUri + '/' + id,
      horse
    );
  }

  /**
   *
   * @param id
   * @return the horse to get
   */
  getByID(id: number): Observable<Horse> {
    return this.http.get<Horse>(baseUri + '/' + id);
  }

  /**
   *
   * @param id the id of the horse that should be deleted
   * @return an Observable of the deleted Horse
   */
  deleteHorse(id: number): Observable<Horse> {
    return this.http.delete<Horse>(baseUri + '/' + id);
  }
  searchByMotherName(name: string, limitTo: number): Observable<Horse[]> {
    const params = new HttpParams()
      .set('name', name)
      .set('sex', 'FEMALE')
      .set('limit', limitTo);
    return this.http.get<Horse[]>(baseUri, {params});
  }

  searchByFatherName(name: string, limitTo: number): Observable<Horse[]> {
    const params = new HttpParams()
      .set('name', name)
      .set('sex', 'MALE')
      .set('limit', limitTo);
    return this.http.get<Horse[]>(baseUri, {params});
  }


  /**
   * Get all horses stored in the system matching the parameters
   *
   * @return observable list of found horses.
   */
  getHorsesByParameters(params: HttpParams): Observable<Horse[]> {
    return this.http.get<Horse[]>(baseUri, {params});
  }
}
