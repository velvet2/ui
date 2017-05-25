import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DataBus {
  selected: Set<number> = new Set<number>();;
  datas: Array<any> = [];

  // Observable string sources
  private data = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  data$ = this.data.asObservable();

  // missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  // Service message commands
  announceMission(mission: string) {
    // this.missionAnnouncedSource.next(mission);
  }
  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }

  setData(datas: Array<any>){
    this.datas = datas;
  }

  setSelected(sel: Set<number>){
    this.selected = sel;
  }
}
