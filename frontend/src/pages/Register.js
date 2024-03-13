import Header from "../Components/Header1";
import Signup from "../Components/Signup";
import { useState } from "react";
import FarmerSignup from "../Components/Farmer";
import OfficerSignup from "../Components/Officer";
import DistributorSignup from "../Components/Distributor";

export default function SignupPage() {
  const [farmer, setFarmer] = useState(true);
  const [officer, setOfficer] = useState(false);
  const [distributor, setDistributor] = useState(false);

  function farmerClicked() {
    setFarmer(true);
    setOfficer(false);
    setDistributor(false);
  }

  function OfficerClicked() {
    setFarmer(false);
    setOfficer(true);
    setDistributor(false);
  }

  function DistributorClicked() {
    setFarmer(false);
    setOfficer(false);
    setDistributor(true);
  }

  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Header
            heading="Signup to create an account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/"
          />
          <>
            <div class="border-b border-b-gray-200">
              <ul class="-mb-px flex items-center gap-3 text-sm font-medium">
                <li
                  class=""
                  className={farmer ? "flex-1 bg-purple-600" : "flex-1"}
                >
                  <a
                    className={
                      farmer
                        ? "relative flex items-center justify-center gap-2 px-1 py-3  text-white"
                        : "relative flex items-center justify-center gap-2 px-1 py-3  text-gray-500"
                    }
                    onClick={farmerClicked}
                  >
                    Farmer
                  </a>
                </li>
                <li className={officer ? "flex-1 bg-purple-600" : "flex-1"}>
                  <a
                    className={
                      officer
                        ? "relative flex items-center justify-center gap-2 px-1 py-3  text-white"
                        : "relative flex items-center justify-center gap-2 px-1 py-3  text-gray-500"
                    }
                    onClick={OfficerClicked}
                  >
                    Officer
                  </a>
                </li>
                <li className={distributor ? "flex-1 bg-purple-600" : "flex-1"}>
                  <a
                    className={
                      distributor
                        ? "relative flex items-center justify-center gap-2 px-1 py-3  text-white"
                        : "relative flex items-center justify-center gap-2 px-1 py-3  text-gray-500"
                    }
                    onClick={DistributorClicked}
                  >
                    Distributor
                  </a>
                </li>
              </ul>
            </div>
          </>
          {farmer ? (
            <FarmerSignup />
          ) : officer ? (
            <OfficerSignup />
          ) : (
            <DistributorSignup />
          )}
        </div>
      </div>
    </>
  );
}
