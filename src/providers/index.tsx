import { ModalProvider } from "./modaisProvider";
import { DataProvider } from "./dataProvider";
import { UserProvider } from "./userProvider";

interface Providertypes {
  children: React.ReactNode;
}

const Providers = ({ children }: Providertypes) => {
  return (
    <UserProvider>
      <DataProvider>
        <ModalProvider>{children}</ModalProvider>
      </DataProvider>
    </UserProvider>
  );
};
export default Providers;
