import CommonBook from "../components/CommonBook";

const VehicleInspection: React.FC = () => {

  return (
    <CommonBook
      headerTitle='Select Vehicle Type'
      newEntryTitle='New Vehicle Inspection'
      newEntryDescription='Complete new vehicle inspection'
      newEntryNavigation={{ name: "NewVehicleInspection" }}
      allEntryTitle='Inspection History'
      allEntryDescription='View All vehicle inspections done by you'
      allEntriesNavigation={{ name: "InspectionHistory" }}
    />
  );
}


export default VehicleInspection