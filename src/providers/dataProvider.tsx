import { createContext, useContext, useEffect, useState } from "react";
import { IErrosTypes, IErroLogBody, IErrorLog } from "../interfaces/errors";
import { ICurator } from "../interfaces/people";
import { IPlace } from "../interfaces/place";
import { IBag } from "@/interfaces/bagpattern";
import {
  getCurators,
  getErrorTypes,
  getHomeDashboardInfos,
  getPlaces,
} from "@/services/get";
import { useUser } from "./userProvider";
import { IhomeDashboard } from "@/interfaces/dashboard";
import { IRepitedSku } from "@/interfaces/sheet";

interface IDataProvider {
  children: React.ReactNode;
}
interface IDataContext {
  errorsTypes: IErrosTypes[];
  errorsLog: IErrorLog[];
  setErrorsLog: React.Dispatch<React.SetStateAction<IErrorLog[]>>;
  addError: (newError: IErrorLog) => void;
  ignoreError: (errorId: number) => void;

  curators: ICurator[];
  currentCurator: ICurator;
  setCurrentCurator: (curator: ICurator) => void;

  places: IPlace[];
  currentPlace: IPlace;
  setCurrentPlace: (place: IPlace) => void;

  currentBagPattern: IBag;
  setCurrentBagPattern: (bag: IBag) => void;

  excelFile: Blob | null;
  setExcelFile: React.Dispatch<React.SetStateAction<Blob | null>>;

  responseFile: string;
  setResponseFile: React.Dispatch<React.SetStateAction<string>>;

  loadData: () => void;

  repitedSku: Array<IRepitedSku[]> | undefined;
  setRepitedSku: React.Dispatch<
    React.SetStateAction<Array<IRepitedSku[]> | undefined>
  >;

  // dashboard datas
  dashboardHome: IhomeDashboard;
  setDashboardHome: React.Dispatch<React.SetStateAction<IhomeDashboard>>;
}

const DataContext = createContext<IDataContext>({
  errorsTypes: [
    {
      id: 0,
      group: "",
      title: "",
      description: "",
      severity: 0,
      collector: "",
    },
  ],
  errorsLog: [{}],
  setErrorsLog: () => {},
  addError: () => {},
  ignoreError: () => {},

  curators: [{}],
  currentCurator: {},
  setCurrentCurator: () => {},

  places: [{}],
  currentPlace: {},
  setCurrentPlace: () => {},

  currentBagPattern: {},
  setCurrentBagPattern: () => {
    {
    }
  },

  excelFile: null,
  setExcelFile: () => {},

  responseFile: "",
  setResponseFile: () => {},

  loadData: () => {},

  repitedSku: undefined,
  setRepitedSku: () => {},

  // dashboard datas

  dashboardHome: {
    groups: [],
    total_errors: 0,
    total_skus: 0,
  },
  setDashboardHome: () => {},
});

export const DataProvider = ({ children }: IDataProvider) => {
  const [errorsTypes, setErrors] = useState([
    {
      id: 0,
      group: "",
      title: "",
      description: "",
      severity: 0,
      collector: "",
    },
  ]);
  const [errorsLog, setErrorsLog] = useState<IErrorLog[]>([]);
  const [curators, setCurators] = useState([{}]);
  const [places, setPlace] = useState([{}]);

  const [currentCurator, setCurrentCurator] = useState({});
  const [currentPlace, setCurrentPlace] = useState({});
  const [currentBagPattern, setCurrentBagPattern] = useState<IBag>({
    iva: 0,
    width: 5,
    height: 17,
    weight: 200,
    length: 40,
  });
  const [excelFile, setExcelFile] = useState<Blob | null>(null);
  const [responseFile, setResponseFile] = useState<string>("");
  const [repitedSku, setRepitedSku] = useState<
    Array<IRepitedSku[]> | undefined
  >();

  // Dashboard datas

  const [dashboardHome, setDashboardHome] = useState<IhomeDashboard>({
    groups: [],
    total_errors: 0,
    total_skus: 0,
  });

  const { token, auth } = useUser();

  useEffect(() => {
    if (auth) {
      loadData();
    }
  }, [auth, token]);

  const addError = (newError: IErrorLog) => {
    setErrorsLog([...errorsLog, newError]);
  };

  const ignoreError = (errorId: number) => {
    const errorList = [...errorsLog];
    errorList.splice(errorId, 1);
    setErrorsLog(errorList);
  };

  const loadData = () => {
    getCurators(token || "", setCurators);
    getErrorTypes(token || "", setErrors);

    getPlaces(token || "", setPlace);

    getHomeDashboardInfos(token || "", setDashboardHome);
  };

  return (
    <DataContext.Provider
      value={{
        errorsTypes,
        errorsLog,
        setErrorsLog,
        addError,
        ignoreError,

        curators,
        currentCurator,
        setCurrentCurator,

        places,
        currentPlace,
        setCurrentPlace,

        currentBagPattern,
        setCurrentBagPattern,

        excelFile,
        setExcelFile,

        responseFile,
        setResponseFile,

        loadData,

        repitedSku,
        setRepitedSku,

        // dashboard datas
        dashboardHome,
        setDashboardHome,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
