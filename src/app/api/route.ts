// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const cookieStore = await cookies();

//   const body = await req.json();

//   const res = await fetch(`${}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });

//   const responseData = await res.json();

//   if (res.ok) {
//     cookieStore.set("token", responseData.data.accessToken, {
//       path: "/",
//     });

//     return NextResponse.json(responseData, { status: 200 });
//   } else {
//     cookieStore.delete("token");

//     return NextResponse.json(responseData, { status: res.status });
//   }
// }

// export async function DELETE() {
//   const cookieStore = await cookies();

//   await fetch(`${}/auth/logout`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${cookieStore.get("token")?.value}`,
//     },
//   });

//   cookieStore.delete("token");
//   cookieStore.delete("domain");

//   return NextResponse.json({});
// }
