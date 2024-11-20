import {useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import SelectProductPopupBox from "./SelectProductPopupBox";
import { MdClose } from "react-icons/md";

function ProductSelection({productData, handleRemoveProductSelection, handleDoneVariantSelection, selectedProduct}) {
  const [showDiscount, setShowDiscount] = useState(true);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState("percent");
  const [showPopup, setShowPopup] = useState(false);
  

  const handleDiscountChange = (e) => {
    const newValue = e.target.value;
    const discountValue = parseInt(newValue, 10); 
        if (discountValue < 0) {
            setDiscountValue(0);
        } else {
            setDiscountValue(discountValue);
        }
  };

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };
  
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    <div>
        <li>
          <div className="Dis_box">
            <input
              type="text"
              placeholder="Select Product"
              className="txt_product_select_box"
              value={selectedProduct}
              readOnly
              onClick={handleShowPopup}
            />
            <MdOutlineModeEdit className="editIcon" />
            {showDiscount ? (
              <button
                className="btn_styles_box add_discount_select_box_btn"
                onClick={() => setShowDiscount(false)}
              >
                Add Discount
              </button>
            ) : (
              <div className="num_flat_box_div">
                <input
                  type="number"
                  value={discountValue}
                  className="num__select_box"
                  onChange={handleDiscountChange}
                />
                <select
                  className="flat_option_box"
                  value={discountType}
                  onChange={handleDiscountTypeChange}
                >
                  <option value="percent">% off</option>
                  <option value="flat">flat off</option>
                </select>
                <MdClose className="Select_Box_Delete_Icon" onClick={handleRemoveProductSelection}/>
              </div>
            )}
          </div>
        </li>
      {showPopup && (
        <SelectProductPopupBox
          productData = {productData}
          onClose={handleClosePopup}
          handleDoneVariantSelection = {handleDoneVariantSelection}
        />
      )}
    </div>
    
  );
}

export default ProductSelection;