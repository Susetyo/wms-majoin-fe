import create from 'zustand';

export interface DataType {
  key: string;
  nomor_material: string;
  nama_material: number;
  qty: string;
  date:string;
  posisi:string;
  type:string;
  username?:string;
}

export interface IFilter {
  keyword:string,
  date:any[],
  type:string
}

export interface IMonitoringStore {
  dataTable: {
    rows:any[],
    totalRows:number
  }
  setDataTable:(val:any)=>void,
  filter: IFilter,
  setFilter:(val:IFilter) => void,
}

const defaultFilter = {
  keyword:'',
  date:[],
  type:''
}

const useMonitoringStore = create<IMonitoringStore>((set) => ({
  dataTable:{
    rows:[],
    totalRows:0
  },
  setDataTable:(val)=>set({dataTable:val}),
  filter: defaultFilter,
  setFilter:(val) => set({filter:val})
}))

export default useMonitoringStore;