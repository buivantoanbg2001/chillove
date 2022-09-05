import {useCallback, useMemo} from 'react'
import {useAppDispatch} from './redux.hook'

const useTabBar = () => {
	const dispatch = useAppDispatch()

	const hideTabBar = useCallback(() => {
		dispatch({
			type: 'SET_TAB_BAR_STYLE',
			payload: {
				opacity: 0,
				translateY: 150,
			},
		})
	}, [dispatch])

	const showTabBar = useCallback(() => {
		dispatch({
			type: 'SET_TAB_BAR_STYLE',
			payload: {
				opacity: 1,
				translateY: 0,
			},
		})
	}, [dispatch])

	const setTabBarStyle = useCallback(
		(opacity: number, translateY: number) => {
			dispatch({
				type: 'SET_TAB_BAR_STYLE',
				payload: {
					opacity: opacity,
					translateY: translateY,
				},
			})
		},
		[dispatch],
	)

	return useMemo(
		() => ({hideTabBar, showTabBar, setTabBarStyle}),
		[hideTabBar, showTabBar, setTabBarStyle],
	)
}

export default useTabBar
