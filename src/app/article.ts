export class Article {
	id: number = 0;
	author:string;
	date: Date;
	image: string;
	text: string;
	like: number;
	comments: Comment[];
}
export class Comment {
	constructor(
		public commentId: number=0,
		public author: string = "",
		public date: Date = new Date(),
		public text: string = ""
	) {
	}
}