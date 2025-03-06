import authMiddlewares from "../../middlewares/auth.js";
import tokenHelper from "../../helpers/token.js"
import Employee from "../../models/employee.js";
import { userFindbyID, userUpdate } from "../../models/user.js";

function EmployeeUpdateRouter(router){

    const employee = new Employee()

    router.put('/user/:id',authMiddlewares.authenticatePrefix, async (req, res) => {
        try {
            const { body, params } = req
            const results = await userUpdate(params.id, body, req.tablePrefix)
            const user = await userFindbyID(params.id, req.tablePrefix)

            if (
                user.applicable_collective_agreement &&
                user.next_advancement &&
                user.minimum_salary_agreement &&
                user.actual_yearly_salary &&
                user.non_cash_benefit &&
                user.overtime_paid &&
                user.other_salary &&
                user.bonus_salary &&
                user.retired &&
                user.amount_tax_exemption &&
                user.commuting_allowance &&
                user.job_ticket_paid &&
                user.amount_single_earner &&
                user.amount_family_bonus 
            ) {
                await userUpdate(params.id, {
                    verify: true
                }, req.tablePrefix)
            }

            return res.json({
                data: results,
                error: null,
            })

        } catch (error) {
            console.log(error)
            return res.json({
              data: null,
              error: {
                message: 'Something went wrong'
              }
            })
        }
    })

}

export default EmployeeUpdateRouter