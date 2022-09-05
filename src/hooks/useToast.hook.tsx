import {useCallback, useMemo} from 'react'
import {useAppDispatch} from './redux.hook'
import {ToastType} from '../models/toast.model'

const useToast = () => {
	const dispatch = useAppDispatch()

	const addToast = useCallback(
		(toast: ToastType) => {
			dispatch({
				type: 'ADD_TOAST',
				payload: toast,
			})
		},
		[dispatch],
	)

	const removeToast = useCallback(
		(toast: ToastType) => {
			dispatch({
				type: 'REMOVE_TOAST',
				payload: toast,
			})
		},
		[dispatch],
	)

	return useMemo(() => ({addToast, removeToast}), [removeToast, removeToast])
}

export default useToast
