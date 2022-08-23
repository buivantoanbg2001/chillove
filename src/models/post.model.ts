interface TimeType {
	seconds: number
	nanoseconds: number
}

export interface CommentType {
	comment: string
	commented_at: TimeType
	owner_email: string
}

export interface PostType {
	id: string
	caption: string
	comments: CommentType[]
	created_at: TimeType
	hashtags: string[]
	images: string[]
	is_private: boolean
	owner_email: string
}
