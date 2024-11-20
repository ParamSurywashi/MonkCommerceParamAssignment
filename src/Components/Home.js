import React, { useState, useEffect } from "react";
import "../styles/Home.scss";
import ProductSelection from "./ProductSelection";
import { MdDragIndicator } from "react-icons/md";
import jsonData from '../data.json';
import VariantsSelectedBox from "./VariantsSelectedBox";

function Home() {
  const [productSelections, setProductSelections] = useState([0]);
  const [productData, setProductData] = useState([]);
  const [showVariants, setShowVariants] = useState({});
  const [newSelectedProVariants, setNewSelectedProVariants] = useState({});
  
  
  useEffect(() => {
    setProductData(jsonData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddProduct = () => {
    if (productSelections.length < 4) {
      setProductSelections([...productSelections, productSelections.length]);
    }
  };

  const handleRemoveProductSelection = (indexToRemove) => {
    setProductSelections((prevSelections) =>
      prevSelections.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("draggedIndex", index);
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
  
    if (productSelections.length < 4) {
      const draggedIndex = event.dataTransfer.getData("draggedIndex");
      const draggedItem = productSelections[draggedIndex];
  
      const updatedSelections = [...productSelections];
  
      updatedSelections.splice(draggedIndex, 1);
      updatedSelections.splice(index, 0, draggedItem);
      setProductSelections(updatedSelections);
    }
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const toggleVariants = (productIndex) => {
    setShowVariants((prevState) => ({
      ...prevState,
      [productIndex]: !prevState[productIndex],
    }));
  };

  function handleAddVarientFun(mynewdata) {
    const filteredData = {};
  
    Object.entries(mynewdata).forEach(([productId, variants]) => {
      const matchedProduct = productData.find((product) => product.id === Number(productId));
      if (matchedProduct) {
        filteredData[productId] = {};
  
        Object.entries(variants).forEach(([variantId, isSelected]) => {
          if (isSelected) {
            const variantData = matchedProduct.variants.find((variant) => variant.id === Number(variantId));
            
            if (variantData) {
              filteredData[productId][variantId] = variantData;
            }
          }
        });
        
        // if (Object.keys(filteredData[productId]).length > 0) {
        //   //handleAddProductWithVariants(productId, filteredData[productId]);
        // }
      }
    });
    setNewSelectedProVariants(filteredData);
  }
  

  return (
    <div className="Home">
      <h2>Add Bundle Projects (Max. 4 Products)</h2>

      <ol className="ProductSelectionBox">
        {productSelections.map((index, itemIndex) => (
          <React.Fragment key={index}>
            <div
              className="product-selection-container"
              draggable
              onDragStart={(event) => handleDragStart(event, itemIndex)}
              onDrop={(event) => handleDrop(event, itemIndex)}
              onDragOver={handleDragOver}
            >
              <MdDragIndicator className="DnDIcon" />
              <ProductSelection
                productData={productData}
                handleRemoveProductSelection={() =>
                  handleRemoveProductSelection(index)
                }
                handleDoneVariantSelection={handleAddVarientFun}
              />
            </div>
            <button
              onClick={() => toggleVariants(itemIndex)}
              className="toggle-variants-btn"
              id={`toggle_var_btn_${itemIndex}`}
            >
              {showVariants[itemIndex] ? "Hide Variants" : "Show Variants"}
            </button>
            {showVariants[itemIndex] && (
              <>
                {Object.entries(newSelectedProVariants).map(([productId, variants]) => {
                    return (
                      <VariantsSelectedBox key={productId} variants={variants} />
                    );
                  }
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </ol>

      {
        <button className="btn_styles_box_outline add-product-btn" onClick={handleAddProduct} >
          Add Product
        </button>
      }
    </div>
  );
}

export default Home;
