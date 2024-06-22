import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";

export async function POST(request) {
  const body = await request.json();

  // kulanıcı kontrolu
  if (body.username === "admin" && body.password === "admin") {

    //token olsuturma, token icerisine kulanıcı bilgierini giriyoruz
    const token = await new SignJWT({
      username: body.username,
      role: "admin", 
    })
      .setProtectedHeader({ alg: "HS256" }) //algoritması
      .setIssuedAt()  //jwt olsuturulma tarihi 
      .setExpirationTime("30s") //token gecerlilik suresi
      .sign(getJwtSecretKey()); //secret key

      //geriye deger donduruyor basarılı
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
