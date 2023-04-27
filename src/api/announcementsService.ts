/* eslint-disable class-methods-use-this */
import http from '.';

export interface Announcement {
	announcementId: string;
	title: string;
	content: string;
	programId: string | null;
	userId: string;
	programName: string | null;
	announcer: string;
}

export interface GetAnnouncementsResponse {
	status: string;
	data: {
		announcements: Array<Announcement>;
	};
}

export interface AnnouncementProgramList {
	programId: string;
	programName: string;
	tag: string;
}
export interface GetAnnouncementsProgramsResponse {
	status: string;
	data: {
		programs: Array<AnnouncementProgramList>;
	};
}

export interface SetAnnouncementInput {
	title: string;
	content: string;
	programId: string | null;
}

class AnnouncementsService {
	getAnnouncementsList() {
		return http.get<GetAnnouncementsResponse>('/announcement/list');
	}

	setAnnouncements(payload: SetAnnouncementInput) {
		return http.post('announcement/announce', payload);
	}

	getProgramList() {
		return http.get<GetAnnouncementsProgramsResponse>(
			'announcement/program-list',
		);
	}
}

export default new AnnouncementsService();
