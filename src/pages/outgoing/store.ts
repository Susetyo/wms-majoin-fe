import create from 'zustand';

export interface IFilter {
  keyword:string
}

interface IOptions {
  id:number
  nama_material:string 
  nomor_material:string
  qty:number
}

export interface IBarangStore {
  dataTable: {
    rows:any[],
    totalRows:number
  }
  setDataTable:(val:any)=>void,
  filter: IFilter,
  setFilter:(val:IFilter) => void,
  options: IOptions[]
  setOptions:(val:IOptions[]) => void
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
  setFilter:(val) => set({filter:val}),
  options:[],
  setOptions:(val:IOptions[]) => set({options:val})
}))

export default useBarangStore;