import {PermissionsAndroid, Platform} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

const RESULTS = {
	PERMISSIONS_DENIED: {status: 100, message: 'Permissions denied'},
	SUCCESS: {status: 101, message: 'Files saved successfully'},
	ERROR: {status: 102, message: 'Files saved failed'},
}

const hasAndroidPermission = async () => {
	const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

	const hasPermission = await PermissionsAndroid.check(permission)
	if (hasPermission) {
		return true
	}

	const status = await PermissionsAndroid.request(permission)
	return status === 'granted'
}

export const getExtension = (filename: string) => {
	return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename
}

export const saveFileToGallery = (url: string) => {
	return new Promise<any>(async (resolve, reject) => {
		if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
			reject(RESULTS.PERMISSIONS_DENIED)
		}

		var extension = getExtension(url).length < 10 ? getExtension(url).length : 'png'
		var date = new Date()

		const {config, fs} = RNFetchBlob
		var PictureDir = fs.dirs.PictureDir + '/Chillove'

		var options = {
			fileCache: true,
			addAndroidDownloads: {
				useDownloadManager: true,
				notification: true,
				path:
					PictureDir +
					'/image_' +
					Math.floor(date.getTime() + date.getSeconds() / 2) +
					'.' +
					extension,
				description: 'Image',
			},
		}

		return config(options)
			.fetch('GET', url)
			.then(response => resolve({...response, ...RESULTS.SUCCESS}))
			.catch(error => reject({...error, ...RESULTS.ERROR}))
	})
}
