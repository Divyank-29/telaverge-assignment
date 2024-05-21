
const {Product , User} = require('../db/index')


const getUserRecommendations = async (username) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }

    if (!user.viewHistory || !Array.isArray(user.viewHistory) || user.viewHistory.length === 0) {
        return []; 
    }

    const viewedProductIds = user.viewHistory;
    const viewedProducts = await Product.find({ _id: { $in: viewedProductIds } });

    const brands = viewedProducts.map(product => product.brand).filter(Boolean);
    const colors = viewedProducts.map(product => product.color).filter(Boolean);
    const prices = viewedProducts.map(product => product.price).filter(price => price !== undefined);
    const categories = viewedProducts.map(product => product.category).filter(Boolean);
    const minPrice = Math.min(...prices) - 10000;
    const maxPrice = Math.max(...prices) + 10000;

    const query = {
        $and: [
          { category: { $in: categories } },
          {
            $or: [
              { brand: { $in: brands } },
              { color: { $in: colors } }
            ]
          },
          { price: { $gte: minPrice, $lte: maxPrice } },
          { _id: { $nin: viewedProductIds } } // Exclude viewed products
        ]
      };

    const recommendations = await Product.find(query).limit(10);

    return recommendations
};

module.exports =  getUserRecommendations


