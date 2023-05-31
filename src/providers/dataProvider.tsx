import { createContext, useContext, useEffect, useState } from "react";
import { IErrosTypes, IErroLogBody, IErrorLog } from "../interfaces/errors";
import { ICurator, IUserRelatory } from "../interfaces/people";
import { IPlace } from "../interfaces/place";
import { IBag } from "@/interfaces/bagpattern";
import {
  getCurators,
  getErrorTypes,
  getHomeDashboardInfos,
  getPlaces,
  getShoppings,
} from "@/services/get";
import { useUser } from "./userProvider";
import { IRepitedSku } from "@/interfaces/sheet";
import { IShoppingDash, IhomeDashboard } from "@/interfaces/dashboard";

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
  setCurrentCurator: React.Dispatch<React.SetStateAction<ICurator>>;

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

  repitedSku: Array<IRepitedSku[]>;
  setRepitedSku: React.Dispatch<React.SetStateAction<Array<IRepitedSku[]>>>;

  // dashboard datas
  dashboardHome: IhomeDashboard;
  setDashboardHome: React.Dispatch<React.SetStateAction<IhomeDashboard>>;

  shoppings: IShoppingDash[] | undefined;
  setShoppings: React.Dispatch<
    React.SetStateAction<IShoppingDash[] | undefined>
  >;

  allUsers: IUserRelatory[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUserRelatory[]>>;
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

  curators: [],
  currentCurator: {
    is_active: false,
    percentage: 0,
    total_errors: 0,
    owned_errors: 0,
    error_points: 0,
  },
  setCurrentCurator: () => {
    {
      is_active: false;
      percentage: 0;
      total_errors: 0;
      owned_errors: 0;
      error_points: 0;
    }
  },

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

  repitedSku: [],
  setRepitedSku: () => {},

  // dashboard datas

  dashboardHome: {
    groups: [],
    total_errors: 0,
    total_skus: 0,
  },
  setDashboardHome: () => {},

  shoppings: [],
  setShoppings: () => {},

  allUsers: [],
  setAllUsers: () => {},
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
  const [curators, setCurators] = useState<ICurator[]>([]);
  const [places, setPlace] = useState([{}]);

  const [currentCurator, setCurrentCurator] = useState<ICurator>({
    is_active: false,
    percentage: 0,
    total_errors: 0,
    owned_errors: 0,
    error_points: 0,
  });
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
  const [repitedSku, setRepitedSku] = useState<Array<IRepitedSku[]>>([]);

  // Dashboard datas

  const [dashboardHome, setDashboardHome] = useState<IhomeDashboard>({
    groups: [],
    total_errors: 0,
    total_skus: 0,
  });
  const [shoppings, setShoppings] = useState<IShoppingDash[] | undefined>(); // fazer tipagem.

  const [allUsers, setAllUsers] = useState<IUserRelatory[]>([]);

  const { token, auth, userData } = useUser();

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
    getCurators(token || "", setCurators, userData?.role?.id);
    getErrorTypes(token || "", setErrors);
    getShoppings(token || "", setShoppings);

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

        shoppings,
        setShoppings,

        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
