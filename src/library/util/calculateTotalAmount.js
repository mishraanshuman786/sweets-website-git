const calculateDiscount = (item, productWeight) => {
    const price = item.category[item.categoryIndex].price;
    const categoryId = item.categoryId;

    // Apply discounts based on categoryId and weight
    switch (categoryId) {
      case "656daabf41ff1afeaba93473":
        return price * productWeight * (1 - (productWeight >= 1 ? 0.9 : 1));
      case "656dab9341ff1afeaba93474":
        return price * productWeight * (1 - (productWeight >= 1 ? 0.85 : 1));
      case "656dabc341ff1afeaba93475":
        return price * productWeight * (1 - (productWeight >= 1 ? 0.9 : 1));
      case "656dabe841ff1afeaba93476":
        return price * productWeight * (1 - (productWeight >= 1 ? 0.9 : 1));
      // Add more cases for other categories if needed

      default:
        // Default case (no discount)
        return 0;
    }
  };

  
export const calculateTotalAmount = (item, productWeight) => {
    const price = item.category[item.categoryIndex].price;
    return price * productWeight-calculateDiscount(item,productWeight);
  };