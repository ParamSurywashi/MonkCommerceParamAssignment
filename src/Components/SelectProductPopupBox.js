import React, {useState } from 'react';
import '../styles/SelectProductPopupBox.scss';
import { MdClose } from "react-icons/md";

function SelectProductPopupBox({productData, onClose, handleDoneVariantSelection }) {
  const [SelectProdNum, SetSelectProdNum] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState({});

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevState) => {
      const newSelected = { ...prevState };
      const isCurrentlySelected = !!newSelected[productId];
  
      if (!isCurrentlySelected) {
        const firstVariantId = productData.find((product) => product.id === productId)?.variants?.[0]?.id;
        if (firstVariantId) {
          newSelected[productId] = { [firstVariantId]: true };
        }
      } else {
        delete newSelected[productId];
      }
  
      SetSelectProdNum((product_num) => {
        return isCurrentlySelected ? Math.max(product_num - 1, 0) : product_num + 1;
      });
  
      return newSelected;
    });
  };
  
  const handleVariantSelect = (productId, variantId) => {
    setSelectedProducts((prevState) => {
      const newSelected = { ...prevState };
  
      if (!newSelected[productId]) {
        newSelected[productId] = {};
      }
      
      const isVariantSelected = newSelected[productId]?.[variantId];
      if (isVariantSelected === undefined || isVariantSelected === false) {
        newSelected[productId] = {
          ...newSelected[productId],
          [variantId]: true,
        };
      } else {
        newSelected[productId] = {
          ...newSelected[productId],
          [variantId]: false,
        };
      }
  
      const hasAtLeastOneVariantSelected = Object.values(newSelected[productId]).some(
        (isSelected) => isSelected
      );

      if (!hasAtLeastOneVariantSelected) {
        delete newSelected[productId];
      }
  
      SetSelectProdNum((prevProductNum) => {
        if (!hasAtLeastOneVariantSelected) {
          return Math.max(prevProductNum - 1, 0);
        }
  
        if (!prevState[productId]) {
          return prevProductNum + 1; 
        }
  
        return prevProductNum; 
      });
  
      return newSelected;
    });
  };

  const handleDoneClick = () => {
    handleDoneVariantSelection(selectedProducts);
    onClose();
  };
  const filteredProducts = productData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}> <MdClose />
        </span>
        <h2>Select Products</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="Product_Popup_box">
          <tbody>
            {filteredProducts.map((product) => {
              const isProductSelected = selectedProducts[product.id];
              return (
                <React.Fragment key={product.id}>
                  <tr>
                    <td className="table_head_checkmark">
                      <input
                        type="checkbox"
                        checked={isProductSelected || false}
                        onChange={() => handleProductSelect(product.id)}
                      />
                    </td>
                    <td className='td_head_img'>
                      <img
                        src={product.image.src}
                        className="img_product_title"
                        alt={product.title}
                      />
                    </td>
                    <td>{product.title}</td>
                  </tr>
                  {product.variants.map((variant) => {
                    const isVariantSelected =
                      selectedProducts[product.id] &&
                      selectedProducts[product.id][variant.id];
                    return (
                      <tr key={variant.id}>
                        <td></td>
                        <td>
                          <input
                            type="checkbox"
                            checked={isVariantSelected || false}
                            onChange={() =>
                              handleVariantSelect(product.id, variant.id)
                            }
                          />
                        </td>
                        <td>{variant.title}</td>
                        <td>{variant.inventory_quantity || 0} available</td>
                        <td>${variant.price}</td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div className='opnclsbtnbox'>
          <div>{SelectProdNum} Product Selected</div>
          <div>
            <button onClick={onClose} className="btn_styles_box_outline close_popup_btn" >
              Close
            </button>
            <button onClick={handleDoneClick} className="btn_styles_box done_popup_btn">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectProductPopupBox;