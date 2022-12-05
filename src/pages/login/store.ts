import create from 'zustand';
import { persist } from 'zustand/middleware'

interface ILoginStore {
  id:number
  username: string
  password: string
  role: string
  setId:(val:number) => void
  setUsername: (val:string) => void
  setPassword: (val:string) => void
  setRole:(val:string) =>  void
}

const useLoginStore = create<ILoginStore>()(
  persist(
    (set) => ({
      id:0,
      username:"",
      password:"",
      role:"",
      setId:(val) => set({id:val}),
      setUsername:(val) => set({username:val}),
      setPassword: (val) => set({password:val}),
      setRole: (val) => set({role:val})
    }),
    {
      name:'user-login',
      partialize: (state) => ({username:state.username,id:state.id, role:state.role})
    }
  )
)

export default useLoginStore;