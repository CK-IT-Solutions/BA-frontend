import { useState } from '#app';

export const useLoading = () => useState('loading', () => false);

export function setLoading(status: boolean) {
	const loading = useLoading();
	loading.value = status;
}

export const useSnackbar = () =>
	useState('snackbar', () => {
		return {
			show: false,
			type: 'info',
			heading: '',
			body: '',
		};
	});

export function openSnackbar(type: string, heading: string, body: string = '') {
	const snackbar = useSnackbar();
	snackbar.value = {
		show: true,
		type,
		heading,
		body,
	};

	setTimeout(() => {
		closeSnackbar();
	}, 5000);
}

export function closeSnackbar() {
	const snackbar = useSnackbar();
	snackbar.value = {
		show: false,
		type: 'info',
		heading: '',
		body: '',
	};
}

export const useDialog = () =>
	useState('dialog', () => {
		return {
			show: false,
			type: 'info',
			heading: '',
			body: '',
			triggerPrimaryActionOnBackdropClick: false,
			primaryBtn: {
				label: '',
				onclick: () => {},
			},
			secondaryBtn: {
				label: '',
				onclick: () => {},
			},
		};
	});

export function openDialog(
	type: string,
	heading: string,
	body: string,
	triggerPrimaryActionOnBackdropClick: boolean,
	primaryBtn: any,
	secondaryBtn: any
) {
	const dialog = useDialog();
	dialog.value = {
		show: true,
		type,
		heading,
		body,
		triggerPrimaryActionOnBackdropClick,
		primaryBtn,
		secondaryBtn,
	};
}

export function closeDialog() {
	const dialog = useDialog();
	dialog.value = {
		show: false,
		type: '',
		heading: '',
		body: '',
		triggerPrimaryActionOnBackdropClick: false,
		primaryBtn: {
			label: '',
			onclick: () => {},
		},
		secondaryBtn: {
			label: '',
			onclick: () => {},
		},
	};
}
