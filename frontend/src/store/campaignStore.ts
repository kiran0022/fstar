import { create } from 'zustand';


type IReacipientStore = {
    recipientsData: IRecipient[]
    page: number
    setRecipientData: (newRecipient: IRecipient) => void
    // setRecipientData: (newRecipient: IRecipient[]) => void
    // updateReacepient: (newRecepient) => void
}

export const useCampaignStore = create<IReacipientStore>((set) => ({
    recipientsData: [],
    page: 1,
    // updateAmount: (newAmount) => set({ amount: newAmount })

    // single recipient map add
    setRecipientData: (newRecipient) => set((state) => ({
        recipientsData: [...state.recipientsData!, newRecipient]
    }))

    //complete array add sync to campaign state
    // setRecipientData: (newRecipient) => set((state) => ({
    //     recipientsData: newRecipient
    // }))

    // render by id change or new one inserted
    // setRecipient: (newRecipient) => set((state) => ({
    //     recipients: state.recipients.filter((recipient) => recipient.campaign_email ? [...state.recipients, newRecipient] : recipient)
    // }))
}))

//     {

//     campaign_email: "rachel@example.com",
//     campaign_name: "rachel",
//     duration: 150,
//     start_date: "2022-10-31T09:00:00.594Z",
//     created_by: "luna",
//     process: "ongoing",
//     actions: {
//         copy: false,
//         send: true,
//     },
//     db_code: 223422,
//     balance: 623234,
//     campaign_mobile: 1234567890,
//     status: "pending",
//     final_action: null,

// }