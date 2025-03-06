export default function corporatecCarPricing(bookshelf){
    const CorporateCarPricingBookshelf = bookshelf.model(
      'CorporateCarPricing',
      {
        tableName: 'corporate_vehicles_pricing',
       
        car(){
          return this.belongsTo('Car', 'car_id', 'id')
        }
      }
    )
  
    const CarBookshelf = bookshelf.model('Car', {
      tableName: 'vehicles',
      
    })


    return {
        CorporateCarPricingBookshelf,
        CarBookshelf
    }
  }
  