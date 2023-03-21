import { AxiosError } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import userService, { ChangePasswordInput } from 'src/api/userService';
import { useAuth } from './AuthContext';

type UserContextType = {
	userId: string;
	gender: string;
	fullName: { firstName: string; middleName: string; lastName: string };
	dateOfBirth: Date | null;
	getUserDetails: (
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	updateUserProfile: (
		newProfileData: any,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	changeUserPassword: (
		payload: ChangePasswordInput,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
};

const UserContext = createContext<UserContextType>({
	userId: '',
	gender: '',
	fullName: { firstName: '', middleName: '', lastName: '' },
	dateOfBirth: null,
	getUserDetails: () => {},
	updateUserProfile: () => {},
	changeUserPassword: () => {},
});

type Props = {
	children: React.ReactNode;
};

export function UserProvider({ children }: Props) {
	const [userId, setUserId] = useState<string>('');
	const [gender, setGender] = useState<string>('');
	const [fullName, setFullName] = useState({
		firstName: '',
		middleName: '',
		lastName: '',
	});
	const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

	const { user } = useAuth();

	const getUserDetails = (
		done = (data: any) => {},
		error = (data: any) => {},
	) => {
		userService
			.userDetails()
			.then((res) => {
				const { data } = res.data;
				setFullName({
					firstName: data.firstName,
					middleName: data.middleName || '',
					lastName: data.lastName,
				});
				setGender(data.gender);
				setUserId(data.userId);
				setDateOfBirth(
					data.dateOfBirth ? new Date(data.dateOfBirth) : null,
				);
				done(null);
			})
			.catch((err) => {
				error(null);
			});
	};

	const updateUserProfile = (
		newProfileData: any,
		done: (data: any) => void,
		error: (data: any) => void,
	) => {
		userService
			.updateUserDetails(newProfileData)
			.then((res) => {
				const { data } = res.data;
				setFullName({
					firstName: data.firstName,
					middleName: data.middleName || '',
					lastName: data.lastName,
				});
				setGender(data.gender);
				setUserId(data.userId);
				setDateOfBirth(
					data.dateOfBirth ? new Date(data.dateOfBirth) : null,
				);
				done(null);
			})
			.catch((err) => {
				error(null);
			});
	};

	const changeUserPassword = (
		payload: ChangePasswordInput,
		done: (data: any) => void,
		error: (data: any) => void,
	) => {
		userService
			.changePassword(payload)
			.then((res) => done(null))
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			.catch((err) => error(err?.response?.data));
	};

	useEffect(() => {
		if (user) {
			getUserDetails();
		}
	}, [user]);

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		userId,
		gender,
		fullName,
		dateOfBirth,
		getUserDetails,
		updateUserProfile,
		changeUserPassword,
	};

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}
