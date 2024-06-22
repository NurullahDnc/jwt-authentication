import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "../../../libs/auth";

export async function POST(request) {
  const body = await request.json();

  if (body.username === "admin" && body.password === "admin") {

    //token olsuturma, token icerisine kulanıcı bilgierini alma
    const token = await new SignJWT({
      username: body.username,
      role: "admin", 
    })
      .setProtectedHeader({ alg: "HS256" }) //algoritma
      .setIssuedAt()  //jwt olsuturulma tarihi 
      .setExpirationTime("30s") //token gecerlilik suresi
      .sign(getJwtSecretKey()); //secret key

    const response = NextResponse.json(
      { success: true },
      { status: 200, headers: { "content-type": "application/json" } }
    );

    //tokeni cookie kayıt ediyor
    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false });
}
