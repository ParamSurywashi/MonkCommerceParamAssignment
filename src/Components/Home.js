import { useState } from "react";
import "../styles/Home.scss";
import ProductSelection from "./ProductSelection";
import { MdDragIndicator } from "react-icons/md";

function Home() {
  const [productSelections, setProductSelections] = useState([0]);

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

  return (
    <div className="Home">
      <h2>Add Bundle Projects (Max. 4 Products)</h2>

      <ol className="ProductSelectionBox">
        {productSelections.map((index, itemIndex) => (
          <div
            key={index}
            className="product-selection-container"
            draggable
            onDragStart={(event) => handleDragStart(event, itemIndex)}
            onDrop={(event) => handleDrop(event, itemIndex)}
            onDragOver={handleDragOver}
          >
            <MdDragIndicator className="DnDIcon" />
            <ProductSelection
              handleRemoveProductSelection={() =>
                handleRemoveProductSelection(index)
              }
            />
          </div>
        ))}
      </ol>

      {
        <button
          className="btn_styles_box_outline add-product-btn"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      }
    </div>
  );
}

export default Home;
