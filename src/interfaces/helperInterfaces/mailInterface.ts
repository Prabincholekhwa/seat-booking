export interface EmailOptions{
    to: string;
    subject:string;
    text: string;
    html: string;
}

export interface  SendVerifyEmailInterface{
    code: number
    name: string
}