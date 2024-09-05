import React, { useState } from "react";
import "./Item.css";
import { FaPlus } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Item = (props) => {
  const [item, setItem] = useState(props?.items);
  console.log(item, "this is item");
  const deleteItem = (id) => {
    const updateItems = item.filter((elem, ind) => {
      return ind !== id;
    });
    setItem(updateItems);
  };
  return (
    <>
      <div className="main-card">
        {item?.map((elem, ind) => {
          return (
            <>
              <div className="main-div" key={ind}>
                {elem}

                <div className="inside-btn">
                  <button>
                    <FaPencilAlt />
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteItem(ind)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Item;
