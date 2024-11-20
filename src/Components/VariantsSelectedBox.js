import { useState } from "react";
import { MdDragIndicator, MdOutlineModeEdit, MdClose } from "react-icons/md";

function VariantsSelectedBox({productId, variants, handleRemoveVariantSelection }) {
  const [variantOrder, setVariantOrder] = useState(Object.entries(variants));

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("draggedVariantIndex", index);
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const draggedIndex = parseInt(event.dataTransfer.getData("draggedVariantIndex"), 10);
    if (draggedIndex === index) return;

    const updatedOrder = [...variantOrder];
    const [draggedItem] = updatedOrder.splice(draggedIndex, 1);
    updatedOrder.splice(index, 0, draggedItem);

    setVariantOrder(updatedOrder);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <ol className="variants-main-box">
      {variantOrder.map(([variantId, variant], index) => (
        <li
        key={`${productId}-${variantId}`} 
          className="variant-box"
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDrop={(event) => handleDrop(event, index)}
          onDragOver={handleDragOver}
        >
          <MdDragIndicator className="DnDIcon" />
          <input
            type="text"
            className="txt_variant_select_box"
            value={variant.title}
            readOnly
          />
          <MdOutlineModeEdit className="editIcon" />
          <p className="variant_price">{variant.inventory_quantity} available</p>
          <p className="variant_price">{variant.price} $</p>
          <MdClose className="Select_Box_Delete_Icon"  onClick={() => handleRemoveVariantSelection(productId, variantId)} />
        </li>
      ))}
    </ol>
  );
}

export default VariantsSelectedBox;
