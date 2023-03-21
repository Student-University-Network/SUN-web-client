import { createContext, useContext, useEffect, useState } from 'react';
import userService from 'src/api/userService';
import { useAuth } from './AuthContext';

type UserContextType = {
	userId: string;
	gender: string;
	fullName: { firstName: string; middleName: string; lastName: string };
	dateOfBirth: Date | null;
	getUserDetails: (done: () => void, error: () => void) => void;
	updateUserProfile: (
		newProfileData: any,
		done: () => void,
		error: () => void,
	) => void;
	changeUserPassword: () => void;
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

	const getUserDetails = (done = () => {}, error = () => {}) => {
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
				done();
			})
			.catch((err) => {
				error();
			});
	};

	const updateUserProfile = (
		newProfileData: any,
		done = () => {},
		error = () => {},
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
				done();
			})
			.catch((err) => {
				error();
			});
	};

	const changeUserPassword = () => {};

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
