import { addUser } from "../database/app"

export class PanicAlert {

  createUser = () => {
    console.log('create user')
    addUser(
      {
        fullName: "test",
        contact: 3892735,
        email: "sfs@gmail.com",
        physicalAddress: "sdsdg",
        emergencyContact: 35236
      }
    )
  }

}