export function newUserNotification(data) {
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Wevee</title>
        <meta name="description" content="">
        <meta name="author" content="">
    
        <link rel="stylesheet" type="text/css" href="assets/fonts/stylesheet.css">
    
        <style type="text/css">
            body{ 
                color: #181e38;
                font-family: 'RealHeadPro', Helvetica, sans-serif;
            background: #e5e6e7;
            }
    
            p{ margin: 0px 0 8px 0; line-height:1.5; font-size: 15px; color: #181e38;word-break: break-word;}
          a{ color: #181e38!important; text-decoration:none!important; font-weight:normal; }
            table{ width: 100%; }
    
          tr.field_row p{ margin-bottom:5px; }
          td{ color: #181e38; }
    
    
          @media only screen and (max-width: 680px) {
            .wrapper table{padding:40px 10px 30px 10px!important;  }
            .logo_wrap{ padding-bottom:25px!important; }
            .logo_wrap img{ width:290px!important; }
            .title_wrap h1{ font-size:22px!important; }
          }
    
        </style>
      </head>
      <body>
      
      <div class="wrapper" style="padding: 0; max-width: 800px; margin: auto; background: #fff;border: 1px solid #c4c5c8!important; border-radius: 10px; margin-top: 60px;">
              <table style=" padding:40px 40px 30px 40px;">
                  <tr>
                      <td class="logo_wrap"  style="vertical-align:top; padding-bottom: 40px;" >
                          <img src="https://res.cloudinary.com/dlvqvkxc3/image/upload/v1696553385/Wevee-Corporate-Leasing-logo-Email_e9d1x0.png" style="width: 320px;">
                      </td>
                  </tr>
    
            
        <tr>
          <td class="title_wrap" style="padding-bottom: 20px;">
            <h1 style="font-size: 26px; margin: 0px; font-weight: 500;">New Employee</h1>
          </td>
        </tr>

        <tr>
          <td >
            <p> Welcome aboard! A new employee has just registered on WeVee. You can view their profile and manage their account on your dashboard. ${ data.url != false ? `<a style="text-decoration: underline!important; font-size: 15px;" href="http://app.wevee.dev/dashboard/${data.tablePrefix}/registrations/${data.userID}">View </a>` : '' }</p>
            <p>Please do not reply to this email. If you have any questions about your order, you can send an email to <a style="text-decoration: underline!important; font-size: 15px;" href="mailto:customerservice@wevee.com">customerservice@wevee.com</a>.</p>

          </td>
        </tr>
    
            <tr class="ftr">
              <td style="font-size: 13px; padding-top: 30px;">
                <p style="margin-bottom: 0;font-size: 14px;">WeVee GmbH, Reeperbahn 1, 20359 Hamburg, Germany <br>© 2023 WeVee Technologies Ltd.</p>
              </td>
            </tr>
    
                          
              </table>
      </div>
    
    
      </body>
    </html>`;
}
