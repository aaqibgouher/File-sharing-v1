import { useEffect, useState } from "react";
import FileSharingLineChart from "../general/chart";
import { useSelector } from "react-redux";
import { getMeAuthState } from "../../store/slices/authSlice";
import AdminStatsGeneralComponent from "../general/stats/admin";
import UserStatsGeneralComponent from "../general/stats/user";
import { getStatsApiHelper } from "../../apiHelper/users";

const MainComponent = () => {
  const [stats, setStats] = useState(null);
  const authMeState = useSelector(getMeAuthState);

  const getStats = async () => {
    try {
      const res = await getStatsApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      // set files
      setStats(res?.data?.response);
    } catch (error) {
      console.log("MyDriveMainComponent:getFiles - Error", error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <div className="container my-2">
        {authMeState?.role === "ADMIN" && (
          <AdminStatsGeneralComponent stats={stats} />
        )}
        {authMeState?.role === "USER" && (
          <UserStatsGeneralComponent stats={stats} />
        )}
      </div>
    </>
  );
};

export default MainComponent;
