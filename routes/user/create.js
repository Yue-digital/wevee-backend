import authMiddlewares from "../../middlewares/auth.js"
import { createUser, userFindbyID } from "../../models/user.js"
import { tasslinkCreateOne } from "../../models/tasslink.js"
import axios from "axios"
import tokenHelper from '../../helpers/token.js'
import { newUserNotification } from "../../email/new-user-notification.js"
import Employee from "../../models/employee.js"
import sgMail from "@sendgrid/mail"
import Corporate from "../../models/corporate.js"
import CorporateSettings from "../../models/corporate_settings.js"
function userCreateRouter(router) {
    const employee = new Employee()
    const corporate = new Corporate()
    const corporateSettings = new CorporateSettings()

    router.post('/', async (req, res) => {
        try {

          const { body } = req
          const {tablePrefix, ...bodyData} = body
          const [results] = await createUser(bodyData, tablePrefix)

          const employerUsers = await employee.fetchEmployee(tablePrefix, {status: 1}, {limit: 9999})
          const employerEmails = employerUsers.map(e => e.email)
          const corSetting = await corporateSettings.findOneBy({ table_prefix: tablePrefix })
          const corporateData = await corporate.findOneBy({id: corSetting.corporate_id})
          

          let newUserEmail = {
              to: employerEmails, // Change to your recipient
              from: 
              {
                  "email": "system@wevee.dev",
                  "name": "WeVee"
              },
              subject: 'New Employee',
              text: 'WeVee',
              html: newUserNotification({
                userID: results,
                tablePrefix,
                url: (corporateData.country != 'Germany' ? true : false )
              }),
          }


          sgMail
          .send(newUserEmail)
          .then((response) => {
              console.log(response[0].statusCode)
              console.log(response[0].headers)
          })
          .catch((error) => {
              console.error(error.response.body)
          })
          const user = await userFindbyID(results, tablePrefix)

          let token

            if (user) {
                token = await tokenHelper.tokenize({
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    prefix: tablePrefix
                })
            }
          return res.json({
              data: {
                ...results,
                token,
                prefix: tablePrefix
              },
              error: null,
            })
        } catch (error) {
          console.log(error)
        }
    })

    router.post(
      "/tasslink",
      authMiddlewares.authenticatePrefix,
      async function (req, res) {
        const { user, body, params } = req;
        try {
          const userDetails = await userFindbyID(user.id, req.tablePrefix);
  
          let returnData = [];
          for (let tasslink of body) {
            let taslinkDetails = {
              alter: userDetails.age,
              bundesland: userDetails.state,
              bruttolohn: userDetails.gross_wage,
              steuerklasse: userDetails.tax_class,
              steuerfreibetrag: userDetails.tax_exempt_amount,
              kinder: userDetails.children,
              kinderzuschlag: userDetails.child_allowance,
              kirchensteuer: userDetails.church_tax,
              krankenversicherung: userDetails.health_insurance,
              basistarif_privat_krankenkasse:
                userDetails.basic_tariff_private_health_insurance,
              beitrag_privat_pflegekasse:
                userDetails.contribution_private_care_fund,
              beitrag_privat_krankenkasse:
                userDetails.contribution_private_health_insurance,
              basissatz_krankenkasse: userDetails.base_rate_health_insurance,
              zusatzsatz_krankenkasse: userDetails.supplement_health_insurance,
              rentenversicherung: userDetails.pension_insurance,
              anfahrt_kilometer: userDetails.arrival_kilometres,
              anfahrt_anzahl: userDetails.journeys_number,
              auto_bruttolistenpreis: tasslink.list_price,
              auto_leasingrate: tasslink.leasing_rate,
              auto_leasingrate_verteilung_ag_an: "1",
            };
            const taslink_response = await axios({
              method: "POST",
              url: "https://wevee1.tasslink.eu/api/calc-electric-car",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(
                  "wevee:4nXwyXwdhW3JY9TC",
                  "utf-8"
                ).toString("base64")}`,
              },
              data: taslinkDetails,
            });
  
            await tasslinkCreateOne({
              an_fw_auszahlbetrag: taslink_response.data.an_fw_auszahlbetrag,
              an_normal_auszahlbetrag:
                taslink_response.data.an_normal_auszahlbetrag,
              calculated_wevee_rate:
                taslink_response.data.an_normal_auszahlbetrag -
                taslink_response.data.an_fw_auszahlbetrag,
              leasing_rate: tasslink.leasing_rate,
              car_id: tasslink.car_id,
              user_id: userDetails.id,
            }, req.tablePrefix);
            returnData.push({
              an_fw_auszahlbetrag: taslink_response.data.an_fw_auszahlbetrag,
              an_normal_auszahlbetrag:
                taslink_response.data.an_normal_auszahlbetrag,
              calculated_wevee_rate:
                taslink_response.data.an_normal_auszahlbetrag -
                taslink_response.data.an_fw_auszahlbetrag,
              car_id: tasslink.car_id,
            });
          }
  
          return res.json({
            data: returnData,
            error: null,
          });
        } catch (error) {
          console.log(error);
          return res.json({
            data: null,
            error: {
              message: "Something went wrong",
            },
          });
        }
      }
    );
}

export default userCreateRouter