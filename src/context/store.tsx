/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { createContext, useContext, useState } from 'react';

// type DataType = {
// 	firstName: string;
// };

interface ContextProps {
	sidebarVisibile: boolean;
	showSidebar: (state: boolean) => void;
	// data: DataType[];
	// setData: Dispatch<SetStateAction<DataType[]>>;
}

const GlobalContext = createContext<ContextProps>({
	sidebarVisibile: false,
	showSidebar: () => {},
	// data: [],
	// setData: (): DataType[] => [],
});

export const GlobalContextProvider = ({
	children,
}: React.HTMLAttributes<Element>) => {
	const [sidebarVisibile, setSidebarVisibile] = useState(true);
	// const [data, setData] = useState<[] | DataType[]>([]);

	const showSidebar = (state: boolean) => {
		setSidebarVisibile(state);
	};

	return (
		<GlobalContext.Provider value={{ sidebarVisibile, showSidebar }}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
