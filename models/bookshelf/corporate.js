export default function corporate(bookshelf){
    
  const CorporateCarPricingBookshelf = bookshelf.model(
      'CorporateCarPricing',
      {
        tableName: 'subdealer',
       
        corporate(){
          return this.belongsTo('Corporate', 'sub_dealer_id', 'id')
        }
      }
    )
  
    const CorporateBookshelf = bookshelf.model('Corporate', {
      tableName: 'corporate',
      
      corporateCarPricing(){
        return this.belongsTo('Corporate', 'sub_dealer_id', 'id')
      }
    })


    return {
      CorporateCarPricingBookshelf,
      CorporateBookshelf
    }
  }
  