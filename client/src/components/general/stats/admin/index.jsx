import FileSharingLineChart from "../../chart";

const AdminStatsGeneralComponent = ({ stats }) => {
  return (
    <>
      {/* First Row: 3 columns */}
      <div className="row mb-4">
        <div className="col-4">
          <div
            className="card bg-light-purple"
            style={{
              border: "none",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <span
                className="text-left"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Total Users
              </span>
              <span
                className="fs-3 color-dark-puple"
                style={{
                  fontWeight: "bold",
                }}
              >
                {stats?.totalUsers}
              </span>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div
            className="card bg-light-purple"
            style={{
              border: "none",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <span
                className="text-left"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Total Files
              </span>
              <span
                className="fs-3 color-dark-puple"
                style={{
                  fontWeight: "bold",
                }}
              >
                {stats?.totalFiles}
              </span>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div
            className="card bg-light-purple"
            style={{
              border: "none",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <span
                className="text-left"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Total Shared Files
              </span>
              <span
                className="fs-3 color-dark-puple"
                style={{
                  fontWeight: "bold",
                }}
              >
                {stats?.sharedFiles}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <FileSharingLineChart />
    </>
  );
};

export default AdminStatsGeneralComponent;
