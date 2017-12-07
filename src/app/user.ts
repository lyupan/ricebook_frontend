export class User {
	constructor(
		public username: string="",
		public displayName: string = "",
		public email: string = "",
	    public phone: string = "",
	    public dob: Date = new Date(),
	    public zipCode: string = "",
	    public password: string = "",
	    public avatar: string="",
	    public headline: string="",
	    public following: string[] = []
	) {
	}
}