import { create } from 'zustand';

export const usePeerStore = create((set) => ({
  peerId: '',
  partnerId: '',
  stream: null,
  peer: null,
  setPeerId: (peerId) => set({ peerId }),
  setPartnerId: (partnerId) => set({ partnerId }),
  setStream: (stream) => set({ stream }),
  setPeer: (peer) => set({ peer }),
}));
