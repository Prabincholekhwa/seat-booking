import { UserInterface, InputUserInterface } from "../interfaces";
import { BaseRepository } from "./baseRepository";
import Model from "../models";

export class UserRepository extends BaseRepository<
  InputUserInterface,
  UserInterface
> {
  constructor() {
    super(Model.User);
  }
}
