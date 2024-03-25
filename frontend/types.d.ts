
type IRecipient = {
    "campaign_email": string,
    "campaign_name": string,
    "duration": number,
    "start_date": string,
    "created_by": string,
    "process": string,
    "actions"?: {
        "copy"?: boolean,
        "send"?: boolean,
    },
    "db_code": number,
    "balance": number,
    "campaign_mobile": number,
    "status": string,
    "final_action": null,

}

type IParsedRecipient = {
    "campaign_email": string,
    "campaign_name": string,
    "duration": number,
    "start_date": string,
    "created_by": string,
    "process": string,
    "actions/copy"?: boolean,
    "actions/send"?: boolean,
    "db_code": number,
    "balance": number,
    "campaign_mobile": number,
    "status": string,
    "final_action": null

}