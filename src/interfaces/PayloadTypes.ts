
export type ItemPayload =  {
date:Date;
id:string;
name:string;
}

export type ItemDescriptionPayload = {
    name:string;
    description:string;
    amount:number;
    date: Date;
    isPrivate: boolean
}

export type ItemDescriptionPayloadComponent = {
    //id:string;
    name:string;
    description:string;
    amount:number;
    date: string;
    isPrivate: boolean
}
