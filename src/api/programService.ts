/* eslint-disable class-methods-use-this */
import { Program, ProgramListItem } from 'src/context/ProgramContext';
import http from '.';

interface ProgramsListResponse {
	status: string;
	data: Array<ProgramListItem>;
}

interface ProgramDetailsResponse {
	status: string;
	data: Array<Program>;
}

interface CreateProgramResponse {
	status: string;
	data: ProgramListItem;
}

interface UpdateProgramResponse {
	status: string;
	data: Program;
}

class ProgramService {
	getProgramsList() {
		return http.get<ProgramsListResponse>('/program/list');
	}

	getProgramDetails(programId: string) {
		return http.get<ProgramDetailsResponse>('/program/:programId', {
			params: {
				programId,
			},
		});
	}

	createProgram(payload: any) {
		return http.post<CreateProgramResponse>('/program/new', payload);
	}

	updateProgram(programId: string, payload: Program) {
		return http.post<UpdateProgramResponse>(
			'/program/:programId',
			payload,
			{
				params: {
					programId,
				},
			},
		);
	}
}

export default new ProgramService();
