import create from 'zustand';

export interface IFilter {
  keyword:string
}

export interface IBarangStore {
  dataTable: {
    rows:any[],
    totalRows:number
  }
  setDataTable:(val:any)=>void,
  filter: IFilter,
  setFilter:(val:IFilter) => void,
}

const defaultFilter = {
  keyword:''
}

const useBarangStore = create<IBarangStore>((set) => ({
  dataTable:{
    rows:[],
    totalRows:0
  },
  setDataTable:(val)=>set({dataTable:val}),
  filter: defaultFilter,
  setFilter:(val) => set({filter:val})
}))

export default useBarangStore;