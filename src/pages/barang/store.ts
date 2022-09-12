import create from 'zustand';

export interface IFilter {
  keyword:string
}

interface IModal {
  name:string;
  isBtnLoading:boolean;
}

export interface IBarangStore {
  dataTable: {
    rows:any[],
    totalRows:number
  }
  filter: IFilter,
  modal:IModal,
  setModal:(val:IModal) => void,
  setDataTable:(val:any)=>void,
  setFilter:(val:IFilter) => void,
}

export const defaultModal = {
  name:'',
  isBtnLoading:false
}

const defaultFilter = {
  keyword:''
}

const useBarangStore = create<IBarangStore>((set) => ({
  dataTable:{
    rows:[],
    totalRows:0
  },
  filter: defaultFilter,
  modal:defaultModal,
  setModal:(val)=>set({modal:val}),
  setDataTable:(val)=>set({dataTable:val}),
  setFilter:(val) => set({filter:val})
}))

export default useBarangStore;