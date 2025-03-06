export function orderSummary(user, body) {
  function formatPrice(price) {
    let inputtedPrice = price;

    return inputtedPrice
      ? inputtedPrice
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
          .slice(0, -3)
      : price;
  }

  let pension_insurace_bool = user?.pension_insurance == 1 ? "ja" : "nein";
  let health_insurance_sum =
    Number(user?.base_rate_health_insurance) +
    Number(user?.supplement_health_insurance);
  let spousal_factor_line =
    user.children == 4
      ? `<tr>
                  <td>Ehegattenfaktor:</td>
                  <!-- <td class="td_right">1</td> show only when tax == 4 -->
                  <td class="td_right">${user?.spousal_factor}</td>
                </tr>`
      : ``;
  return (
    `<html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Wevee</title>
        <meta name="description" content="">
        <meta name="author" content="">
    
        <style type="text/css">
            body{ 
                color: #34383a;
                font-family: 'RealHeadPro', Helvetica, sans-serif!important;
            }
    
          strong{ font-weight:500; }
    
            p{ margin: 0px 0 10px 0; line-height:1.5; font-size: 16px; color: #34383a;word-break: break-word;}
          a{ color: #34383a!important; text-decoration:none!important; font-weight:normal; }
            table{ width: 100%; }
          table.tbl_wrap{
            max-width: 900px;
            background: #fff;
            padding-left: 40px;
            padding-right: 40px;
          }
    
          tr.field_row p{ margin-bottom:5px; }
          td{ color: #34383a; }
    
          table.inner_table {
            font-size: 12px;
            font-weight: 300;
            border-collapse: collapse;
          }
    
          
          table.inner_table td.td_right{
            text-align: right;
          }
    
          table.inner_table td{
            border-bottom: 1px solid;
            border-top: none;
            outline: none;
            padding: 2px 0;
          }
    
          .col2_tbl_wrap td.tbl_col{
            width: 50%;
            vertical-align: bottom;
          }
    
          .col2_tbl_wrap .tbl_col_left{ padding-right:20px; }
          .col2_tbl_wrap .tbl_col_right{ padding-left:20px; }
    
          .bg_gray{ background:#bcbdc0; }
          .bg_yellow{ background:#e4cc29 }
          .wrapper{  }
    
          /*  3 col tables */
          .col3_tbl_wrap .tbl_col{ vertical-align:bottom; padding:0px; }
          .col3_tbl_wrap .tbl_col .inner_table tr.th_head td{ border-bottom:none;  }
          .col3_tbl_wrap .tbl_col .inner_table td.td_first{ width:56%; text-align:left; }
          .col3_tbl_wrap .tbl_col .inner_table td{ width:24%; text-align: right;padding: 3px 5px; }
          .col3_tbl_wrap .tbl_col .inner_table td.td_mid{ text-align:left; }
          .text_left{ text-align:left; }
          .text_right{ text-align:right; }
    
    
    
          @media only screen and (max-width: 680px) {
            .wrapper table{padding:40px 10px 30px 10px!important;  }
            .logo_wrap{ padding-bottom:25px!important; }
            .logo_wrap img{ width:290px!important; }
            .title_wrap h1{ font-size:22px!important; }
          }
    
        </style>
      </head>
      <body>
      
      <div class="wrapper" style="padding: 0; max-width: 900px; margin: auto; background: #fff;border:none!important; border-radius: 0px; margin-top: 10px;">
          <table class="tbl_wrap" bgcolor="#ffffff" width="900" style="padding-left: 40px; padding-right: 40px;">
            <tr>
                <td class="logo_wrap"  style="vertical-align:top; padding-bottom: 20px; padding-top: 40px;" >
                    <img src="https://res.cloudinary.com/dlvqvkxc3/image/upload/v1696553385/Wevee-Corporate-Leasing-logo-Email_e9d1x0.png" style="width: 120px;">
                </td>
              </tr>
    
              <tr>
                <td class="title_wrap" style="padding-bottom: 30px;">
                  <h1 style="font-size: 24px; margin: 0px; font-weight: 500;">Auswirkungen von E-Fahrzeugen auf Gehaltsabrechnung</h1>
                </td>
              </tr>
          </table>
    
          <table class="tbl_wrap" bgcolor="#ffffff" width="900" style="padding-left: 40px; padding-right: 40px;">
        <tr class="col2_tbl_wrap">
          <td class="tbl_col tbl_col_left" colspan="3" style="padding-right: 20px;" >
            <table class="inner_table">
                <tr>
                  <td>Marke</td>
                  <td class="td_right">Tesla</td>
                </tr>

                <tr>
                  <td>Modell</td>
                  <td class="td_right">Model 3 Langstreckenbatt. Allradantrieb Dual Motor</td>
                </tr>

                <tr>
                  <td>Listenpreis Fahrzeug:</td>
                  <!-- <td class="td_right">€ 53.900,00 brutto</td> -->
                  <td class="td_right">€ ${formatPrice(
                    body?.auto_bruttolistenpreis
                  )} brutto</td>
                </tr>

                <tr>
                  <td>Leasingkonditionen:</td>
                  <td class="td_right">36 Monate /10000 km pro Jahr</td>
                </tr>

                <tr>
                  <td>all-inkl. Leasingrate:</td>
                  <td class="td_right">€ 906,01 (netto) € 10,878.15 (brutto)</td>
                </tr>

                 <tr>
                  <td>Vergleichbare Leasingrate:</td>
                  <td class="td_right">€ ${formatPrice(
                    body?.auto_leasingrate
                  )} (netto) € 1.078.15 (brutto)</td>
                </tr>
            </table>
          </td>

          <td class="tbl_col tbl_col_right" colspan="3" style="padding-left: 20px;">
            <table class="inner_table">
                <tr>
                  <td>Geburtstag:</td>
                  <!-- <td class="td_right">14.04.1956</td> -->
                  <td class="td_right">${user?.age}</td>
                </tr>

                <tr>
                  <td>Monatsgehalt: </td>
                  <!-- <td class="td_right">€ 30.000,00 pro Monat</td> -->
                  <td class="td_right">€ ${formatPrice(
                    user?.gross_wage
                  )} pro Monat</td>
                </tr>

                <tr>
                  <td>Steuerklasse:</td>
                  <!-- <td class="td_right">4</td> -->
                  <td class="td_right">${user?.tax_class}</td>
                </tr>

                <tr>
                  <td>Bundesland:</td>
                  <!-- <td class="td_right">Berlin-Berlin-West</td> -->
                  <td class="td_right">${user?.state}</td>
                </tr>

                <tr>
                  <td>Kirchensteuer:</td>
                  <!-- <td class="td_right">Ja</td> -->
                  <td class="td_right">${user?.church_tax}</td>
                </tr>

                 <tr>
                  <td>Kinderfreibetrag:</td>
                  <!-- <td class="td_right">Auto</td> -->
                  <td class="td_right">${user?.child_allowance}</td>
                </tr>

                 <tr>
                  <td>Steuerfreibetrag:</td>
                  <!-- <td class="td_right">€ 1.000,00</td> -->
                  <td class="td_right">€ ${formatPrice(
                    user?.tax_exempt_amount
                  )}</td>
                </tr>

                 <tr>
                  <td>Kinder:</td>
                  <!-- <td class="td_right">2.50</td> -->
                  <td class="td_right">${user?.children}</td>
                </tr>

                 <tr>
                  <td>Entfernung Arbeitsstätte (km):</td>
                  <!-- <td class="td_right">24</td> -->
                  <td class="td_right">${user?.arrival_kilometres}</td>
                </tr>

                <tr>
                  <td>Rentenversicherung:</td>
                  <!-- <td class="td_right">Ja</td> -->
                  <td class="td_right">${pension_insurace_bool}</td>
                </tr>

                <tr>
                  <td>Anzahl mtl. Fahrten zur Arbeitsstätte in Tagen:</td>
                  <!-- <td class="td_right">1/5</td> -->
                  <td class="td_right">${user?.journeys_number}</td>
                </tr>

                <tr>
                  <td>GKV-Satz:</td>
                  <!-- <td class="td_right">16.6</td> -->
                  <td class="td_right">${health_insurance_sum}</td>
                </tr>
                ` +
    spousal_factor_line +
    `
            </table>
          </td>
        </tr> 			
  		</table>

      <table class="tbl_wrap" bgcolor="#ffffff" width="900" style="padding-left: 40px; padding-right: 40px;">
        <tr class="spacer">
          <td colspan="3" style="padding-bottom: 40px;"></td>
        </tr>
        <tr class="col3_tbl_wrap">
          <td class="tbl_col col1 tbl_col_left" colspan="3">
            <table class="inner_table">
                <tr class="th_head">
                  <td class="td_first"></td>
                  <td>Normale Gehaltsabrechnung</td>
                  <td><strong>E-Fahrzeug über Gehaltsumwandlung</strong></td>
                </tr>

                <tr>
                  <td class="bg_gray td_first"><strong>Bruttogehalt pro Monat</strong></td>
                  <td class="bg_gray">€ ${formatPrice(
                    body?.an_normal_gesamtbrutto
                  )}</td>
                  <td class="bg_yellow">€ ${formatPrice(
                    body?.an_fw_gesamtbrutto
                  )}</td>
                </tr>

                <tr>
                  <td class="td_first">Gehaltsumwandlung: netto Leasingrate</td>
                  <td>€ 0</td>
                  <td>€ ${formatPrice(
                    body?.an_fw_bs_brutto_gehaltsverzicht
                  )}</td>
                </tr>

                 <tr>
                  <td class="td_first">geldwerter Vorteil: Überlassung E-Auto (1% vs. 0,25% EV)</td>
                  <td>€ 0</td>
                  <td>€ ${formatPrice(
                    body?.an_fw_bs_brutto_gwv_ein_prozent
                  )}</td>
                </tr>

                <tr>
                  <td class="td_first">geldwerter Vorteil: Wohnung Arbeitsstätte E-Auto (0,03% vs. 0,0075% EV)</td>
                  <td>€ 0</td>
                  <td>€ ${formatPrice(
                    body?.an_fw_bs_brutto_gwv_nullkommanulldrei_prozent
                  )}</td>
                </tr>

                <tr>
                  <td class="td_first">Ausgleich Arbeitslosenversicherung</td>
                  <td></td>
                  <td>€ ${formatPrice(body?.an_fw_bs_brutto_ausgleich_alv)}</td>
                </tr>

                <tr>
                  <td class="td_first">Ausgleich Krankentagegeld</td>
                  <td></td>
                  <td>€ ${formatPrice(
                    body?.["an_fw_bs_brutto ausgleich_ktg"]
                  )}</td>
                </tr>

                <tr>
                  <td class="td_first">Ausgleich Rente</td>
                  <td></td>
                  <td></td>
                </tr>
            </table>
          </td>
        </tr>
      </table>

      <table class="tbl_wrap" bgcolor="#ffffff" width="900" style="padding-left: 40px; padding-right: 40px;">
        <tr class="spacer">
          <td colspan="3" style="padding-bottom: 40px;"></td>
        </tr>
        <tr class="col3_tbl_wrap">
          <td class="tbl_col col1 tbl_col_left" colspan="3">
            <table class="inner_table">
                <tr>
                  <td class="bg_gray td_first"><strong>Berechnungsgrundlage (Sozialversicherungsbeiträge Arbeitnehmer)</strong></td>
                  <td class="bg_gray">€ ${formatPrice(
                    body?.an_normal_steuerbrutto
                  )}</td>
                  <td class="bg_yellow">${formatPrice(
                    body?.an_fw_steuerbrutto
                  )}</td>
                </tr>

                <tr>
                  <td class="td_first">abzgl. Steuern</td>
                  <td>€ ${formatPrice(body?.an_normal_gesamtsteuer)}</td>
                  <td>€ ${formatPrice(body?.an_fw_gesamtsteuer)}</td>
                </tr>

                 <tr>
                  <td class="td_first">abzgl. Sozialversicherungsbeiträge</td>
                  <td>€ ${formatPrice(body?.an_normal_sozialversicherung)}</td>
                  <td>€ ${formatPrice(body?.an_fw_sozialversicherung)}</td>
                </tr>

                <tr>
                  <td class="td_first">abzgl. geldwerter Vorteil</td>
                  <td>€ 0</td>
                  <td>€ ${formatPrice(
                    body?.an_fw_bs_netto_gwv_ein_prozent +
                      body?.an_fw_bs_netto_gwv_nullkommanulldrei_prozent
                  )}</td>
                </tr>

                <tr>
                  <td class="td_first">Ausgleich Arbeitslosenversicherung</td>
                  <td></td>
                  <td>€ ${formatPrice(body?.an_fw_bs_netto_ausgleich_alv)}</td>
                </tr>

                <tr>
                  <td class="td_first">Ausgleich Krankentagegeld</td>
                  <td></td>
                  <td>€ ${formatPrice(body?.an_fw_bs_netto_ausgleich_ktg)}</td>
                </tr>

                <tr>
                  <td class="td_first">Ausgleich Rente</td>
                  <td></td>
                  <td></td>
                </tr>
            </table>
          </td>
        </tr>
      </table>


       <table class="tbl_wrap" bgcolor="#ffffff" width="900" style="padding-left: 40px; padding-right: 40px;">
        <tr class="spacer">
          <td colspan="3" style="padding-bottom: 40px;"></td>
        </tr>
        <tr class="col3_tbl_wrap">
          <td class="tbl_col col1 tbl_col_left" colspan="3">
            <table class="inner_table">
                <tr>
                  <td class="bg_gray td_first"><strong>Nettogehalt p.M.</strong></td>
                  <td class="bg_gray">€ ${formatPrice(
                    body?.an_normal_auszahlbetrag
                  )}</td>
                  <td class="bg_yellow">€ ${formatPrice(
                    body?.an_fw_auszahlbetrag
                  )}</td>
                </tr>

                <tr>
                  <td class="td_first">abzgl. Steuern</td>
                  <td>€ 12.928,12</td>
                  <td>€ 12.461,25</td>
                </tr>

                 <tr>
                  <td class="td_first">Tatsächliche Nettobelastung Gehaltsumwandlung (Auswirkung Firmenwagens auf Nettogehalt)</td>
                  <td></td>
                  <td>€ ${formatPrice(
                    body?.an_fw_auszahlbetrag - body?.an_normal_auszahlbetrag
                  )}</td>
                </tr>

                <tr>
                  <td class="td_first">Kosten Privatfahrzeug (monatliche Belastung brutto)</td>
                  <td>€ 1.078,15</td>
                  <td>€ 0</td>
                </tr>
            </table>
          </td>
        </tr>
      </table>

      <table class="tbl_wrap" bgcolor="#ffffff" width="900" style="padding-left: 40px; padding-right: 40px;">
        <tr class="spacer">
          <td colspan="3" style="padding-bottom: 40px;"></td>
        </tr>
        <tr class="col3_tbl_wrap">
          <td class="tbl_col col1 tbl_col_left" colspan="3">
            <table class="inner_table">
                <tr>
                  <td class="bg_gray td_first"><strong>Monatlich verfügbares Nettogehalt</strong></td>
                  <td class="bg_gray">€ 14.729,91</td>
                  <td class="bg_yellow">€ 15.137,90</td>
                </tr>

                <tr>
                  <td class="td_first"></td>
                  <td></td>
                  <td class="bg_yellow">€ 407,99 pro Mona</td>
                </tr>

                 <tr>
                  <td class="td_first"></td>
                  <td></td>
                  <td class="bg_yellow">€ 4.895,88 pro Jahr</td>
                </tr>

                <tr>
                  <td class="td_first"></td>
                  <td class="bg_yellow td_mid"><strong>Gehaltsumwandlung vs. Privatleasing</strong></td>
                  <td class="bg_yellow">% 37,84</td>
                </tr>
            </table>
          </td>
        </tr>
      </table>

      <table class="tbl_wrap" bgcolor="#ffffff" width="900" style="padding-left: 40px; padding-right: 40px;">
        <tr class="spacer">
          <td colspan="3" style="padding-bottom: 40px;"></td>
        </tr>
        <tr class="col3_tbl_wrap">
          <td class="tbl_col col1 tbl_col_left" colspan="3">
            <table class="inner_table">
                <tr>
                  <td class="bg_yellow td_first"><strong>Auswirkungen Gehaltsumwandlung</strong></td>
                  <td class="bg_yellow"></td>
                  <td class="bg_yellow"></td>
                </tr>

                <tr>
                  <td class="td_first">Redzuierung Einzahlung Arbeitslosenversicherung €</td>
                  <td></td>
                  <td>€ 0</td>
                </tr>

                 <tr>
                  <td class="td_first">Reduzierung Einzahlung Krankentagegeld €</td>
                  <td></td>
                  <td>€ 0</td>
                </tr>

                 <tr>
                  <td class="td_first">Reduzierung Einzahlung Rentenversicherung €</td>
                  <td></td>
                  <td>€ 0</td>
                </tr>

                <tr>
                  <td class="td_first"><strong>Reduzierung Gesamt</strong></td>
                  <td></td>
                  <td>€ 0</td>
                </tr>

                

                

                
            </table>
          </td>
        </tr>
      </table>

      <table class="tbl_wrap" bgcolor="#ffffff" width="900" style="padding-left: 40px; padding-right: 40px;">
        <tr class="ftr" >
          <td style="font-size: 13px; padding-top: 30px; padding-bottom:40px;">
            <p style="margin-bottom: 0;font-size: 12px;">Rechnung basiert auf die vom Mitarbeiter eingestellten Parameter. <br> Keine Garantie und keine Haftung für die Richtigkeit bei nicht korrekten Angaben.</p>
          </td>
        </tr>
      </table>
      </div>
    
    
      </body>
    </html>`
  );
}
