import React, {useEffect, useState, useContext} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Keyboard} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BottomSheetFooter, BottomSheetFooterProps} from '@gorhom/bottom-sheet'
import {Button, CustomTextInput} from '../utils/CustomComponents'
import * as Icon from '../utils/Icons'
import Colors from '../utils/Colors'
import {BottomSheetContext} from '../tab/HomeTab'
import {auth, db, doc, arrayUnion, updateDoc, Timestamp} from '../firebase/firebase-config'

const CommentBox = ({animatedFooterPosition}: BottomSheetFooterProps) => {
	const {bottom: bottomSafeArea} = useSafeAreaInsets()
	const [comment, setComment] = useState<string>('')
	const [disabled, setDisabled] = useState<boolean>(false)
	const {postId} = useContext(BottomSheetContext)

	console.log('render CommentBox -', postId)

	// Set comment = '' when close CommentBox
	useEffect(() => {
		if (postId === undefined && comment !== '') {
			setComment('')
		}
	}, [postId])

	const sendComment = () => {
		// Disable send button
		setDisabled(true)

		if (auth.currentUser && postId) {
			updateDoc(doc(db, 'posts', postId), {
				comments: arrayUnion({
					comment: comment,
					commented_at: Timestamp.now(),
					owner_email: auth.currentUser.email,
				}),
			})
				.then(() => {
					console.log('Comment successfully added')
					setComment('')
					setDisabled(false)
					Keyboard.dismiss()
				})
				.catch(error => {
					console.log('Error added comment: ', error)
					/**
					 * @todo showToast("Comment failed")
					 */
				})
		} else {
			/**
			 * @todo showToast("Comment failed")
			 */
		}
	}

	return (
		<BottomSheetFooter
			bottomInset={bottomSafeArea}
			animatedFooterPosition={animatedFooterPosition}
			style={styles.background}>
			<CustomTextInput
				style={styles.textInput}
				placeholder="Leave a comment..."
				value={comment}
				onChangeText={setComment}
			/>

			{comment.length > 0 && (
				<Button
					type="solid"
					icon={<Icon.Feather name="arrow-up" size={20} color={Colors.white} />}
					style={styles.addButton}
					onPress={sendComment}
					disabled={disabled}
				/>
			)}
		</BottomSheetFooter>
	)
}

export default CommentBox

const styles = StyleSheet.create({
	background: {
		backgroundColor: Colors.white,
		borderTopWidth: 0.2,
		borderTopColor: Colors.black_blur4,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 20,
	},
	textInput: {
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: Colors.lychee,
		flex: 1,
	},
	addButton: {
		width: 32,
		height: 32,
		marginLeft: 16,
		borderRadius: 16,
		padding: 0,
	},
})
