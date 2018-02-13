import { Timestamp } from '../timestamp.model';
import * as TimerActions from './timer.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  timer: State
}

export interface State {
  timestamps: Array<Timestamp>;
  editedTimestamp: Timestamp;
  editedTimestampIndex: number;
}

const initialState: State = {
    timestamps: [
        new Timestamp('Kalistenika', 'ćwiczenia',[
            'Sport'
        ], 16, 11, 17, 1, 6, 7, 2017),
        new Timestamp('Timer', 'aplikacja',[
            'Angular2'
        ], 13, 12, 16, 30, 5, 7, 2017),
        new Timestamp('JavaStart', 'Super kurs!',[
            'JEE', 'Java'
        ], 12, 12, 14, 5, 5, 7, 2017),
        new Timestamp('Timer', 'aplikacja!',[
            'Angular2'
        ], 12, 12, 13, 14, 5, 6, 2017),
        new Timestamp('Timer', 'aplikacja',[
            'Angular2'
        ], 10, 12, 11, 14, 5, 7, 2016),
        new Timestamp('JavaStart', 'Super kurs!',[
            'Spring', 'Java'
        ], 15, 12, 17, 10, 4, 7, 2016),       
        new Timestamp('JavaStart', 'Super kurs!',[
            'Spring', 'Java'
        ], 12, 12, 13, 14, 3, 7, 2015)
    ],
  editedTimestamp: null,
  editedTimestampIndex: -1
};

export function timerReducer(state = initialState, action: TimerActions.TimerActions) {
  switch (action.type) {
    case (TimerActions.SET_TIMESTAMPS):
      return {
        ...state,
        timestamps: [...action.payload]
      };
    case (TimerActions.ADD_TIMESTAMP):
      let start: Timestamp[] = [];
      start.push(action.payload);
      let medium: Timestamp[] = [...state.timestamps];
      let finish: Timestamp[] = start.concat(medium);
      return {
        ...state,
        timestamps: finish
      };
    case (TimerActions.UPDATE_TIMESTAMP):
      const timestamp = state.timestamps[state.editedTimestampIndex];
      const updatedTimestamp = {
        ...timestamp,
        ...action.payload
      };
      const timestamps = [...state.timestamps];
      timestamps[state.editedTimestampIndex] = updatedTimestamp;
      for (let i = 0; i < timestamps.length; i++) {
        for (let j = 0; j < timestamps.length - 1; j++) {
            if (
                timestamps[j].year < timestamps[j + 1].year
                || (timestamps[j].year === timestamps[j+1].year 
                        && timestamps[j].month < timestamps[j+1].month) 
                || (timestamps[j].year === timestamps[j+1].year 
                        && timestamps[j].month === timestamps[j+1].month 
                        && timestamps[j].day < timestamps[j+1].day)
                || (timestamps[j].year === timestamps[j+1].year 
                        && timestamps[j].month === timestamps[j+1].month 
                        && timestamps[j].day === timestamps[j+1].day
                        && timestamps[j].startHour < timestamps[j+1].startHour)
                || (timestamps[j].year === timestamps[j+1].year 
                        && timestamps[j].month === timestamps[j+1].month 
                        && timestamps[j].day === timestamps[j+1].day
                        && timestamps[j].startHour === timestamps[j+1].startHour
                        && timestamps[j].startMinute < timestamps[j+1].startMinute)
            ) {
                let temp;
                temp = timestamps[j + 1];
                timestamps[j + 1] = timestamps[j];
                timestamps[j] = temp;
            }
        }
      }
      return {
        ...state,
        timestamps: timestamps
      };
    case (TimerActions.FINISH_NOW):
      let date = new Date();
      let endHour = date.getHours();
      let endMinute = date.getMinutes();
      let timestampsToUpdate = [...state.timestamps];
      for(let t of timestampsToUpdate){
        if(t.name == action.payload && (!t.endHour || t.endHour == -1 )){
            t.endHour = endHour;
            t.endMinute = endMinute;
            break;
        }
      }
      return{
        ...state,
        timestamps: timestampsToUpdate
      };
    case (TimerActions.DELETE_TIMESTAMP):
      const oldTimestamps = [...state.timestamps];
      oldTimestamps.splice(state.editedTimestampIndex, 1);
      return {
        ...state,
        timestamps: oldTimestamps,
        editedTimestamp: null,
        editedTimestampIndex: -1        
      };
    case TimerActions.START_EDIT:
      const ts = action.payload;
      const tmp = [...state.timestamps];
      let i:number = null;
      let found: boolean = false;
      for(i=0; i< state.timestamps.length; i++){
        if(ts.name==tmp[i].name &&
            ts.day==tmp[i].day &&
            ts.month==tmp[i].month &&
            ts.year==tmp[i].year &&
            ts.startHour==tmp[i].startHour &&
            ts.startMinute==tmp[i].startMinute
        ){
            found = true;    
            break;      
        }
      }
      if(found){
        const editedTimestamp = {...state.timestamps[i]};
        return {
            ...state,
            editedTimestamp: editedTimestamp,
            editedTimestampIndex: i
        };      
      } else {
      return {
        ...state
      };
      }
    case TimerActions.STOP_EDIT:
      return {
        ...state,
        editedTimestamp: null,
        editedTimestampIndex: -1
      };
    default:
      return state;
  }
}
