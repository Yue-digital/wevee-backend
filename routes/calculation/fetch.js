function custom_calcution(data){
    const computeData = data.auto_bruttolistenpreis - data.auto_leasingrate

    return {
        leasing_rate: computeData,
        calculation_text: `${data.auto_bruttolistenpreis} - ${data.auto_leasingrate}`
    }
}

function CalculationFetchRoute(router){

    router.post('/', async (req, res) => {
        try {

            const { body } = req
            let data;
            if (body.calculation_method == 'ev4austria') {
                data = custom_calcution(body)
            }

            return res.json({
                data: {...data},
                error: null,
              })
            
        } catch (error) {
            return res.json({
                data: null,
                error: {
                  message: error.toString()
                }
            })
        }
    })

}


export default CalculationFetchRoute
