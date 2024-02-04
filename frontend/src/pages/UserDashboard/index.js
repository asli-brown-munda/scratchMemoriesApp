import FilesTable from "components/FileList/FilesTable.tsx";
import MKBox from "components/MKBox";
import LoggedInUserNavbar from "components/UserNavbar";

const UserDashboard = function () {
  return (
    <>
      <MKBox>
        <LoggedInUserNavbar />
        <FilesTable />
      </MKBox>
    </>
  );
};

export default UserDashboard;
