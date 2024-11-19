import React, { useEffect, useState } from 'react';
import '../styles/SelectProductPopupBox.scss';
import { MdClose } from "react-icons/md";

function SelectProductPopupBox({ onClose, onProductSelect }) {
  const [products, setProducts] = useState([]);
  const [SelectProdNum, SetSelectProdNum] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState({});


  const productData = [
    {
      "id": 77,
      "title": "Fog Linen Chambray Towel - Beige Stripe",
      "variants": [
        {
          "id": 1,
          "product_id": 77,
          "title": "XS / Silver",
          "available": "99",
          "price": "49"
        },
        {
          "id": 2,
          "product_id": 77,
          "title": "S / Silver",
          "available": "99",
          "price": "49"
        },
        {
          "id": 3,
          "product_id": 77,
          "title": "M / Silver",
          "available": "99",
          "price": "49"
        },
        {
          "id": 4,
          "product_id": 77,
          "title": "L / Silver",
          "available": "49",
          "price": "49"
        },
        {
          "id": 5,
          "product_id": 77,
          "title": "XS / Gold",
          "available": "99",
          "price": "49"
        }
      ],
      "image": {
        "id": 266,
        "product_id": 77,
        "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1"
      }
    },
    {
      "id": 80,
      "title": "Orbit Terrarium - Large",
      "variants": [
        {
          "id": 64,
          "product_id": 80,
          "title": "Product Narket",
          "available": "99",
           "price": "109"
        },
        {
          "id": 65,
          "product_id": 80,
          "title": "Small / Green",
          "price": "99"
        },
        {
          "id": 66,
          "product_id": 80,
          "title": "Medium / Green",
          "price": "104"
        }
      ],
      "image": {
        "id": 272,
        "product_id": 80,
        "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1"
      }
    },
    {
      "id": 81,
      "title": "Sunset Beach Towel - Stripe",
      "variants": [
        {
          "id": 7,
          "product_id": 81,
          "title": "S / Blue",
          "price": "39"
        },
        {
          "id": 8,
          "product_id": 81,
          "title": "M / Blue",
          "available": "35",
          "price": "44"
        },
        {
          "id": 9,
          "product_id": 81,
          "title": "L / Blue",
          "available": "65",
          "price": "49"
        }
      ],
      "image": {
        "id": 273,
        "product_id": 81,
        "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/81/images/273/sunsetbeachtowelstripe.1647248662.386.513.jpg?c=1"
      }
    }
  ];

  useEffect(() => {
    setProducts(productData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      console.log(isVariantSelected)
      if (isVariantSelected === undefined) {
        newSelected[productId] = {
          ...newSelected[productId],
          [variantId]: false,
        };
      } else {
        newSelected[productId][variantId] = !isVariantSelected;
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
    let productName = '';
    Object.keys(selectedProducts).forEach((productId) => {
      const selectedProduct = selectedProducts[productId];
      const product = products.find((p) => p.id === Number(productId));
  
      if (selectedProduct) {
        productName = product.title;
      }
    });
  
    onProductSelect(productName);
  };
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(()=>{
    console.log(selectedProducts)
  })
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
                        <td>{variant.available || 0} available</td>
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