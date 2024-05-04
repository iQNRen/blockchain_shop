import { create } from 'zustand'
import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Contract from '../abis/Contract.json'




const useRoleStore = create((set, get) => ({
    owner: '',
    ChangeOwner: (address) => set(() => ({ owner: address })),
}))
const useAccoutStore = create((set, get) => ({
    account: '',
    ChangeAccount: (account) => set(() => ({ account: account })),
}))

const useContractStore = create((set, get) => ({
    contract: '',
    provider: '',
    fetchProvider: async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        set({ provider: provider}); 
    },
    fetchContract: async () => {
        const provider = ()=>useContractStore.getState().provider;
        const contract = new ethers.Contract(`${process.env.REACT_APP_CONTRACTS_ADDRESS}`, Contract, provider)
        set({ contract: contract}); 
    },
}))



export const getAddress = () => useRoleStore.getState().owner;
export const setAddress = (address) => useRoleStore.setState({ owner: address });
export const getAccount = () => useAccoutStore.getState().account;
export const setAccount = (address) => useAccoutStore.setState({ account: address });
export default useContractStore;
