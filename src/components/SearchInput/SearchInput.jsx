import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Test from "../ExcelSheet/ExcelFile";
import axios from "axios";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItem, setSearchedItem] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const handleKeyDown = (event) => {
    if (!data || data.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((prevIndex) =>
          prevIndex < data.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : data.length - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0 && highlightedIndex < data.length) {
          // console.log(data[highlightedIndex]);
          setSearchedItem(data[highlightedIndex]); // Assuming the item has a 'name' property
          // setAllProduct((prev) => [...prev, data[highlightedIndex]]);
          setIsFocused(false);
        }
        break;
      case "Escape":
        setIsFocused(false);
        break;
      default:
        break;
    }
  };

  // console.log(typeof searchTerm);
  // Queries
  const { data, error } = useQuery({
    queryKey: ["searchTerm", searchTerm],
    queryFn: async () => {
      // console.log("Testin");
      const response = await axios.get(
        `/product/search-item-by-${
          Number.isInteger(searchTerm) ? "code" : "name"
        }/${searchTerm}`
      );
      // console.log(response.data.data)
      return response.data.data;
    },
    enabled: !!searchTerm,
  });
  const changeStringIntoNumber = (num) => {
    if (num.includes(",")) {
      return Number(num.split(",").join(""));
    } else if (typeof num === "string") {
      return Number(num);
    } else {
      return num;
    }
  };
  // changeStringIntoNumber("342,25");
  // const { data, error } = useQuery({
  //   queryKey: ["searchTerm", searchTerm],
  //   queryFn: async () => {
  //     console.log("hello");
  //     const response = await axios.get(
  //       `https://boq-backend.xri.com.bd/search-by-item-code/${searchTerm}`
  //     );

  //     return response.data;
  //   },
  //   enabled: !!searchTerm,
  // });
  // console.log(data);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleInputChangeNumber = (event) => {
    setSearchTerm(0);
    setSearchTerm(Number(event.target.value));

    // console.log(event.target.value)
    if (event.target.value === "") {
      console.log("Helo");
      setSearchTerm("");
    }
  };
  const handelQuantity = (event) => {
    setSearchedItem((prev) => {
      console.log(prev);
      return {
        ...prev,
        quantity: event.target.value,
        totalAmount: event.target.value * prev.price,
        ac: (prev.acP * (event.target.value * prev.price)) / 100,
      };
    });
  };

  const handleRemark = (event) => {
    setSearchedItem((prev) => {
      return {
        ...prev,
        remark: event.target.value,
      };
    });
  };
  const handleItemClick = (item) => {
    setSearchedItem(item); // Adjust according to the structure of your data
    setIsFocused(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("hello");
    if (Object.keys(searchedItem).length !== 0) {
      setAllProduct((prev) => [...prev, searchedItem]);
      setSearchTerm("");
      setSearchedItem({});
    }
  };

  // console.log("searchedItem", searchedItem);
  // console.log(searchedItem);
  // console.log(allProduct);

  //  useEffect(() => {
  //    const fetchData = async () => {
  //      try {
  //        const response = await axios.get(
  //          `https://boq-backend.xri.com.bd/search-by-item-name/s`
  //        );

  //        console.log(response.data); // Log the data directly
  //      } catch (error) {
  //        console.error("Error fetching data:", error);
  //      }
  //    };

  //    fetchData();
  //  }, []);
  return (
    <div className="mt-2 px-2">
      <form className="searchField flex gap-2 justify-between items-end ">
        <div className="flex flex-col items-center font-medium">
          <label htmlFor="itName" className="text-sm ">
            Item Name
          </label>
          <input
            id="itName"
            type="text"
            name="itName"
            placeholder="Search..."
            value={
              Object.keys(searchedItem).length !== 0 && !isFocused
                ? searchedItem?.item
                : Number.isInteger(searchTerm)
                ? !isFocused
                  ? "Search..."
                  : ""
                : searchTerm
            }
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
            className="w-full rounded-md focus:ring focus:ring-opacity-75  "
          />
          {isFocused && data && (
            <ul className="absolute top-[70px] left-2 z-50 bg-white border border-gray-300 w-1/3 rounded-md mt-1">
              {data.map((item, index) => (
                <li
                  key={index}
                  className={`p-2 cursor-pointer flex justify-between items-center ${
                    highlightedIndex === index ? "bg-gray-200" : ""
                  }`}
                  onMouseDown={() => handleItemClick(item)} // Use onMouseDown to avoid blur event
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span>{item.item} </span>
                  <span>{item.code} </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col items-center font-medium">
          <label htmlFor="itCode" className="text-sm">
            Item Code
          </label>
          <input
            id="itCode"
            type="number"
            // disabled
            min={0}
            name="itCode"
            onChange={handleInputChangeNumber}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
            value={
              Object.keys(searchedItem).length !== 0 && !isFocused
                ? changeStringIntoNumber(searchedItem.code)
                : searchTerm
            }
            placeholder="Item Code"
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
          {/* {console.log(
            Object.keys(searchedItem).length !== 0 && !isFocused
              ? parseInt(searchedItem.code)
              : searchTerm
          )} */}
        </div>
        <div className="flex flex-col items-center font-medium">
          <label htmlFor="itQuantity" className="text-sm">
            Quantity
          </label>
          <input
            id="itQuantity"
            type="number"
            min={1}
            value={
              Object.keys(searchedItem).length !== 0
                ? searchedItem.quantity
                : ""
            }
            onChange={handelQuantity}
            placeholder="Enter Quantity..."
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        {/* {console.log(searchedItem.quantity)} */}
        <div className="flex flex-col items-center font-medium">
          <label htmlFor="unitRate" className="text-sm">
            Unit Rate
          </label>
          <input
            id="unitRate"
            type="text"
            value={
              Object.keys(searchedItem).length !== 0
                ? changeStringIntoNumber(
                    searchedItem.unit_price_with_TAX_ASF_VAT
                  )
                : "0.00 BDT"
            }
            readOnly={true}
            disabled
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="flex flex-col items-center font-medium">
          <label htmlFor="totalRate" className="text-sm">
            Total Amount
          </label>
          {console.log(searchedItem.totalAmount)}
          <input
            id="totalRate"
            type="text"
            value={
              Object.keys(searchedItem).length !== 0
                ? searchedItem.totalAmount
                : "0.00 BDT"
            }
            readOnly={true}
            disabled
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="flex flex-col items-center font-medium">
          <label htmlFor="acP" className="text-sm">
            AC %
          </label>
          <input
            id="acP"
            type="text"
            placeholder="5%"
            value={
              Object.keys(searchedItem).length !== 0
                ? `${searchedItem?.ASF}`
                : "5%"
            }
            disabled
            readOnly={true}
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="flex flex-col items-center font-medium">
          <label htmlFor="ac" className="text-sm">
            AC
          </label>
          <input
            id="ac"
            type="text"
            disabled
            value={
              Object.keys(searchedItem).length !== 0
                ? searchedItem.ASF_amount
                : "0.00 BDT"
            }
            readOnly={true}
            placeholder="0.00 BDT"
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <div className="flex flex-col items-center font-medium">
          <label htmlFor="remark" className="text-sm">
            Remark
          </label>
          <input
            id="remark"
            type="text"
            placeholder="type a comment here..."
            value={
              Object.keys(searchedItem).length !== 0 ? searchedItem.remark : ""
            }
            onChange={handleRemark}
            className="w-full rounded-md focus:ring focus:ring-opacity-75 "
          />
        </div>
        <button
          type="button"
          onClick={handleFormSubmit}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Save
        </button>
      </form>
      <Test data={allProduct} />
    </div>
  );
};

export default SearchInput;
