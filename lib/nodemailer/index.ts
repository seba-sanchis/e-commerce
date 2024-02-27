"use server";

import nodemailer from "nodemailer";

import { Contact } from "@/types";
import User from "@/models/user";

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

export async function sendEmail(formData: Contact) {
  const { name, email, url } = formData;

  try {
    const mailOptions = {
      from: email,
      to: NODEMAILER_EMAIL,
      subject: "Restablecé tu contraseña",
      html: `<div>
      <div id=":oc" tabindex="-1"></div>
      <div
        id=":om"
        jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc5MTMzNDYwNTY1MDY1NTIyNyJd; 4:WyIjbXNnLWY6MTc5MTMzNDYwNTY1MDY1NTIyNyJd"
      >
        <div id=":19k">
          <u></u>
          <div
            style="margin-top: 0px; font-family: 'Open Sans', Arial, sans-serif"
            bgcolor="#FFFFFF"
          >
            <table
              style="max-width: 602px; margin-top: 0px; border: 1px solid #cccccc"
              bgcolor="#FFFFFF"
              align="center"
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tbody>
                        <tr>
                          <td bgcolor="ffffff">
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              width="100%"
                            >
                              <tbody>
                                <!-- Header -->
                                <tr>
                                  <td bgcolor="ffffff" align="center">
                                    <table
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            bgcolor="#ffffff"
                                            height="11"
                                            width="100%"
                                            valign="top"
                                            align="center"
                                          ></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      bgcolor="#ffffff"
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            bgcolor="#ffffff"
                                            style="border-collapse: collapse"
                                            width="100%"
                                            valign="middle"
                                            align="center"
                                          >
                                            <a
                                              style="outline: none"
                                              href="https://e-commerce.sebastiansanchis.com"
                                              target="_blank"
                                            >
                                              <img
                                                border="0"
                                                style="
                                                  display: block;
                                                  max-width: 40px;
                                                "
                                                alt="e-commerce"
                                                width="100%"
                                                src="https://seba-sanchis.s3.amazonaws.com/6587449d824f5ff6bff48cd1_nike-store.png"
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            bgcolor="#ffffff"
                                            height="8"
                                            width="100%"
                                            valign="top"
                                            align="center"
                                          ></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <!-- Main -->
                                <tr>
                                  <td>
                                    <table
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            bgcolor="#f7f7f9"
                                            height="25"
                                            width="100%"
                                            valign="top"
                                            align="left"
                                          ></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      bgcolor="#f7f7f9"
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            bgcolor="#f7f7f9"
                                            style="border-collapse: collapse"
                                            width="360"
                                            valign="top"
                                            align="center"
                                          >
                                            <table
                                              cellspacing="0"
                                              cellpadding="0"
                                              border="0"
                                              width="360"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      font-size: 0;
                                                      margin: 0;
                                                      padding: 0;
                                                    "
                                                    align="center"
                                                  >
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      width="360"
                                                      align="center"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td align="center">
                                                            <table
                                                              style="
                                                                max-width: 360px;
                                                                background: #f4f5f7;
                                                              "
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              width="360"
                                                              align="center"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      background-color: #f4f5f7;
                                                                      border: 2px
                                                                        #f4f5f7
                                                                        solid;
                                                                      border-radius: 26px;
                                                                      text-align: center;
                                                                      padding: 13px
                                                                        18px 30px
                                                                        18px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            style="
                                                                              font-size: 0;
                                                                              margin: 0;
                                                                              padding: 0;
                                                                            "
                                                                            align="center"
                                                                          >
                                                                            <table
                                                                              style="
                                                                                max-width: 360px;
                                                                              "
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              border="0"
                                                                              width="100%"
                                                                              align="center"
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td
                                                                                    align="center"
                                                                                  >
                                                                                    <div
                                                                                      style="
                                                                                        width: 256px;
                                                                                        display: inline-block;
                                                                                        vertical-align: top;
                                                                                      "
                                                                                    >
                                                                                      <table
                                                                                        cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        border="0"
                                                                                        width="100%"
                                                                                        align="center"
                                                                                      >
                                                                                        <tbody>
                                                                                          <tr>
                                                                                            <td
                                                                                              style="
                                                                                                font-size: 0;
                                                                                                margin: 0;
                                                                                                padding: 0;
                                                                                              "
                                                                                              align="center"
                                                                                            >
                                                                                              <table
                                                                                                cellspacing="0"
                                                                                                cellpadding="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                              >
                                                                                                <tbody>
                                                                                                  <tr>
                                                                                                    <td
                                                                                                      bgcolor="#f4f5f7"
                                                                                                      height="12"
                                                                                                      width="100%"
                                                                                                      valign="top"
                                                                                                      align="left"
                                                                                                    ></td>
                                                                                                  </tr>
                                                                                                </tbody>
                                                                                              </table>
                                                                                              <table
                                                                                                cellspacing="0"
                                                                                                cellpadding="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                              >
                                                                                                <tbody>
                                                                                                  <tr>
                                                                                                    <td
                                                                                                      bgcolor="#f4f5f7"
                                                                                                      height="15"
                                                                                                      width="100%"
                                                                                                      valign="top"
                                                                                                      align="left"
                                                                                                    ></td>
                                                                                                  </tr>
                                                                                                </tbody>
                                                                                              </table>
                                                                                              <table
                                                                                                cellspacing="0"
                                                                                                cellpadding="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                              >
                                                                                                <tbody>
                                                                                                  <tr>
                                                                                                    <td
                                                                                                      bgcolor="#f4f5f7"
                                                                                                      width="100%"
                                                                                                      valign="top"
                                                                                                      align="left"
                                                                                                    >
                                                                                                      <span
                                                                                                        style="
                                                                                                          font-size: 14px;
                                                                                                          line-height: 22px;
                                                                                                          font-weight: 400;
                                                                                                          color: #4f5457;
                                                                                                          display: block;
                                                                                                        "
                                                                                                      >
                                                                                                        Hola
                                                                                                        <span
                                                                                                          style="
                                                                                                            font-weight: 600;
                                                                                                          "
                                                                                                          >${name}</span
                                                                                                        >,<br />
                                                                                                        Para
                                                                                                        poder
                                                                                                        restablecer
                                                                                                        la
                                                                                                        contraseña,
                                                                                                        hacé
                                                                                                        click
                                                                                                        en
                                                                                                        el
                                                                                                        siguiente
                                                                                                        enlance.</span
                                                                                                      >
                                                                                                    </td>
                                                                                                  </tr>
                                                                                                </tbody>
                                                                                              </table>
                                                                                            </td>
                                                                                          </tr>
                                                                                        </tbody>
                                                                                      </table>
                                                                                    </div>
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            bgcolor="#f4f5f7"
                                                                            height="12"
                                                                            width="100%"
                                                                            valign="top"
                                                                            align="left"
                                                                          ></td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
    
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            bgcolor="#f4f5f7"
                                                                            height="24"
                                                                            width="100%"
                                                                            valign="top"
                                                                            align="left"
                                                                          ></td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            style="
                                                                              font-size: 0;
                                                                              margin: 0;
                                                                              padding: 0;
                                                                            "
                                                                            align="center"
                                                                            height="40"
                                                                          >
                                                                            <table
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              border="0"
                                                                              width="97%"
                                                                              align="center"
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td
                                                                                    align="center"
                                                                                    height="40"
                                                                                  >
                                                                                    <table
                                                                                      style="
                                                                                        max-width: 600px;
                                                                                        background: #f4f5f7;
                                                                                      "
                                                                                      cellpadding="0"
                                                                                      cellspacing="0"
                                                                                      border="0"
                                                                                      width="190"
                                                                                      align="center"
                                                                                    >
                                                                                      <tbody>
                                                                                        <tr>
                                                                                          <td
                                                                                            style="
                                                                                              background-color: #ec0000;
                                                                                              border: 2px
                                                                                                #ec0000
                                                                                                solid;
                                                                                              border-radius: 16px;
                                                                                              text-align: center;
                                                                                            "
                                                                                            height="40"
                                                                                            width="190"
                                                                                          >
                                                                                            <a
                                                                                              style="
                                                                                                background-color: #ec0000;
                                                                                                color: #ffffff;
                                                                                                display: inline-block;
                                                                                                font-size: 15px;
                                                                                                font-weight: 700;
                                                                                                line-height: 24px;
                                                                                                text-align: center;
                                                                                                text-decoration: none;
                                                                                                width: 200px;
                                                                                              "
                                                                                              href="${url}"
                                                                                              target="_blank"
                                                                                            >
                                                                                              Restablecer
                                                                                              contraseña
                                                                                            </a>
                                                                                          </td>
                                                                                        </tr>
                                                                                      </tbody>
                                                                                    </table>
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            bgcolor="#f4f5f7"
                                                                            height="34"
                                                                            width="100%"
                                                                            valign="top"
                                                                            align="left"
                                                                          ></td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            style="
                                                                              font-size: 0;
                                                                              margin: 0;
                                                                              padding: 0;
                                                                            "
                                                                            align="center"
                                                                          >
                                                                            <table
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              border="0"
                                                                              width="100%"
                                                                              align="center"
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td
                                                                                    align="center"
                                                                                  >
                                                                                    <table
                                                                                      style="
                                                                                        background: #f4f5f7;
                                                                                      "
                                                                                      cellpadding="0"
                                                                                      cellspacing="0"
                                                                                      border="0"
                                                                                      width="100%"
                                                                                      align="center"
                                                                                    >
                                                                                      <tbody>
                                                                                        <tr>
                                                                                          <td
                                                                                            style="
                                                                                              background-color: #ffffff;
                                                                                              border: 2px
                                                                                                #f3f3f6
                                                                                                solid;
                                                                                              border-radius: 26px;
                                                                                              text-align: center;
                                                                                              padding: 18px
                                                                                                28px
                                                                                                18px
                                                                                                28px;
                                                                                            "
                                                                                          >
                                                                                            <table
                                                                                              cellspacing="0"
                                                                                              cellpadding="0"
                                                                                              border="0"
                                                                                              width="100%"
                                                                                            >
                                                                                              <tbody>
                                                                                                <tr>
                                                                                                  <td
                                                                                                    bgcolor="#ffffff"
                                                                                                    width="100%"
                                                                                                    valign="middle"
                                                                                                    align="left"
                                                                                                  >
                                                                                                    <span
                                                                                                      style="
                                                                                                        font-size: 13px;
                                                                                                        line-height: 18px;
                                                                                                        font-weight: 400;
                                                                                                        color: #474747;
                                                                                                        display: block;
                                                                                                      "
                                                                                                    >
                                                                                                      <img
                                                                                                        border="0"
                                                                                                        style="
                                                                                                          display: inline;
                                                                                                          vertical-align: middle;
                                                                                                        "
                                                                                                        height="23"
                                                                                                        width="24"
                                                                                                        alt="alert"
                                                                                                        src="https://ci3.googleusercontent.com/meips/ADKq_NbcuJ7qwYneFyAE7THEoRx6fVFqbNSnT3SonaKhYDOespiMbmSfhJMcgNdkFiPTA5f7wQExiCU2m2q1xtS4uUSt9n3XnaDzPKlnOr1LxpD3O3DzMQ4fays5LScr-WHP"
                                                                                                      />
                                                                                                      <br />
                                                                                                      <br />
                                                                                                      <span
                                                                                                        style="
                                                                                                          font-weight: 700;
                                                                                                        "
                                                                                                      >
                                                                                                        Para
                                                                                                        que
                                                                                                        puedas
                                                                                                        restablecer
                                                                                                        tu
                                                                                                        contraseña,
                                                                                                        deberás
                                                                                                        ingresar
                                                                                                        al
                                                                                                        link
                                                                                                        antes
                                                                                                        de
                                                                                                        que
                                                                                                        se
                                                                                                        cumpla
                                                                                                        una
                                                                                                        hora.
                                                                                                      </span>
                                                                                                      Si
                                                                                                      se
                                                                                                      realiza
                                                                                                      posteriormente,
                                                                                                      deberás
                                                                                                      solicitar
                                                                                                      un
                                                                                                      nuevo
                                                                                                      link
                                                                                                      desde
                                                                                                      la
                                                                                                      página.
                                                                                                    </span>
                                                                                                  </td>
                                                                                                </tr>
                                                                                              </tbody>
                                                                                            </table>
                                                                                          </td>
                                                                                        </tr>
                                                                                      </tbody>
                                                                                    </table>
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            bgcolor="#f4f5f7"
                                                                            height="25"
                                                                            width="100%"
                                                                            valign="top"
                                                                            align="left"
                                                                          ></td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            style="
                                                                              padding: 0
                                                                                2%;
                                                                            "
                                                                            bgcolor="#f4f5f7"
                                                                            width="100%"
                                                                            valign="top"
                                                                            align="center"
                                                                          >
                                                                            <span
                                                                              style="
                                                                                font-size: 14px;
                                                                                line-height: 22px;
                                                                                font-weight: 400;
                                                                                color: #4f5457;
                                                                                display: block;
                                                                              "
                                                                            >
                                                                              <a
                                                                                href="https://e-commerce.sebastiansanchis.com"
                                                                                style="
                                                                                  color: #ec0000;
                                                                                  text-decoration: underline;
                                                                                  outline: none;
                                                                                  font-weight: 400;
                                                                                "
                                                                                target="_blank"
                                                                              >
                                                                                <span
                                                                                  style="
                                                                                    font-weight: 600;
                                                                                  "
                                                                                  >e-commerce.sebastiansanchis.com</span
                                                                                >
                                                                              </a>
                                                                            </span>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!-- Footer -->
                                    <table
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            bgcolor="#F7F7F9"
                                            height="25"
                                            width="100%"
                                            valign="top"
                                            align="left"
                                          ></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      bgcolor="#F7F7F9"
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            bgcolor="#F7F7F9"
                                            style="border-collapse: collapse"
                                            width="320"
                                            valign="top"
                                            align="center"
                                          >
                                            <table
                                              cellspacing="0"
                                              cellpadding="0"
                                              border="0"
                                              width="320"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      font-size: 0;
                                                      margin: 0;
                                                      padding: 0;
                                                    "
                                                    align="center"
                                                  >
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      width="320"
                                                      align="center"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="300"
                                                                    valign="top"
                                                                    align="left"
                                                                  >
                                                                    <span
                                                                      style="
                                                                        font-size: 12px;
                                                                        line-height: 20px;
                                                                        font-weight: 700;
                                                                        color: #4f5457;
                                                                        display: block;
                                                                      "
                                                                    >
                                                                      Evitá ser
                                                                      victima de una
                                                                      estafa
                                                                    </span>
                                                                  </td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    height="25"
                                                                    width="100%"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="30"
                                                                    valign="top"
                                                                    align="left"
                                                                  >
                                                                    <img
                                                                      border="0"
                                                                      style="
                                                                        display: inline;
                                                                        vertical-align: middle;
                                                                      "
                                                                      height="31"
                                                                      width="30"
                                                                      alt="padlock"
                                                                      src="https://ci3.googleusercontent.com/meips/ADKq_NZ42RbOhoMqEqtoA_HWvwQ_V8S4Wx-VYXg2IC2YRE0jWoyqQ5zaiaJTdJb34q01XgQ7aU_YA74s_4yhrcRfKB3PFBCfOiCufS7ft-lil3HUAGu0E0WqPlKnxrTJHl7z"
                                                                      data-bit="iit"
                                                                    />
                                                                  </td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="7"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="263"
                                                                    valign="top"
                                                                    align="left"
                                                                  >
                                                                    <span
                                                                      style="
                                                                        font-size: 10px;
                                                                        line-height: 14px;
                                                                        font-weight: 400;
                                                                        color: #4f5457;
                                                                        display: block;
                                                                      "
                                                                    >
                                                                      No compartas
                                                                      por redes
                                                                      sociales,
                                                                      teléfono o
                                                                      mail tus
                                                                      claves
                                                                      personales.
                                                                      Nadie en
                                                                      nombre de
                                                                      nosotros te
                                                                      las va a
                                                                      pedir.
                                                                    </span>
                                                                  </td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    height="12"
                                                                    width="100%"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#cfd5d5"
                                                                    height="1"
                                                                    width="300"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    height="12"
                                                                    width="100%"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="30"
                                                                    valign="top"
                                                                    align="left"
                                                                  >
                                                                    <img
                                                                      border="0"
                                                                      style="
                                                                        display: inline;
                                                                        vertical-align: middle;
                                                                      "
                                                                      height="31"
                                                                      width="30"
                                                                      alt="warning"
                                                                      src="https://ci3.googleusercontent.com/meips/ADKq_NbJURB6z4n3kAY8AXFkXJVQPYIsoaZrE_uU2iXhLy0unCCg5Es5vQgCR2tBpaGzFzUSw1znGthVs7gDjkhvxYnjLyxEb2Y_qFi_Ywe5_OaP3vI9LY3z3s7rI-A4gHCc"
                                                                      data-bit="iit"
                                                                    />
                                                                  </td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="7"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="263"
                                                                    valign="top"
                                                                    align="left"
                                                                  >
                                                                    <span
                                                                      style="
                                                                        font-size: 10px;
                                                                        line-height: 14px;
                                                                        font-weight: 400;
                                                                        color: #4f5457;
                                                                        display: block;
                                                                      "
                                                                    >
                                                                      Nosotros nunca
                                                                      iniciaremos
                                                                      una
                                                                      conversación
                                                                      en las redes
                                                                      sociales. Si
                                                                      te contactan
                                                                      en nombre
                                                                      nuestro,
                                                                      denunciá la
                                                                      cuenta.
                                                                    </span>
                                                                  </td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    height="12"
                                                                    width="100%"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#cfd5d5"
                                                                    height="1"
                                                                    width="300"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    height="12"
                                                                    width="100%"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="30"
                                                                    valign="top"
                                                                    align="left"
                                                                  >
                                                                    <img
                                                                      border="0"
                                                                      style="
                                                                        display: inline;
                                                                        vertical-align: middle;
                                                                      "
                                                                      height="31"
                                                                      width="30"
                                                                      alt="devices"
                                                                      src="https://ci3.googleusercontent.com/meips/ADKq_NYoMoDhxQatoV7P3DezX-5vq0D-gVl_sU6Y-PRLPHIWSBorFNDuE9J7jOt21LluhF2mrwe3s-wQ9hDJJ1uGltaujn9QgxEJyjF-DdFstoSOhpe6h2lckIWRbhTRvfDv"
                                                                    />
                                                                  </td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="7"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="263"
                                                                    valign="top"
                                                                    align="left"
                                                                  >
                                                                    <span
                                                                      style="
                                                                        font-size: 10px;
                                                                        line-height: 14px;
                                                                        font-weight: 400;
                                                                        color: #4f5457;
                                                                        display: block;
                                                                      "
                                                                    >
                                                                      Las cuentas
                                                                      oficiales en
                                                                      Instagram,
                                                                      Twitter y
                                                                      Facebook están
                                                                      verificadas y
                                                                      tienen este
                                                                      símbolo
                                                                      <img
                                                                        border="0"
                                                                        style="
                                                                          display: inline;
                                                                          vertical-align: middle;
                                                                        "
                                                                        height="13"
                                                                        width="13"
                                                                        alt="verified"
                                                                        src="https://ci3.googleusercontent.com/meips/ADKq_NbbVH4jtqkmdg1Ur2BaawFvDI8Zv_FZjfqXpWldzDKQilshdJS3LfhpijuVVot45P8WQthbQqqRl5zXWiLHvpikyE5gNyqcD2DO8f-B9ZEdkClp1SIC0k-NgkjTdo0B"
                                                                        data-bit="iit"
                                                                      />
                                                                    </span>
                                                                  </td>
                                                                  <td
                                                                    bgcolor="#F7F7F9"
                                                                    width="10"
                                                                    valign="top"
                                                                    align="left"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            bgcolor="#F7F7F9"
                                            height="63"
                                            width="100%"
                                            valign="top"
                                            align="left"
                                          ></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to submit contact form: ${error.message}`);
    }
  }
}
