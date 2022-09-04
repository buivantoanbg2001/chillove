export interface ToastType {
	id: string
	message: string
	type?: {
		success?: boolean
		error?: boolean
	}
}
