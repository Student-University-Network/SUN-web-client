import { createContext, useContext, useEffect, useState } from 'react';
import announcementService, {
	Announcement,
	AnnouncementProgramList,
	SetAnnouncementInput,
} from 'src/api/announcementsService';
import { useAuth } from './AuthContext';

type AnnouncementContextType = {
	announcementsList: Array<Announcement>;
	getAnnouncementsList: (
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	setAnnouncement: (
		payload: SetAnnouncementInput,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	getAnnouncementsProgramList: (
		done: (data: Array<AnnouncementProgramList>) => void,
		error: (data: any) => void,
	) => void;
};

const AnnouncementContext = createContext<AnnouncementContextType>({
	announcementsList: [],
	getAnnouncementsList: () => {},
	setAnnouncement: () => {},
	getAnnouncementsProgramList: () => {},
});

type Props = {
	children: React.ReactNode;
};

export function AnnouncementProvider({ children }: Props) {
	const [announcementsList, setAnnouncementsList] = useState<
		Array<Announcement>
	>([]);

	const { user } = useAuth();

	const getAnnouncementsList = (
		done = (data: any) => {},
		error = (data: any) => {},
	) => {
		announcementService
			.getAnnouncementsList()
			.then((res) => {
				const { data } = res.data;
				setAnnouncementsList(data.announcements);
				done(null);
			})
			.catch((err) => {
				error(null);
			});
	};

	const setAnnouncement = (
		payload: SetAnnouncementInput,
		done: (data: any) => void,
		error: (data: any) => void,
	) => {
		if (user?.role === 'STUDENT') return;
		announcementService
			.setAnnouncements(payload)
			.then((res) => done(null))
			.catch((err) => error(null));
	};

	const getAnnouncementsProgramList = (
		done: (data: Array<AnnouncementProgramList>) => void,
		error: (data: any) => void,
	) => {
		if (user?.role === 'STUDENT') return;
		announcementService
			.getProgramList()
			.then((res) => done(res.data.data.programs))
			.catch((err) => error(null));
	};

	useEffect(() => {
		if (user) {
			getAnnouncementsList();
		}
	}, [user]);

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		announcementsList,
		setAnnouncement,
		getAnnouncementsList,
		getAnnouncementsProgramList,
	};

	return (
		<AnnouncementContext.Provider value={value}>
			{children}
		</AnnouncementContext.Provider>
	);
}

export function useAnnouncement() {
	return useContext(AnnouncementContext);
}
