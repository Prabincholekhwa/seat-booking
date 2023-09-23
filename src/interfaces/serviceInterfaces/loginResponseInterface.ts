import { UserInterface } from "../../interfaces/modelInterfaces";

export interface LoginResponseInterface {
    token: string;
    expiresIn: string;
    user: UserInterface;
}
