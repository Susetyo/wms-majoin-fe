import create from 'zustand';

interface ILoginStore {
  username: string
  password: string
  setUsername: (val:string) => void
  setPassword: (val:string) => void
}

const useLoginStore = create<ILoginStore>((set) => ({
  username:"",
  password:"",
  setUsername:(val) => set({username:val}),
  setPassword: (val) => set({password:val})
}))

export default useLoginStore;