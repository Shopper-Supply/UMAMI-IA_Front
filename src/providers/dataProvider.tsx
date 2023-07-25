import { createContext, useContext, useEffect, useState } from "react";
import { IErrosTypes, IErroLogBody, IErrorLog } from "../interfaces/errors";
import { ICurator, IUserRelatory } from "../interfaces/people";
import { IMallDash, IPlace } from "../interfaces/place";
import { IBag } from "@/interfaces/bagpattern";
import {
  getCurators,
  getErrorTypes,
  getHomeDashboardInfos,
  getPlaces,
  getShoppings,
  // getShoppings,
} from "@/services/get";
import { useUser } from "./userProvider";
import { IShoppingDash, IhomeDashboard } from "@/interfaces/dashboard";
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
  setCurators: React.Dispatch<React.SetStateAction<ICurator[]>>;
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

  // dashboard datas
  dashboardHome: IhomeDashboard;
  setDashboardHome: React.Dispatch<React.SetStateAction<IhomeDashboard>>;

  allUsers: IUserRelatory[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUserRelatory[]>>;

  shoppings: IShoppingDash[] | undefined;
  setShoppings: React.Dispatch<React.SetStateAction<IMallDash[]>>;

  repitedSku: Array<IRepitedSku[]>;
  setRepitedSku: React.Dispatch<React.SetStateAction<Array<IRepitedSku[]>>>;

  malls: IMallDash[];
  setMalls: React.Dispatch<React.SetStateAction<IMallDash[]>>;
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
  setCurators: () => {},
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

  places: [
    {
      id: "",
      client: "",
      mall: "",
      abbr: "",
      name: "",
      is_active: false,
    },
  ],
  currentPlace: {
    id: "",
    client: "",
    mall: "",
    abbr: "",
    name: "",
    is_active: false,
  },
  setCurrentPlace: () => {
    {
    }
  },

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

  // dashboard datas

  dashboardHome: {
    groups: [],
    total_errors: 0,
    total_skus: 0,
  },
  setDashboardHome: () => {},

  allUsers: [],
  setAllUsers: () => {},

  shoppings: [],
  setShoppings: () => {},

  repitedSku: [],
  setRepitedSku: () => {},

  malls: [],
  setMalls: () => {},
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
  const [currentCurator, setCurrentCurator] = useState<ICurator>({
    is_active: false,
    percentage: 0,
    total_errors: 0,
    owned_errors: 0,
    error_points: 0,
  });

  const [places, setPlace] = useState([
    {
      id: "",
      client: "",
      mall: "",
      abbr: "",
      name: "",
      is_active: false,
    },
  ]);

  const [currentPlace, setCurrentPlace] = useState({
    id: "",
    client: "",
    mall: "",
    abbr: "",
    name: "",
    is_active: false,
  });

  const [currentBagPattern, setCurrentBagPattern] = useState<IBag>({
    iva: 0,
    width: 5,
    height: 17,
    weight: 200,
    length: 40,
  });
  const [excelFile, setExcelFile] = useState<Blob | null>(null);
  const [responseFile, setResponseFile] = useState<string>("");

  // Dashboard datas

  const [dashboardHome, setDashboardHome] = useState<IhomeDashboard>({
    groups: [],
    total_errors: 0,
    total_skus: 0,
  });
  const [allUsers, setAllUsers] = useState<IUserRelatory[]>([]);
  const [shoppings, setShoppings] = useState<IMallDash[]>([]); // fazer tipagem.
  const [repitedSku, setRepitedSku] = useState<Array<IRepitedSku[]>>([]);
  const [malls, setMalls] = useState<IMallDash[]>([]);
  const { token, auth, userData } = useUser();

  useEffect(() => {
    if (auth) {
      loadData();
    }
  }, [auth]);

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

    getPlaces(token || "", setPlace);
    getShoppings(token || "", setShoppings);

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
        setCurators,
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

        // dashboard datas
        dashboardHome,
        setDashboardHome,

        allUsers,
        setAllUsers,

        shoppings,
        setShoppings,

        repitedSku,
        setRepitedSku,

        malls,
        setMalls,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
