import React, { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

const Test = ({ data }) => {
  const tableRef = useRef(null);

  const [sumOfTotal, setSumOfTotal] = useState(0);
  const [sumOfAgencyCommission, setSumOfAgencyCommission] = useState(0);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Userstable",
    sheet: "Users",
  });
  // const data = [
  //   {
  //     id: 199,
  //     item_code: "40015023",
  //     item_name: "SHIRT - HALF SLEEVE_EA_DHAKA",
  //     supplier: "ASIATIC EXPERIENTIAL MARKETING LIMITED",
  //     price: 270,
  //     contact: "17318",
  //     currency: "BDT",
  //     quantity: 0,
  //     totalAmount: 230,
  //     acP: 5,
  //     ac: 20,
  //     remark: "",
  //   },
  //   {
  //     id: 202,
  //     item_code: "40016009",
  //     item_name: "T-SHIRT OPTION 4_CEILING_201-500",
  //     supplier: "ASIATIC EXPERIENTIAL MARKETING LIMITED",
  //     price: 145,
  //     contact: "17318",
  //     currency: "BDT",
  //     quantity: 0,
  //     totalAmount: 4320,
  //     acP: 5,
  //     ac: 420,
  //     remark: "",
  //   },
  //   {
  //     id: 206,
  //     item_code: "40015939",
  //     item_name: "ITEM: POLO SHIRT: WHITE_CEILING_201-500",
  //     supplier: "ASIATIC EXPERIENTIAL MARKETING LIMITED",
  //     price: 280,
  //     contact: "17318",
  //     currency: "BDT",
  //     quantity: 0,
  //     totalAmount: 2330,
  //     acP: 5,
  //     ac: 230,
  //     remark: "",
  //   },
  //   {
  //     id: 207,
  //     item_code: "40015949",
  //     item_name: "POLO SHIRT OPTION 1_CEILING_201-500",
  //     supplier: "ASIATIC EXPERIENTIAL MARKETING LIMITED",
  //     price: 230,
  //     contact: "17318",
  //     currency: "BDT",
  //     quantity: 0,
  //     totalAmount: 4230,
  //     acP: 5,
  //     ac: 640,
  //     remark: "",
  //   },
  //   {
  //     id: 208,
  //     item_code: "40015977",
  //     item_name: "POLO SHIRT OPTION 6_CEILING_ABOVE 3000",
  //     supplier: "ASIATIC EXPERIENTIAL MARKETING LIMITED",
  //     price: 220,
  //     contact: "17318",
  //     currency: "BDT",
  //     quantity: 0,
  //     totalAmount: 2340,
  //     acP: 5,
  //     ac: 630,
  //     remark: "",
  //   },
  // ];

  useEffect(() => {
    setSumOfTotal(0);
    setSumOfAgencyCommission(0);
    data.forEach((dt) => {
      setSumOfTotal((prev) => prev + dt.totalAmount);
      setSumOfAgencyCommission((prev) => prev + dt.ac);
    });
  }, [data]);

  console.log("🚀 ~ sumOfTotal:", sumOfTotal);

  return (
    <div>
      <button
        type="button"
        onClick={onDownload}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {" "}
        Export excel{" "}
      </button>

      <table ref={tableRef}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                borderCollapse: "collapsea",
                backgroundColor: "#a6a6a6",
              }}
              colSpan={9}
            >
              {" "}
              BOQ for Leaders As Changemakers 2024
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              style={{
                width: "40px",
                border: "1pt solid black",
                borderCollapse: "collapsea",
              }}
            >
              SL
            </th>
            <th
              style={{
                width: "75px",
                border: "1pt solid black",
                borderCollapse: "collapsea",
              }}
            >
              Item Code
            </th>
            <th
              style={{
                width: "225px",
                border: "1pt solid black",
                borderCollapse: "collapsea",
              }}
            >
              Items
            </th>
            <th
              style={{
                width: "90px",
                border: "1pt solid black",
                borderCollapse: "collapsea",
              }}
            >
              QTY
            </th>
            <th
              style={{
                width: "75px",
                border: "1pt solid black",
                borderCollapse: "collapsea",
              }}
            >
              Unit Rate
            </th>
            <th
              style={{
                width: "100px",
                border: "1pt solid black",
                borderCollapse: "collapsea",
              }}
            >
              Amount
            </th>
            <th
              style={{
                width: "50px",
                border: "1pt solid black",
                borderCollapse: "collapsea",
              }}
            >
              AC%
            </th>
            <th
              style={{
                width: "80px",
                border: "1pt solid black",
                borderCollapse: "collapsea",
              }}
            >
              AC
            </th>
            <th
              style={{
                width: "140px",
                border: "1pt solid black",
                borderCollapse: "collapsea",
              }}
            >
              Remarks
            </th>
          </tr>

          {data.map((item, index) => {
            return (
              <tr key={item.item_code}>
                <td
                  style={{
                    border: "1pt solid black",
                    borderCollapse: "collapsea",
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    border: "1pt solid black",
                    borderCollapse: "collapsea",
                  }}
                >
                  {item.item_code}
                </td>
                <td
                  style={{
                    border: "1pt solid black",
                    borderCollapse: "collapsea",
                  }}
                >
                  {item.item_name}
                </td>
                <td
                  style={{
                    border: "1pt solid black",
                    borderCollapse: "collapsea",
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  style={{
                    border: "1pt solid black",
                    borderCollapse: "collapsea",
                  }}
                >
                  {item.price}
                </td>
                <td
                  style={{
                    border: "1pt solid black",
                    borderCollapse: "collapsea",
                  }}
                >
                  {item.totalAmount}
                </td>
                <td
                  style={{
                    border: "1pt solid black",
                    borderCollapse: "collapsea",
                  }}
                >
                  {item.acP}%
                </td>
                <th
                  style={{
                    border: "1pt solid black",
                    borderCollapse: "collapsea",
                  }}
                >
                  {item.ac}
                </th>
                <td
                  style={{
                    border: "1pt solid black",
                    borderCollapse: "collapsea",
                  }}
                >
                  {item.remark}
                </td>
              </tr>
            );
          })}
          {/* calculation start here  */}
          <tr>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
              colSpan={5}
            >
              Total
            </th>

            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            >
              {sumOfTotal}
            </th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></th>
          </tr>

          <tr>
            <td
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></td>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            >
              40016081
            </th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            >
              Agency Commission{" "}
            </th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            >
              {sumOfTotal}
            </th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            >
              0.05
            </th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            >
              {sumOfAgencyCommission}
            </th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></th>
          </tr>
          <tr>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
              colSpan={5}
            >
              Grand Total
            </th>

            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            >
              {sumOfAgencyCommission}
            </th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></th>
            <th
              style={{ border: "1pt solid black", borderCollapse: "collapsea" }}
            ></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Test;
