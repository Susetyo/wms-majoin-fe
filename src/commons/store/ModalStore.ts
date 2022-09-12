import create from 'zustand';

interface IModal {
  name:string;
  isBtnLoading:boolean;
}

export interface IModalStore {
  modal:IModal,
  setModal:(val:IModal) => void,
}

export const defaultModal = {
  name:'',
  isBtnLoading:false
}

const useModalStore = create<IModalStore>((set) => ({
  modal:defaultModal,
  setModal:(val)=>set({modal:val}),
}))

export default useModalStore;